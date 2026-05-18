const express = require('express');
const compression = require('compression');
const cors = require('cors');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, spawnSync } = require('child_process');
const fluentFfmpeg = require('fluent-ffmpeg');

// Detect python binary (python3 on macOS/Linux, python on Windows or if python3 missing)
const _pythonBin = (() => {
  try {
    const r = spawnSync('python3', ['--version'], { stdio: 'pipe' });
    if (r.status === 0) return 'python3';
  } catch (_) {}
  return 'python';
})();

// Prevent EPIPE crashes when stdout/stderr pipe is closed (e.g. in Electron)
process.stdout?.on?.('error', () => {});
process.stderr?.on?.('error', () => {});
const Database = require('better-sqlite3');
const sharp = require('sharp');

const app = express();

// SSR: EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const PORT = process.env.PORT || 1437;
const DEBUG_LOGS = process.argv.includes('--debug') || process.env.DEBUG_LOGS === 'true';

const MEDIA_ROOT = process.env.CHROMIC_MEDIA_ROOT || path.join(__dirname, 'media');
const MEDIA_DB_PATH = path.join(MEDIA_ROOT, 'database.json');
const WATCH_HISTORY_PATH = path.join(MEDIA_ROOT, 'watch-history.json');

// ── Performance Profiler API (stores snapshots from renderer) ──────────────
const _perfSnapshots = [];
const PERF_LOG_PATH = path.join(MEDIA_ROOT, '.chromic-perf-log.json');

app.post('/api/perf/snapshot', express.json({ limit: '1mb' }), (req, res) => {
  const snapshot = { ...req.body, _serverTime: new Date().toISOString() };
  _perfSnapshots.push(snapshot);
  // Keep last 500 snapshots in memory
  if (_perfSnapshots.length > 500) _perfSnapshots.shift();
  // Also append to disk
  try {
    fs.appendFileSync(PERF_LOG_PATH, JSON.stringify(snapshot) + '\n');
  } catch (_) {}
  res.json({ ok: true, count: _perfSnapshots.length });
});

app.get('/api/perf/snapshots', (req, res) => {
  const last = parseInt(req.query.last) || 50;
  res.json(_perfSnapshots.slice(-last));
});

app.get('/api/perf/latest', (req, res) => {
  res.json(_perfSnapshots[_perfSnapshots.length - 1] || null);
});

app.delete('/api/perf/snapshots', (req, res) => {
  _perfSnapshots.length = 0;
  try { fs.writeFileSync(PERF_LOG_PATH, ''); } catch (_) {}
  res.json({ ok: true });
});
// ───────────────────────────────────────────────────────────────────────────
const PREVIEW_SIDECAR_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'];
const ALBUM_COVER_BASENAMES = ['cover', 'folder', 'album', 'front', 'artwork'];
const MOVIE_EXTENSIONS = ['.mp4', '.mkv', '.webm', '.mov', '.avi', '.m4v'];
const MUSIC_EXTENSIONS = ['.mp3', '.wav', '.flac', '.m4a', '.ogg', '.aac', '.aiff'];
const HIDDEN_SYSTEM_NAMES = new Set(['.ds_store', 'thumbs.db', 'desktop.ini', '__macosx']);
const TRANSCODE_MOVFLAGS = 'frag_keyframe+empty_moov+default_base_moof';


function sanitizeFilenamePart(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._ -]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

const CATEGORIES = {
  movies: path.join(MEDIA_ROOT, 'movies'),
  music: path.join(MEDIA_ROOT, 'music'),
  books: path.join(MEDIA_ROOT, 'books'),
};

for (const dirPath of Object.values(CATEGORIES)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const createEmptyMediaDb = () => ({ originalNames: {} });
const createEmptyWatchHistory = () => ({ movies: {} });

// ─── LIBRARY PATHS (external folder indexing) ────────────────────────────────
const LIBRARY_PATHS_FILE = path.join(MEDIA_ROOT, '.chromic-library-paths.json');
let _libraryPaths = [];  // array of absolute directory paths
let _libraryScanStatus = { scanning: false, folder: null, found: 0, total: 0 };

function loadLibraryPaths() {
  try {
    if (fs.existsSync(LIBRARY_PATHS_FILE)) {
      const data = JSON.parse(fs.readFileSync(LIBRARY_PATHS_FILE, 'utf-8'));
      _libraryPaths = Array.isArray(data) ? data.filter(p => typeof p === 'string') : [];
    }
  } catch (_) {}
  return _libraryPaths;
}
function saveLibraryPaths() {
  try { fs.writeFileSync(LIBRARY_PATHS_FILE, JSON.stringify(_libraryPaths, null, 2)); } catch (_) {}
}
loadLibraryPaths();

// ─── AI/PRO CONFIG ──────────────────────────────────────────────────────────
const AI_CONFIG_PATH = path.join(MEDIA_ROOT, '.chromic-config.json');

const DEFAULT_AI_CONFIG = {
  openaiApiKey: '',
  openaiBaseUrl: 'https://api.openai.com/v1',
  openaiModel: 'gpt-4o-mini',
  whisperEngine: 'faster',   // 'faster' | 'whisperx' | 'mlx'
  whisperModel: process.platform === 'darwin' ? 'medium' : 'base',  // macOS=medium, Windows/Linux=base (faster setup, no cuDNN needed)
  lyricsProvider: 'lrclib',   // 'lrclib' | 'whisper' | 'openai'
  aiProvider: 'openai',       // 'openai' | 'groq' | 'ollama' | 'custom'
  ollamaModel: '',            // specific Ollama model (empty = auto-detect first)
  translationLang: 'uk',      // default translation language
  decensorLyrics: true,       // replace censored words (f***, s**t) with Whisper-heard words
};

function loadAiConfig() {
  try {
    if (fs.existsSync(AI_CONFIG_PATH)) {
      return { ...DEFAULT_AI_CONFIG, ...JSON.parse(fs.readFileSync(AI_CONFIG_PATH, 'utf-8')) };
    }
  } catch (e) { /* ignore */ }
  return { ...DEFAULT_AI_CONFIG };
}

function saveAiConfig(config) {
  const merged = { ...DEFAULT_AI_CONFIG, ...config };
  // Never expose the full key in responses — mask it
  fs.writeFileSync(AI_CONFIG_PATH, JSON.stringify(merged, null, 2));
  // Also set env vars so existing code picks them up
  if (merged.openaiApiKey) process.env.OPENAI_API_KEY = merged.openaiApiKey;
  if (merged.openaiBaseUrl) process.env.OPENAI_BASE_URL = merged.openaiBaseUrl;
  if (merged.openaiModel) process.env.OPENAI_MODEL = merged.openaiModel;
  return merged;
}

// ─── Unified AI Provider Call ─────────────────────────────────────────────
// Sticky Ollama fallback: once OpenAI fails and Ollama works, skip OpenAI for 10 minutes
let _ollamaFallbackUntil = 0;
let _ollamaFallbackModel = '';

async function _callOllama(messages, temperature, ollamaModel) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 min timeout for slow models
  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: ollamaModel, messages, stream: false, options: { temperature } }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Ollama API error: ${response.status} (model: ${ollamaModel})`);
    const data = await response.json();
    return data.message?.content || '';
  } finally {
    clearTimeout(timeout);
  }
}

async function callAiProvider(prompt, { systemPrompt, temperature = 0.3, maxTokens = 2048, signal } = {}) {
  const config = loadAiConfig();
  const apiKey = config.openaiApiKey || process.env.OPENAI_API_KEY;
  const baseUrl = config.openaiBaseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = config.openaiModel || process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const isOllama = baseUrl.includes('11434') || config.aiProvider === 'ollama';

  const messages = [];
  if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
  messages.push({ role: 'user', content: prompt });

  if (isOllama) {
    const ollamaUrl = (baseUrl.includes('11434') ? baseUrl : 'http://localhost:11434').replace(/\/v1\/?$/, '');
    const ollamaModel = config.ollamaModel || model;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 min timeout for slow models
    // If external signal provided, forward abort to our controller
    if (signal) {
      if (signal.aborted) { clearTimeout(timeout); throw new Error('Aborted'); }
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
    try {
      const response = await fetch(`${ollamaUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: ollamaModel, messages, stream: false, options: { temperature } }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Ollama API error: ${response.status} (model: ${ollamaModel})`);
      const data = await response.json();
      return data.message?.content || '';
    } finally {
      clearTimeout(timeout);
    }
  }

  // If we recently fell back to Ollama, skip OpenAI entirely
  if (Date.now() < _ollamaFallbackUntil && _ollamaFallbackModel) {
    console.log(`[AI] Using sticky Ollama fallback (model: ${_ollamaFallbackModel})`);
    // Verify the model still exists before using it
    try {
      return await _callOllama(messages, temperature, _ollamaFallbackModel);
    } catch (fallbackErr) {
      console.warn(`[AI] Sticky Ollama fallback failed (${fallbackErr.message}), clearing fallback`);
      _ollamaFallbackUntil = 0;
      _ollamaFallbackModel = '';
      // Fall through to normal OpenAI path
    }
  }

  // OpenAI-compatible (OpenAI, Groq, custom)
  if (!apiKey) throw new Error('AI API key not configured. Set in Settings → AI & Pro, or use Ollama (port 11434).');
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens }),
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    const status = response.status;

    // On 429 (rate limit / quota exceeded) or 402/403 (billing), try Ollama fallback
    if ([429, 402, 403].includes(status) && !isOllama) {
      console.warn(`[AI] OpenAI returned ${status}, attempting Ollama fallback...`);
      try {
        const ollamaCheck = await fetch('http://localhost:11434/api/tags').catch(() => null);
        if (ollamaCheck?.ok) {
          const tags = await ollamaCheck.json();
          const ollamaModel = tags.models?.[0]?.name;
          if (ollamaModel) {
            console.log(`[AI] Falling back to Ollama model: ${ollamaModel}`);
            const result = await _callOllama(messages, temperature, ollamaModel);
            // Stick to Ollama for 10 minutes so we don't keep hitting OpenAI
            _ollamaFallbackUntil = Date.now() + 10 * 60 * 1000;
            _ollamaFallbackModel = ollamaModel;
            console.log(`[AI] Ollama fallback succeeded — will use Ollama for next 10 minutes`);
            return result;
          }
        }
      } catch (ollamaErr) {
        console.warn('[AI] Ollama fallback also failed:', ollamaErr.message);
      }
    }

    throw new Error(`AI API error ${status}: ${errText.slice(0, 200)}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// Load config on startup
const aiConfig = loadAiConfig();
if (aiConfig.openaiApiKey) process.env.OPENAI_API_KEY = aiConfig.openaiApiKey;
if (aiConfig.openaiBaseUrl) process.env.OPENAI_BASE_URL = aiConfig.openaiBaseUrl;
if (aiConfig.openaiModel) process.env.OPENAI_MODEL = aiConfig.openaiModel;

/** Tell Ollama to unload the current translation model so it frees VRAM immediately */
function _unloadOllamaModel() {
  const config = loadAiConfig();
  const baseUrl = config.openaiBaseUrl || 'http://localhost:11434';
  const ollamaUrl = baseUrl.replace(/\/v1\/?$/, '');
  const model = config.ollamaModel || 'translategemma:12b';
  fetch(`${ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, keep_alive: 0 }),
  }).then(() => {
    console.log(`[Translation] 🧹 Sent keep_alive:0 to unload model "${model}" from VRAM`);
  }).catch((err) => {
    console.warn(`[Translation] Could not unload model: ${err.message}`);
  });
}

const loadWatchHistory = () => {
  try {
    const raw = fs.readFileSync(WATCH_HISTORY_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      ...createEmptyWatchHistory(),
      ...(parsed && typeof parsed === 'object' ? parsed : {}),
      movies: {
        ...(parsed?.movies && typeof parsed.movies === 'object' ? parsed.movies : {}),
      },
    };
  } catch (_error) {
    return createEmptyWatchHistory();
  }
};

const saveWatchHistory = (watchHistory) => {
  try {
    fs.writeFileSync(WATCH_HISTORY_PATH, JSON.stringify(watchHistory, null, 2), 'utf8');
  } catch (error) {
    console.error('[saveWatchHistory] failed to write', error?.message || error);
  }
};

const loadMediaDb = () => {
  try {
    const raw = fs.readFileSync(MEDIA_DB_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      ...createEmptyMediaDb(),
      ...(parsed && typeof parsed === 'object' ? parsed : {}),
      originalNames: {
        ...(parsed?.originalNames && typeof parsed.originalNames === 'object' ? parsed.originalNames : {}),
      },
    };
  } catch (_error) {
    return createEmptyMediaDb();
  }
};

const saveMediaDb = (nextDb) => {
  fs.mkdirSync(path.dirname(MEDIA_DB_PATH), { recursive: true });
  fs.writeFileSync(MEDIA_DB_PATH, JSON.stringify(nextDb, null, 2));
};

const setOriginalName = (category, relativePath, originalName) => {
  if (!relativePath || !originalName) {
    return;
  }
  const db = loadMediaDb();
  const key = `${category}/${toForwardSlashes(relativePath)}`;
  db.originalNames[key] = originalName;
  saveMediaDb(db);
};

const getOriginalName = (category, relativePath) => {
  const db = loadMediaDb();
  const key = `${category}/${toForwardSlashes(relativePath)}`;
  return db.originalNames[key] || null;
};

const removeOriginalName = (category, relativePath) => {
  const db = loadMediaDb();
  const key = `${category}/${toForwardSlashes(relativePath)}`;
  if (db.originalNames[key]) {
    delete db.originalNames[key];
    saveMediaDb(db);
  }
};

app.use(compression());
app.use(cors());

// COOP/COEP headers for SharedArrayBuffer support (required for visualizer worker)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.json());
app.use('/api', (req, _res, next) => {
  console.log('API HIT:', req.method, req.url);
  next();
});

const movieStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, CATEGORIES.movies),
  filename: (_req, file, cb) => {
    cb(null, buildUniqueUploadFilename(CATEGORIES.movies, file.originalname));
  },
});

const uploadMovie = multer({ storage: movieStorage });
const uploadMusic = multer({ storage: multer.memoryStorage() });

const isMovieExtension = (value) => {
  const normalized = String(value || '').toLowerCase();
  const ext = normalized.startsWith('.') ? normalized : path.extname(normalized);
  return MOVIE_EXTENSIONS.includes(ext);
};

const needsMovieTranscoding = (value) => {
  const normalized = String(value || '').toLowerCase();
  const ext = normalized.startsWith('.') ? normalized : path.extname(normalized);
  return ext === '.mkv';
};

function stripTechnicalPrefix(value) {
  return String(value || '').replace(/^\d{10,}-/, '');
}

function buildDisplayTitle(filename) {
  const ext = path.extname(filename);
  return stripTechnicalPrefix(path.basename(filename, ext)).replace(/[_]+/g, ' ').trim() || 'Untitled';
}

function buildDisplayName(filename) {
  const title = buildDisplayTitle(filename);
  const ext = path.extname(filename);
  return ext ? `${title}${ext}` : title;
}

function buildUniqueUploadFilename(directory, originalName) {
  const originalExt = path.extname(originalName || '').toLowerCase();
  const safeExt = originalExt || '.mp4';
  const safeBase = sanitizeFilenamePart(path.basename(originalName || `movie${safeExt}`, originalExt || safeExt)) || 'movie';
  let candidate = `${safeBase}${safeExt}`;
  let counter = 2;

  while (fs.existsSync(path.join(directory, candidate))) {
    candidate = `${safeBase}-${counter}${safeExt}`;
    counter += 1;
  }

  return candidate;
}

const isHiddenSystemEntry = (name) => {
  const normalized = String(name || '').trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  return normalized.startsWith('.') || normalized.startsWith('._') || HIDDEN_SYSTEM_NAMES.has(normalized);
};

const isFfmpegAvailable = () => {
  const result = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  return !result.error && result.status === 0;
};

const isFfprobeAvailable = () => {
  const result = spawnSync('ffprobe', ['-version'], { stdio: 'ignore' });
  return !result.error && result.status === 0;
};

const parseRangeHeader = (rangeHeader, totalSize) => {
  if (!rangeHeader || typeof rangeHeader !== 'string' || !Number.isFinite(totalSize) || totalSize <= 0) {
    return null;
  }

  const match = rangeHeader.match(/bytes=(\d*)-(\d*)/i);
  if (!match) {
    return null;
  }

  const [, startRaw, endRaw] = match;
  const start = startRaw ? Number(startRaw) : 0;
  const end = endRaw ? Number(endRaw) : totalSize - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start) {
    return null;
  }

  return {
    start,
    end: Math.min(end, totalSize - 1),
  };
};

const probeMovieDurationSeconds = (filePath) => {
  const probe = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', filePath],
    { encoding: 'utf8' },
  );

  if (probe.error || probe.status !== 0 || !probe.stdout) {
    return 0;
  }

  const duration = Number(String(probe.stdout).trim());
  return Number.isFinite(duration) && duration > 0 ? duration : 0;
};

const estimateSeekSecondsFromRange = (range = null, totalSize = 0, durationSeconds = 0) => {
  const start = Number(range?.start || 0);
  if (!Number.isFinite(start) || start <= 0 || !Number.isFinite(totalSize) || totalSize <= 0 || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return 0;
  }

  const ratio = Math.max(0, Math.min(0.995, start / totalSize));
  return Math.max(0, durationSeconds * ratio);
};

const clampSeekSeconds = (seconds = 0, durationSeconds = 0) => {
  const safeSeconds = Number(seconds);
  if (!Number.isFinite(safeSeconds) || safeSeconds <= 0) {
    return 0;
  }

  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return safeSeconds;
  }

  return Math.max(0, Math.min(safeSeconds, Math.max(durationSeconds - 0.25, 0)));
};

const formatSeekSeconds = (seconds = 0) => {
  const safe = Number(seconds);
  return Number.isFinite(safe) && safe > 0 ? safe.toFixed(3) : '0.000';
};

const buildMovieDirectStreamArgs = ({ filePath, seekSeconds = 0, audioTrackIndex = null }) => {
  const args = [
    '-hide_banner',
    '-loglevel', 'info',
    '-nostdin',
  ];

  if (seekSeconds > 0) {
    args.push('-ss', formatSeekSeconds(seekSeconds));
  }

  args.push(
    '-i', filePath,
    '-map', '0:v:0',
    '-map', Number.isInteger(audioTrackIndex) && audioTrackIndex >= 0 ? `0:${audioTrackIndex}` : '0:a:0?',
    '-map_metadata', '-1',
    '-map_chapters', '-1',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-ac', '6',
    '-b:a', '384k',
    '-movflags', TRANSCODE_MOVFLAGS,
    '-f', 'mp4',
    'pipe:1',
  );

  return args;
};

const buildMovieTranscodeArgs = ({ filePath, seekSeconds = 0, audioTrackIndex = null, subtitleIndex = null, sourceWidth = 0, videoCodec = null, audioCodec = null }) => {
  const is4K = sourceWidth >= 3840;
  const videoBitrate = is4K ? '35M' : '8M';

  // Smart copy: if source is already browser-compatible (H.264/H.265 + AAC), remux without re-encoding
  const canCopyVideo = videoCodec && ['h264', 'hevc'].includes(videoCodec.toLowerCase());
  const canCopyAudio = audioCodec && ['aac', 'mp3', 'opus'].includes(audioCodec.toLowerCase());
  const useStreamCopy = canCopyVideo && canCopyAudio;

  // 4K: HEVC 10-bit HDR10 pipeline; SD/HD: H.264 high profile
  const useHEVC = is4K && !useStreamCopy;
  const vfFilters = is4K
    ? 'format=p010le'
    : 'scale=1920:-2,format=yuv420p,setparams=colorspace=bt709:color_primaries=bt709:color_trc=bt709';

  const args = [
    '-hide_banner',
    '-loglevel', 'info',
    '-nostdin',
    '-probesize', '10M',
    '-analyzeduration', '10M',
  ];

  if (seekSeconds > 0) {
    args.push('-ss', formatSeekSeconds(seekSeconds));
  }

  args.push(
    '-i', filePath,
    '-map', '0:v:0',
    '-map', Number.isInteger(audioTrackIndex) && audioTrackIndex >= 0 ? `0:${audioTrackIndex}` : '0:a:0?',
    '-map_metadata', '-1',
    '-map_chapters', '-1',
  );

  if (useStreamCopy) {
    // No re-encoding needed — just remux into fragmented MP4
    args.push('-c:v', 'copy', '-c:a', 'copy');
    console.log('[transcode] Using stream copy (no re-encode)', { videoCodec, audioCodec });
  } else if (useHEVC) {
    args.push(
      '-c:v', 'hevc_videotoolbox',
      '-allow_sw', '1',
      '-b:v', videoBitrate,
      '-maxrate', '50M',
      '-bufsize', '100M',
      '-profile:v', 'main10',
      '-color_primaries', 'bt2020',
      '-color_trc', 'smpte2084',
      '-colorspace', 'bt2020nc',
    );
  } else {
    args.push(
      '-c:v', 'h264_videotoolbox',
      '-allow_sw', '1',
      '-b:v', videoBitrate,
      '-profile:v', 'high',
      '-level', '4.1',
    );
  }

  // Subtitles are handled by the frontend (WebVTT overlay) — no burn-in
  if (!useStreamCopy) {
    args.push('-vf', vfFilters);
    args.push(
      '-c:a', 'aac',
      '-ac', '6',
      '-b:a', '384k',
    );
  }

  args.push(
    '-avoid_negative_ts', 'make_zero',
    '-fflags', '+genpts+discardcorrupt',
    '-max_muxing_queue_size', '1024',
    '-movflags', TRANSCODE_MOVFLAGS,
    '-f', 'mp4',
    'pipe:1',
  );

  return args;
};

/**
 * Build FFmpeg args for HLS output (segmented .ts files + .m3u8 playlist).
 * Writes segments to `outputDir`. Returns args array.
 */
const buildMovieHlsArgs = ({ filePath, seekSeconds = 0, audioTrackIndex = null, sourceWidth = 0, videoCodec = null, audioCodec = null, outputDir }) => {
  const is4K = sourceWidth >= 3840;
  const videoBitrate = is4K ? '35M' : '8M';

  const canCopyVideo = videoCodec && ['h264', 'hevc'].includes(videoCodec.toLowerCase());
  const canCopyAudio = audioCodec && ['aac', 'mp3', 'opus'].includes(audioCodec.toLowerCase());
  const useStreamCopy = canCopyVideo && canCopyAudio;
  const useHEVC = is4K && !useStreamCopy;

  const args = [
    '-hide_banner', '-loglevel', 'info', '-nostdin',
    '-probesize', '10M', '-analyzeduration', '10M',
  ];

  if (seekSeconds > 0) {
    args.push('-ss', formatSeekSeconds(seekSeconds));
  }

  args.push(
    '-i', filePath,
    '-map', '0:v:0',
    '-map', Number.isInteger(audioTrackIndex) && audioTrackIndex >= 0 ? `0:${audioTrackIndex}` : '0:a:0?',
    '-map_metadata', '-1',
    '-map_chapters', '-1',
  );

  if (useStreamCopy) {
    args.push('-c:v', 'copy', '-c:a', 'copy');
  } else if (useHEVC) {
    args.push(
      '-c:v', 'hevc_videotoolbox', '-allow_sw', '1',
      '-b:v', videoBitrate, '-maxrate', '50M', '-bufsize', '100M',
      '-profile:v', 'main10',
      '-color_primaries', 'bt2020', '-color_trc', 'smpte2084', '-colorspace', 'bt2020nc',
      '-vf', 'format=p010le',
    );
    args.push('-c:a', 'aac', '-ac', '6', '-b:a', '384k');
  } else {
    args.push(
      '-c:v', 'h264_videotoolbox', '-allow_sw', '1',
      '-b:v', videoBitrate, '-profile:v', 'high', '-level', '4.1',
      '-vf', 'scale=1920:-2,format=yuv420p,setparams=colorspace=bt709:color_primaries=bt709:color_trc=bt709',
    );
    args.push('-c:a', 'aac', '-ac', '6', '-b:a', '384k');
  }

  const playlistPath = path.join(outputDir, 'index.m3u8');
  const segmentPath = path.join(outputDir, 'seg%03d.ts');

  args.push(
    '-f', 'hls',
    '-hls_time', '4',
    '-hls_list_size', '0',
    '-hls_playlist_type', 'event',
    '-hls_segment_type', 'mpegts',
    '-hls_segment_filename', segmentPath,
    '-hls_flags', 'temp_file+independent_segments',
    playlistPath,
  );

  return args;
};

// Track active HLS sessions for cleanup
const activeHlsSessions = new Map();

const resolveRequestedAudioTrackOrdinal = (filePath, requestedAudioIndex) => {
  if (!Number.isInteger(requestedAudioIndex) || requestedAudioIndex < 0) {
    return null;
  }

  // Validate the requested index is actually an audio stream
  if (!isFfprobeAvailable()) {
    return requestedAudioIndex;
  }

  const streams = probeMovieStreams(filePath);
  const audioStreams = Array.isArray(streams?.audio) ? streams.audio : [];
  if (!audioStreams.length) {
    return null;
  }

  // Check if the requested absolute index belongs to an audio stream
  const isValidAudioStream = audioStreams.some((s) => s.index === requestedAudioIndex);
  if (isValidAudioStream) {
    return requestedAudioIndex;
  }

  // Fallback: return first audio stream's absolute index
  console.warn(`[audio] requested index ${requestedAudioIndex} is not an audio stream, falling back to ${audioStreams[0].index}`);
  return audioStreams[0].index;
};

// Track active transcode sessions per filename to kill previous ones
const activeTranscodeSessions = new Map();

const extractMovieSubtitleTrack = (req, res, requestedStreamIndex, { useSubtitleOrdinal = false } = {}) => {
  const rawFilename = req.params.filename || req.params[0] || '';
  let filePath = resolveMediaPath('movies', rawFilename);

  // Fallback: try direct path.join if resolveMediaPath fails (wildcard capture edge case)
  if (!filePath || !fs.existsSync(filePath)) {
    try {
      const decoded = decodeURIComponent(rawFilename);
      const fallback = path.join(process.cwd(), 'media', 'movies', decoded);
      if (fs.existsSync(fallback)) {
        filePath = fallback;
      }
    } catch (_) { /* ignore */ }
  }

  console.log('[subtitles] extraction request', {
    filename: rawFilename,
    resolvedPath: filePath,
    exists: filePath ? fs.existsSync(filePath) : false,
    requestedIndex: requestedStreamIndex,
    useSubtitleOrdinal,
  });

  if (!filePath || !fs.existsSync(filePath)) {
    console.error('[subtitles] file not found:', filePath);
    return res.status(404).json({ error: 'Movie file not found', resolvedPath: filePath || null });
  }

  if (!isFfmpegAvailable()) {
    return res.status(503).json({ error: 'FFmpeg is required for subtitle extraction' });
  }

  const streamIndex = Number(requestedStreamIndex);
  if (!Number.isInteger(streamIndex) || streamIndex < 0) {
    return res.status(400).json({ error: 'subtitle index must be a valid stream index' });
  }

  const startTime = Number(req.query.startTime || 0);

  res.status(200);
  res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Use 0:s:N (subtitle ordinal) for path-based route,
  // Use 0:N (global stream index) for query-based route.
  const mapArg = useSubtitleOrdinal ? `0:s:${streamIndex}` : `0:${streamIndex}`;

  const ffmpegArgs = [
    '-hide_banner',
    '-loglevel', 'error',
    '-nostdin',
    '-i', filePath,
    '-map', mapArg,
    '-f', 'webvtt',
    'pipe:1',
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'pipe'] });

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    ffmpeg.stdout?.destroy?.();
    ffmpeg.stderr?.destroy?.();
    if (!ffmpeg.killed) ffmpeg.kill('SIGKILL');
  };

  ffmpeg.stderr?.on('data', (chunk) => {
    console.error('[subtitles] ffmpeg stderr:', String(chunk).trim());
  });

  ffmpeg.stdout?.on('error', () => {
    if (!res.writableEnded) res.end();
    cleanup();
  });

  ffmpeg.stdout?.pipe(res);

  ffmpeg.on('error', (error) => {
    console.error('[subtitles] ffmpeg spawn error:', error?.message || error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Unable to extract subtitles' });
      return;
    }
    if (!res.writableEnded) res.end();
  });

  ffmpeg.on('close', (code) => {
    if (code !== 0 && !cleanedUp) {
      console.error('[subtitles] ffmpeg exited with code', code);
    }
    if (!res.writableEnded) res.end();
  });

  req.on('close', cleanup);
  res.on('close', cleanup);

  return null;
};

const parseMovieIdentity = (name = '') => {
  const displayTitle = buildDisplayTitle(name);
  const normalized = String(displayTitle || '').replace(/[._]+/g, ' ').trim();
  const seasonEpisode = normalized.match(/(.+?)\s+s(\d{1,2})\s*e(\d{1,2})/i);
  if (seasonEpisode) {
    return {
      query: seasonEpisode[1].trim(),
      isEpisode: true,
      season: Number(seasonEpisode[2]),
      episode: Number(seasonEpisode[3]),
      title: normalized,
    };
  }

  return {
    query: normalized,
    isEpisode: false,
    season: null,
    episode: null,
    title: normalized,
  };
};

const fetchTmdbMetadata = async (movieIdentity) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey || !movieIdentity?.query || typeof fetch !== 'function') {
    return null;
  }

  const base = 'https://api.themoviedb.org/3';
  const query = encodeURIComponent(movieIdentity.query);
  const endpoint = movieIdentity.isEpisode ? 'search/tv' : 'search/movie';
  const searchUrl = `${base}/${endpoint}?api_key=${encodeURIComponent(apiKey)}&query=${query}`;

  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) {
    return null;
  }

  const searchPayload = await searchResponse.json();
  const first = searchPayload?.results?.[0];
  if (!first) {
    return null;
  }

  const id = first.id;
  if (!id) {
    return null;
  }

  if (movieIdentity.isEpisode && Number.isFinite(movieIdentity.season) && Number.isFinite(movieIdentity.episode)) {
    const episodeUrl = `${base}/tv/${id}/season/${movieIdentity.season}/episode/${movieIdentity.episode}?api_key=${encodeURIComponent(apiKey)}`;
    const episodeResponse = await fetch(episodeUrl);
    if (!episodeResponse.ok) {
      return {
        source: 'tmdb',
        itemType: 'tv',
        title: first.name,
        overview: first.overview || null,
        rating: first.vote_average || null,
        backdropPath: first.backdrop_path || null,
        posterPath: first.poster_path || null,
      };
    }

    const episodePayload = await episodeResponse.json();
    return {
      source: 'tmdb',
      itemType: 'tv-episode',
      title: episodePayload.name || first.name,
      overview: episodePayload.overview || first.overview || null,
      rating: episodePayload.vote_average || first.vote_average || null,
      airDate: episodePayload.air_date || null,
      stillPath: episodePayload.still_path || null,
      backdropPath: first.backdrop_path || null,
      posterPath: first.poster_path || null,
      season: movieIdentity.season,
      episode: movieIdentity.episode,
    };
  }

  return {
    source: 'tmdb',
    itemType: 'movie',
    title: first.title || first.name,
    overview: first.overview || null,
    rating: first.vote_average || null,
    releaseDate: first.release_date || null,
    backdropPath: first.backdrop_path || null,
    posterPath: first.poster_path || null,
  };
};

const probeMovieStreams = (filePath) => {
  const probe = spawnSync(
    'ffprobe',
    ['-v', 'error', '-print_format', 'json', '-show_streams', filePath],
    { encoding: 'utf8' },
  );

  if (probe.error || probe.status !== 0 || !probe.stdout) {
    return null;
  }

  try {
    const parsed = JSON.parse(probe.stdout);
    const streams = Array.isArray(parsed.streams) ? parsed.streams : [];
    const result = {
      audio: streams
        .filter((stream) => stream.codec_type === 'audio')
        .map((stream) => ({
          index: stream.index,
          codec: stream.codec_name || null,
          channels: stream.channels || null,
          language: stream.tags?.language || 'und',
          title: stream.tags?.title || null,
        })),
      subtitles: streams
        .filter((stream) => stream.codec_type === 'subtitle')
        .map((stream) => ({
          index: stream.index,
          codec: stream.codec_name || null,
          language: stream.tags?.language || 'und',
          title: stream.tags?.title || null,
        })),
      video: streams
        .filter((stream) => stream.codec_type === 'video')
        .map((stream) => ({
          index: stream.index,
          codec: stream.codec_name || null,
          width: stream.width || null,
          height: stream.height || null,
        })),
    };

    // Discover sidecar .vtt files (e.g. Movie.uk.vtt, Movie.uk.enhanced.vtt)
    const dir = path.dirname(filePath);
    const base = path.basename(filePath, path.extname(filePath));
    const vttPattern = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.([a-z]{2,3})(\\.enhanced)?\\.vtt$`, 'i');
    try {
      const dirFiles = fs.readdirSync(dir);
      for (const f of dirFiles) {
        const m = f.match(vttPattern);
        if (m) {
          const lang = m[1];
          const isEnhanced = !!m[2];
          const label = isEnhanced ? `${lang}.vtt (enhanced)` : `${lang}.vtt (external)`;
          const vttKey = isEnhanced ? `vtt:${lang}:enhanced` : `vtt:${lang}`;
          result.subtitles.push({
            index: vttKey,
            codec: 'webvtt',
            language: lang,
            title: label,
            sidecar: true,
            enhanced: isEnhanced,
            sidecarPath: path.join(dir, f),
          });
        }
      }
    } catch (_) {}

    return result;
  } catch (_error) {
    return null;
  }
};

const getLocalNetworkAddresses = () => {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const entries of Object.values(interfaces)) {
    for (const details of entries || []) {
      if (details && details.family === 'IPv4' && !details.internal) {
        addresses.push(details.address);
      }
    }
  }

  return addresses;
};

const resolveMediaPath = (category, encodedFilename, categoriesMap = CATEGORIES) => {
  const folder = categoriesMap[category];
  if (!folder) {
    return null;
  }

  let decodedName;
  try {
    decodedName = decodeURIComponent(encodedFilename);
  } catch (_error) {
    return null;
  }

  const resolved = path.resolve(folder, decodedName);
  if (!resolved.startsWith(path.resolve(folder) + path.sep)) {
    return null;
  }

  return resolved;
};

const decodeMovieFilenameParam = (value) => {
  let decodedName;
  try {
    decodedName = decodeURIComponent(value || '');
  } catch (_error) {
    return null;
  }

  // Trim accidental trailing slash from clients that normalize URLs unexpectedly.
  const normalized = String(decodedName).replace(/\/+$/, '');
  return normalized || null;
};

const toForwardSlashes = (value) => String(value || '').split(path.sep).join('/');

const buildMediaUrl = (category, relativePath) =>
  `/media/${category}/${encodeURIComponent(toForwardSlashes(relativePath))}`;

const getCategoryFromExt = (ext) => {
  const normalized = ext.toLowerCase();
  if (MOVIE_EXTENSIONS.includes(normalized)) {
    return 'movies';
  }
  if (MUSIC_EXTENSIONS.includes(normalized)) {
    return 'music';
  }
  return 'books';
};

const isSidecarPreviewFile = (filename, allFileNames) => {
  const ext = path.extname(filename).toLowerCase();
  if (!PREVIEW_SIDECAR_EXTENSIONS.includes(ext)) {
    return false;
  }

  const base = path.basename(filename, ext);
  return allFileNames.some((candidate) => {
    if (candidate === filename) {
      return false;
    }
    const candidateExt = path.extname(candidate).toLowerCase();
    const candidateBase = path.basename(candidate, candidateExt);
    return candidateBase === base && !PREVIEW_SIDECAR_EXTENSIONS.includes(candidateExt);
  });
};

const findMatchingSidecarFile = (filename, allFileNames = []) => {
  const base = path.basename(filename, path.extname(filename)).toLowerCase();
  return allFileNames.find((candidate) => {
    const ext = path.extname(candidate).toLowerCase();
    if (!PREVIEW_SIDECAR_EXTENSIONS.includes(ext)) {
      return false;
    }
    const candidateBase = path.basename(candidate, path.extname(candidate)).toLowerCase();
    return candidateBase === base;
  }) || null;
};

const findSidecarPreview = (filename, allFileNames, category, relativeDir = '') => {
  const candidate = findMatchingSidecarFile(filename, allFileNames);
  if (!candidate) {
    return null;
  }
  const relativeCandidate = relativeDir ? `${relativeDir}/${candidate}` : candidate;
  return buildMediaUrl(category, relativeCandidate);
};

const findAlbumPreview = (allFileNames, category, relativeDir = '') => {
  for (const basename of ALBUM_COVER_BASENAMES) {
    for (const ext of PREVIEW_SIDECAR_EXTENSIONS) {
      const candidate = `${basename}${ext}`;
      if (allFileNames.includes(candidate)) {
        const relativeCandidate = relativeDir ? `${relativeDir}/${candidate}` : candidate;
        return buildMediaUrl(category, relativeCandidate);
      }
    }
  }

  const firstImage = allFileNames.find((filename) => PREVIEW_SIDECAR_EXTENSIONS.includes(path.extname(filename).toLowerCase()));
  if (!firstImage) {
    return null;
  }

  const relativeCandidate = relativeDir ? `${relativeDir}/${firstImage}` : firstImage;
  return buildMediaUrl(category, relativeCandidate);
};

const parseAlbumMetadata = (absoluteDir) => {
  const metadataPath = path.join(absoluteDir, 'metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (_error) {
      // ignore malformed metadata files
    }
  }

  const infoPath = path.join(absoluteDir, 'info.txt');
  if (fs.existsSync(infoPath)) {
    const infoRaw = fs.readFileSync(infoPath, 'utf8');
    const info = {};
    infoRaw.split(/\r?\n/).forEach((line) => {
      const [rawKey, ...rest] = line.split(':');
      if (!rawKey || !rest.length) {
        return;
      }
      const key = rawKey.trim().toLowerCase();
      const value = rest.join(':').trim();
      if (key && value) {
        info[key] = value;
      }
    });
    return info;
  }

  return null;
};

const parseTrackNumber = (filename) => {
  const base = String(filename || '').replace(/\.[^/.]+$/, '');
  // Leading number: "01 - Title" or "01. Title"
  const leadMatch = base.match(/^(\d{1,4})[\s._-]+/);
  if (leadMatch) return Number(leadMatch[1]);
  // Mid-filename: "Artist - Album - 01 Title" or "Artist - Album - 01 - Title"
  const midMatch = base.match(/[-–—]\s*(\d{1,4})\s+[A-Za-z]/);
  if (midMatch) return Number(midMatch[1]);
  return null;
};

/**
 * Infer disc number from folder path (e.g. "Artist - Album/Disc 2" → 2)
 */
const inferDiscFromPath = (folderPath) => {
  const match = String(folderPath || '').match(/(?:disc|cd|disk)\s*(\d+)\s*$/i);
  return match ? Number(match[1]) : null;
};

/**
 * Resolve album display name from relative path.
 * If the folder is a disc subfolder (e.g. "Artist - Album/Disc 2"), use parent name.
 */
const resolveAlbumName = (relativeDir) => {
  const base = path.basename(relativeDir);
  if (/^(disc|cd|disk)\s*\d+$/i.test(base)) {
    const parent = path.dirname(relativeDir);
    if (parent && parent !== '.' && parent !== relativeDir) {
      return path.basename(parent);
    }
  }
  return base;
};

const listMusicFiles = (category, categoriesMap = CATEGORIES) => {
  const folder = categoriesMap[category];
  const tracks = [];

  // Helper: find cover art in a linked track's directory
  const findLinkedAlbumPreview = (absoluteTrackPath) => {
    try {
      const dir = path.dirname(absoluteTrackPath);
      const files = fs.readdirSync(dir);
      const coverNames = ['cover', 'folder', 'front', 'albumart', 'album', 'artwork'];
      const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
      for (const f of files) {
        const base = path.basename(f, path.extname(f)).toLowerCase();
        const ext = path.extname(f).toLowerCase();
        if (imageExts.includes(ext) && coverNames.some(n => base.includes(n))) {
          return `/api/stream?path=${encodeURIComponent(path.join(dir, f))}`;
        }
      }
      // Fallback: any image in the directory
      for (const f of files) {
        if (imageExts.includes(path.extname(f).toLowerCase())) {
          return `/api/stream?path=${encodeURIComponent(path.join(dir, f))}`;
        }
      }
    } catch (_) {}
    return null;
  };

  const findLinkedTrackPreview = (absoluteTrackPath) => {
    try {
      const dir = path.dirname(absoluteTrackPath);
      const files = fs.readdirSync(dir);
      const sidecar = findMatchingSidecarFile(path.basename(absoluteTrackPath), files);
      if (!sidecar) return null;
      return `/api/stream?path=${encodeURIComponent(path.join(dir, sidecar))}`;
    } catch (_) {}
    return null;
  };

  const walkDirectory = (absoluteDir, relativeDir = '') => {
    const entries = fs
      .readdirSync(absoluteDir, { withFileTypes: true })
      .filter((entry) => !isHiddenSystemEntry(entry.name));
    const fileNames = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
    const albumPreviewUrl = findAlbumPreview(fileNames, category, relativeDir);
    const albumMeta = parseAlbumMetadata(absoluteDir);
    const albumTitle =
      albumMeta?.title ||
      albumMeta?.album ||
      albumMeta?.name ||
      (relativeDir ? resolveAlbumName(relativeDir) : 'Singles');
    const albumArtist = albumMeta?.artist || albumMeta?.albumArtist || null;

    for (const entry of entries) {
      if (isHiddenSystemEntry(entry.name)) {
        continue;
      }

      if (entry.isDirectory()) {
        const nextRelativeDir = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
        walkDirectory(path.join(absoluteDir, entry.name), toForwardSlashes(nextRelativeDir));
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const ext = path.extname(entry.name).toLowerCase();
      if (!MUSIC_EXTENSIONS.includes(ext)) {
        continue;
      }

      const fullPath = path.join(absoluteDir, entry.name);
      const stat = fs.statSync(fullPath);
      const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
      const normalizedRelativePath = toForwardSlashes(relativePath);
      const songPreview = findSidecarPreview(entry.name, fileNames, category, relativeDir);

      // Enrich with cached metadata (duration, year, artist, album) if available
      let durationSeconds = null;
      let trackYear = null;
      let cachedArtist = albumArtist;
      let cachedDisc = null;
      let cachedAlbum = null;
      let hasEmbeddedCover = false;
      if (typeof stmtGetTrackMeta !== 'undefined') {
        try {
          const cached = stmtGetTrackMeta.get(`${category}/${normalizedRelativePath}`) || stmtGetTrackMeta.get(normalizedRelativePath);
          if (cached) {
            // Skip soft-deleted tracks — don't auto-restore, respect user's delete
            if (cached.deleted_at) {
              continue;
            }
            if (cached.duration) durationSeconds = cached.duration;
            if (cached.year) trackYear = cached.year;
            if (cached.artist && !albumArtist) cachedArtist = cached.artist;
            if (cached.disc) cachedDisc = cached.disc;
            if (cached.album) cachedAlbum = cached.album;
            if (cached.cover_format) hasEmbeddedCover = true;
          }
        } catch (_e) { /* db not ready yet */ }
      }

      const previewUrl = songPreview || (hasEmbeddedCover ? `/api/track-cover/${encodeURIComponent(`${category}/${normalizedRelativePath}`)}` : null) || albumPreviewUrl;
      const previewSource = songPreview ? 'track-sidecar' : (hasEmbeddedCover ? 'embedded' : (albumPreviewUrl ? 'album-sidecar' : null));

      tracks.push({
        id: `${category}/${encodeURIComponent(normalizedRelativePath)}`,
        path: `${category}/${normalizedRelativePath}`,
        name: normalizedRelativePath,
        title: path.basename(entry.name, ext).replace(/^\d{1,3}[\s._-]+/, ''),
        album: cachedAlbum || albumTitle,
        artist: cachedArtist,
        albumPath: relativeDir || 'Singles',
        folder: relativeDir || 'Singles',
        albumMetadata: albumMeta,
        trackNumber: parseTrackNumber(entry.name),
        disc: cachedDisc || inferDiscFromPath(relativeDir),
        durationSeconds,
        year: trackYear,
        category,
        ext,
        size: stat.size,
        modifiedAt: stat.mtime,
        originalName: getOriginalName(category, normalizedRelativePath),
        url: buildMediaUrl(category, normalizedRelativePath),
        albumPreviewUrl,
        previewUrl: (() => {
          if (hasEmbeddedCover || songPreview) console.log(`[artwork-debug-server] ${normalizedRelativePath} hasEmbeddedCover=${hasEmbeddedCover}, songPreview=${songPreview}, albumPreviewUrl=${albumPreviewUrl}, resolved=${previewUrl}`);
          return previewUrl;
        })(),
        previewSource,
        detectedType: 'music',
      });
    }
  };

  walkDirectory(folder);

  // Also include tracks from linked library folders (indexed in SQLite)
  try {
    const linkedTracks = tracksDb.prepare(
      `SELECT path, title, artist, album, year, duration, disc, absolute_path,
              cover_format, (CASE WHEN cover_data IS NOT NULL THEN 1 ELSE 0 END) AS has_cover
       FROM tracks WHERE source = 'linked' AND deleted_at IS NULL`
    ).all();
    for (const row of linkedTracks) {
      // Skip if file no longer exists
      if (!row.absolute_path || !fs.existsSync(row.absolute_path)) continue;
      const ext = path.extname(row.absolute_path).toLowerCase();
      const stat = fs.statSync(row.absolute_path);
      const relativeDir = path.dirname(row.path).replace(/^music\//, '');

      // Cover art: DB-cached cover via API endpoint, fallback to sidecar file
      const trackSidecarPreview = findLinkedTrackPreview(row.absolute_path);
      const embeddedPreview = row.has_cover ? `/api/track-cover/${encodeURIComponent(row.path)}` : null;
      const albumPreview = findLinkedAlbumPreview(row.absolute_path);
      const previewUrl = trackSidecarPreview || embeddedPreview || albumPreview;
      const previewSource = trackSidecarPreview ? 'track-sidecar' : (embeddedPreview ? 'embedded' : (albumPreview ? 'album-sidecar' : null));

      tracks.push({
        id: `${category}/${encodeURIComponent(row.path.replace(/^music\//, ''))}`,
        path: row.path,
        name: row.path.replace(/^music\//, ''),
        title: row.title || path.basename(row.absolute_path, ext),
        album: row.album || relativeDir || 'Linked',
        artist: row.artist || null,
        albumPath: relativeDir || 'Linked',
        folder: relativeDir || 'Linked',
        albumMetadata: null,
        trackNumber: parseTrackNumber(path.basename(row.absolute_path)),
        disc: row.disc || null,
        durationSeconds: row.duration || null,
        year: row.year || null,
        category,
        ext,
        size: stat.size,
        modifiedAt: stat.mtime,
        originalName: null,
        url: `/api/stream?path=${encodeURIComponent(row.absolute_path)}`,
        albumPreviewUrl: albumPreview,
        previewUrl: previewUrl,
        previewSource,
        detectedType: 'music',
        source: 'linked',
        absolutePath: row.absolute_path,
      });
    }
  } catch (e) {
    console.warn('[Library] Failed to load linked tracks:', e.message);
  }

  return tracks.sort((a, b) => b.modifiedAt - a.modifiedAt);
};

const listCategoryFiles = (category, categoriesMap = CATEGORIES) => {
  if (category === 'music') {
    return listMusicFiles(category, categoriesMap);
  }

  if (category === 'movies') {
    const folder = categoriesMap[category];
    const movies = [];

    const parseEpisode = (title, fallbackGroup) => {
      const sxe = title.match(/(.*?)[\s._-]+s(\d{1,2})[\s._-]*e(\d{1,2})/i);
      if (sxe) {
        return {
          showTitle: sxe[1].replace(/[._-]+/g, ' ').trim() || fallbackGroup,
          seasonNumber: Number(sxe[2]),
          episodeNumber: Number(sxe[3]),
        };
      }

      const xPattern = title.match(/(.*?)[\s._-]+(\d{1,2})x(\d{1,2})/i);
      if (xPattern) {
        return {
          showTitle: xPattern[1].replace(/[._-]+/g, ' ').trim() || fallbackGroup,
          seasonNumber: Number(xPattern[2]),
          episodeNumber: Number(xPattern[3]),
        };
      }

      return null;
    };

    const walkMovies = (absoluteDir, relativeDir = '') => {
      const entries = fs
        .readdirSync(absoluteDir, { withFileTypes: true })
        .filter((entry) => !isHiddenSystemEntry(entry.name));
      const fileNames = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

      for (const entry of entries) {
        if (isHiddenSystemEntry(entry.name)) {
          continue;
        }

        if (entry.isDirectory()) {
          const nextRelativeDir = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
          walkMovies(path.join(absoluteDir, entry.name), toForwardSlashes(nextRelativeDir));
          continue;
        }

        if (!entry.isFile()) {
          continue;
        }

        const ext = path.extname(entry.name);
        const isMovieFile = MOVIE_EXTENSIONS.includes(ext.toLowerCase());

        if (isSidecarPreviewFile(entry.name, fileNames)) {
          continue;
        }

        // Skip non-video files (subtitles, logs, etc.)
        if (!isMovieFile) {
          continue;
        }

        const fullPath = path.join(absoluteDir, entry.name);
        const stat = fs.statSync(fullPath);
        const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
        const normalizedRelativePath = toForwardSlashes(relativePath);
        const title = buildDisplayTitle(entry.name);
        const fallbackShowTitle = relativeDir ? path.basename(relativeDir) : null;
        const episodeMeta = parseEpisode(title, fallbackShowTitle);
        const isFolderShow = Boolean(relativeDir);
        const isShowEpisode = Boolean(episodeMeta) || isFolderShow;
        const showTitle = episodeMeta?.showTitle || (isFolderShow ? fallbackShowTitle : null);
        const seasonNumber = episodeMeta?.seasonNumber || (isFolderShow ? 1 : null);
        const episodeNumber = episodeMeta?.episodeNumber || null;
        const showKey = showTitle ? `${toForwardSlashes(relativeDir || showTitle)}::${showTitle}` : null;

        movies.push({
          id: `${category}/${encodeURIComponent(normalizedRelativePath)}`,
          name: normalizedRelativePath,
          displayName: buildDisplayName(entry.name),
          title,
          category,
          ext,
          size: stat.size,
          modifiedAt: stat.mtime,
          originalName: getOriginalName(category, normalizedRelativePath),
          url: buildMediaUrl(category, normalizedRelativePath),
          previewUrl: findSidecarPreview(entry.name, fileNames, category, relativeDir),
          detectedType: getCategoryFromExt(ext),
          needsTranscoding: needsMovieTranscoding(ext),
          type: isShowEpisode ? 'tvshow' : 'movie',
          isShowEpisode,
          showKey,
          showTitle,
          seasonNumber,
          episodeNumber,
          folder: relativeDir || null,
        });
      }
    };

    walkMovies(folder);
    return movies.sort((a, b) => b.modifiedAt - a.modifiedAt);
  }

  const folder = categoriesMap[category];
  const files = fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((entry) => !isHiddenSystemEntry(entry.name));
  const fileNames = files.filter((entry) => entry.isFile()).map((entry) => entry.name);

  return fileNames
    .filter((filename) => !isSidecarPreviewFile(filename, fileNames))
    .map((entry) => {
      const fullPath = path.join(folder, entry);
      const stat = fs.statSync(fullPath);
      const ext = path.extname(entry);
      return {
        id: `${category}/${encodeURIComponent(entry)}`,
        name: entry,
        displayName: buildDisplayName(entry),
        title: buildDisplayTitle(entry),
        category,
        ext,
        size: stat.size,
        modifiedAt: stat.mtime,
        originalName: getOriginalName(category, entry),
        url: buildMediaUrl(category, entry),
        previewUrl: findSidecarPreview(entry, fileNames, category),
        detectedType: getCategoryFromExt(ext),
        needsTranscoding: category === 'movies' ? needsMovieTranscoding(ext) : false,
      };
    })
    .sort((a, b) => b.modifiedAt - a.modifiedAt);
};

app.get('/api/direct/movies/:filename', (req, res) => {
  console.log('[api] direct stream (remux) request', {
    filename: req.params.filename,
    startTime: req.query.startTime || null,
  });

  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Movie file not found' });
  }

  if (!isFfmpegAvailable()) {
    return res.status(503).json({ error: 'FFmpeg is required for direct stream remuxing' });
  }

  const fileStats = fs.statSync(filePath);
  const fileSize = fileStats.size || 0;
  const explicitStartTime = Number(req.query.startTime || 0);
  const durationSeconds = isFfprobeAvailable() ? probeMovieDurationSeconds(filePath) : 0;
  const seekSeconds = clampSeekSeconds(explicitStartTime, durationSeconds);
  const requestedAudioIndex = Number(req.query.audioIndex ?? req.query.track);
  const selectedAudioTrackIndex = resolveRequestedAudioTrackOrdinal(filePath, requestedAudioIndex);

  res.status(200);
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accept-Ranges', 'none');
  if (durationSeconds > 0) {
    res.setHeader('X-Content-Duration', formatSeekSeconds(durationSeconds));
    res.setHeader('X-Movie-Duration-Seconds', formatSeekSeconds(durationSeconds));
  }
  if (seekSeconds > 0) {
    res.setHeader('X-Transcode-Seek-Seconds', formatSeekSeconds(seekSeconds));
  }
  res.setHeader('X-Stream-Mode', 'direct');

  const ffmpegArgs = buildMovieDirectStreamArgs({
    filePath,
    seekSeconds,
    audioTrackIndex: selectedAudioTrackIndex,
  });
  console.log('[api] direct stream ffmpeg command', ['ffmpeg', ...ffmpegArgs].join(' '));

  // Kill ALL previous transcode/direct sessions
  const sessionKey = filePath;
  for (const [key, entry] of activeTranscodeSessions.entries()) {
    if (!entry.process.killed) {
      console.log('[direct] killing previous session:', path.basename(key));
      entry.process.kill('SIGKILL');
    }
    activeTranscodeSessions.delete(key);
  }

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  activeTranscodeSessions.set(sessionKey, { process: ffmpeg });

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    activeTranscodeSessions.delete(sessionKey);
    ffmpeg.stdout?.destroy?.();
    ffmpeg.stderr?.destroy?.();
    if (!ffmpeg.killed) ffmpeg.kill('SIGKILL');
  };

  ffmpeg.stderr?.on('data', (chunk) => {
    console.log('[direct] FFmpeg:', String(chunk).trim());
  });

  ffmpeg.stdout?.on('error', () => {
    if (!res.writableEnded) res.end();
    cleanup();
  });

  let bytesWritten = 0;
  ffmpeg.stdout?.on('data', (chunk) => {
    bytesWritten += chunk.length;
    const canWrite = res.write(chunk);
    if (!canWrite) {
      ffmpeg.stdout.pause();
      res.once('drain', () => ffmpeg.stdout.resume());
    }
  });

  ffmpeg.stdout?.on('end', () => {
    console.log(`[direct] stream ended, total bytes: ${bytesWritten}`);
    if (!res.writableEnded) res.end();
  });

  res.flushHeaders?.();

  ffmpeg.on('error', (error) => {
    console.error('[direct] FFmpeg spawn error:', error?.message || error);
    if (!res.headersSent) return res.status(500).json({ error: 'Unable to start direct stream' });
    if (!res.writableEnded) res.end();
  });

  ffmpeg.on('close', (code, signal) => {
    if (code !== 0 && signal !== 'SIGKILL') {
      console.error('[direct] FFmpeg exited with code', code);
    }
    if (!res.writableEnded) res.end();
  });

  req.on('close', cleanup);
  res.on('close', cleanup);
});

app.get('/api/transcode/movies/:filename', (req, res) => {
  console.log('[api] transcode request', {
    method: req.method,
    path: req.originalUrl,
    filename: req.params.filename,
    range: req.headers.range || null,
    startTime: req.query.startTime || null,
  });
  console.log('[api] transcode range header:', req.headers.range || null);
  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Movie file not found' });
  }

  if (!isFfmpegAvailable()) {
    return res.status(503).json({ error: 'FFmpeg is required for MKV transcoding fallback' });
  }

  const fileStats = fs.statSync(filePath);
  const fileSize = fileStats.size || 0;
  const range = parseRangeHeader(req.headers.range, fileSize);
  const explicitStartTime = Number(req.query.startTime || 0);
  const durationSeconds = isFfprobeAvailable() ? probeMovieDurationSeconds(filePath) : 0;
  const seekSeconds = clampSeekSeconds(explicitStartTime > 0
    ? explicitStartTime
    : estimateSeekSecondsFromRange(range, fileSize, durationSeconds), durationSeconds);
  const requestedAudioIndex = Number(req.query.audioIndex ?? req.query.track);
  const selectedAudioTrackIndex = resolveRequestedAudioTrackOrdinal(filePath, requestedAudioIndex);
  const subtitleIndex = req.query.subtitleIndex != null ? Number(req.query.subtitleIndex) : null;

  res.status(200);
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Accept-Ranges', 'none');
  if (fileSize > 0) {
    res.setHeader('X-Source-Content-Length', String(fileSize));
  }
  if (durationSeconds > 0) {
    res.setHeader('X-Content-Duration', formatSeekSeconds(durationSeconds));
    res.setHeader('X-Movie-Duration-Seconds', formatSeekSeconds(durationSeconds));
  }
  if (seekSeconds > 0) {
    res.setHeader('X-Transcode-Seek-Seconds', formatSeekSeconds(seekSeconds));
  }

  if (selectedAudioTrackIndex != null) {
    res.setHeader('X-Selected-Audio-Track', String(selectedAudioTrackIndex));
  }

  // Probe source resolution and codecs for smart quality selection
  let sourceWidth = 0;
  let videoCodec = null;
  let audioCodec = null;
  if (isFfprobeAvailable()) {
    const streams = probeMovieStreams(filePath);
    const videoStream = streams?.video?.[0];
    sourceWidth = videoStream?.width || 0;
    videoCodec = videoStream?.codec || null;
    // Get codec of the selected audio track (or first audio)
    const audioStream = selectedAudioTrackIndex != null
      ? streams?.audio?.find(a => a.index === selectedAudioTrackIndex)
      : streams?.audio?.[0];
    audioCodec = audioStream?.codec || null;
  }

  const ffmpegArgs = buildMovieTranscodeArgs({
    filePath,
    seekSeconds,
    audioTrackIndex: selectedAudioTrackIndex,
    subtitleIndex: Number.isInteger(subtitleIndex) ? subtitleIndex : null,
    sourceWidth,
    videoCodec,
    audioCodec,
  });
  console.log('[api] ffmpeg command', ['ffmpeg', ...ffmpegArgs].join(' '), { sourceWidth, is4K: sourceWidth >= 3840, videoCodec, audioCodec });

  // Kill ALL previous transcode sessions (user can only watch one thing at a time)
  // Use a compound key so we don't kill the same seek position being retried by the browser
  const sessionKey = `${filePath}::${seekSeconds}::${selectedAudioTrackIndex || 0}`;
  for (const [key, entry] of activeTranscodeSessions.entries()) {
    if (key === sessionKey && !entry.process.killed) {
      // Same exact request (browser retry) — reuse nothing, but don't double-spawn.
      // Just let it proceed (the old one will be cleaned up when its response closes).
      console.log('[transcode] duplicate request for same seek position, killing old to restart clean');
    }
    if (!entry.process.killed) {
      entry.process.kill('SIGKILL');
    }
    activeTranscodeSessions.delete(key);
  }

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  activeTranscodeSessions.set(sessionKey, { process: ffmpeg });

  let stderr = '';
  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) {
      return;
    }
    cleanedUp = true;
    activeTranscodeSessions.delete(sessionKey);
    ffmpeg.stdout?.destroy?.();
    ffmpeg.stderr?.destroy?.();
    if (!ffmpeg.killed) {
      ffmpeg.kill('SIGKILL');
    }
  };

  ffmpeg.stderr?.on('data', (chunk) => {
    stderr += String(chunk || '');
    console.log('FFmpeg Log:', String(chunk || '').trim());
  });

  ffmpeg.stdout?.on('error', (error) => {
    console.error('FFmpeg stdout streaming error:', error?.message || error);
    if (!res.writableEnded) {
      res.end();
    }
    cleanup();
  });

  // Manual backpressure handling instead of pipe to prevent stream stalls
  let bytesWritten = 0;
  ffmpeg.stdout?.on('data', (chunk) => {
    bytesWritten += chunk.length;
    const canWrite = res.write(chunk);
    if (!canWrite) {
      ffmpeg.stdout.pause();
      res.once('drain', () => ffmpeg.stdout.resume());
    }
  });

  ffmpeg.stdout?.on('end', () => {
    console.log(`[transcode] stream ended, total bytes: ${bytesWritten}`);
    if (!res.writableEnded) res.end();
  });

  res.flushHeaders?.();

  ffmpeg.on('error', (error) => {
    console.error('FFmpeg spawn error:', error?.message || error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Unable to start transcoding' });
      return;
    }
    if (!res.writableEnded) {
      res.end();
    }
  });

  ffmpeg.on('close', (code, signal) => {
    if (code !== 0 && signal !== 'SIGKILL') {
      console.error('FFmpeg exited unexpectedly:', stderr.trim() || `code ${code}`);
    }
    if (!res.writableEnded) {
      res.end();
    }
  });

  req.on('close', cleanup);
  res.on('close', cleanup);
});

app.head('/api/transcode/movies/:filename', (req, res) => {
  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).end();
  }

  const fileStats = fs.statSync(filePath);
  const fileSize = fileStats.size || 0;
  const durationSeconds = isFfprobeAvailable() ? probeMovieDurationSeconds(filePath) : 0;

  res.status(200);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'video/mp4');
  if (fileSize > 0) {
    res.setHeader('X-Source-Content-Length', String(fileSize));
  }
  if (durationSeconds > 0) {
    res.setHeader('X-Content-Duration', formatSeekSeconds(durationSeconds));
    res.setHeader('X-Movie-Duration-Seconds', formatSeekSeconds(durationSeconds));
  }
  return res.end();
});

// ═══════════════════════════════════════════════════════════════════════════════
// HLS Streaming Endpoints — segmented .ts playback with instant seeking
// ═══════════════════════════════════════════════════════════════════════════════

app.get('/api/hls/movies/:filename/master.m3u8', (req, res) => {
  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Movie file not found' });
  }
  if (!isFfmpegAvailable()) {
    return res.status(503).json({ error: 'FFmpeg required' });
  }

  const explicitStartTime = Number(req.query.startTime || 0);
  const requestedAudioIndex = Number(req.query.audioIndex ?? -1);
  const selectedAudioTrackIndex = resolveRequestedAudioTrackOrdinal(filePath, requestedAudioIndex);
  const durationSeconds = isFfprobeAvailable() ? probeMovieDurationSeconds(filePath) : 0;
  const seekSeconds = clampSeekSeconds(explicitStartTime, durationSeconds);

  // Probe codecs
  let sourceWidth = 0, videoCodec = null, audioCodec = null;
  if (isFfprobeAvailable()) {
    const streams = probeMovieStreams(filePath);
    const videoStream = streams?.video?.[0];
    sourceWidth = videoStream?.width || 0;
    videoCodec = videoStream?.codec || null;
    const audioStream = selectedAudioTrackIndex != null
      ? streams?.audio?.find(a => a.index === selectedAudioTrackIndex)
      : streams?.audio?.[0];
    audioCodec = audioStream?.codec || null;
  }

  // Create session with unique temp dir
  const sessionId = `${req.params.filename}_${seekSeconds}_${selectedAudioTrackIndex || 0}_${Date.now()}`;
  const outputDir = path.join(os.tmpdir(), 'mymedia-hls', sessionId.replace(/[^a-zA-Z0-9._-]/g, '_'));
  fs.mkdirSync(outputDir, { recursive: true });

  // Kill previous HLS sessions
  for (const [key, session] of activeHlsSessions.entries()) {
    if (!session.process.killed) session.process.kill('SIGKILL');
    // Clean up old temp files
    try { fs.rmSync(session.outputDir, { recursive: true, force: true }); } catch (_) {}
    activeHlsSessions.delete(key);
  }

  const ffmpegArgs = buildMovieHlsArgs({
    filePath, seekSeconds, audioTrackIndex: selectedAudioTrackIndex,
    sourceWidth, videoCodec, audioCodec, outputDir,
  });
  console.log('[hls] starting session', { sessionId, seekSeconds, videoCodec, audioCodec });
  console.log('[hls] ffmpeg', ['ffmpeg', ...ffmpegArgs].join(' '));

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  activeHlsSessions.set(sessionId, { process: ffmpeg, outputDir, startTime: Date.now() });

  let stderr = '';
  ffmpeg.stderr.on('data', (chunk) => { stderr += chunk.toString().slice(-2000); });
  ffmpeg.on('close', (code) => {
    if (code !== 0 && code !== 255) {
      console.error('[hls] ffmpeg exited', code, stderr.slice(-500));
    }
  });

  // Wait for the playlist file to appear (FFmpeg writes it after first segment)
  const playlistPath = path.join(outputDir, 'index.m3u8');
  const maxWait = 15000;
  const pollInterval = 100;
  let waited = 0;

  const pollPlaylist = () => {
    if (fs.existsSync(playlistPath) && fs.statSync(playlistPath).size > 0) {
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (durationSeconds > 0) {
        res.setHeader('X-Movie-Duration-Seconds', formatSeekSeconds(durationSeconds));
      }
      if (seekSeconds > 0) {
        res.setHeader('X-Transcode-Seek-Seconds', formatSeekSeconds(seekSeconds));
      }
      // Rewrite segment URLs to point to our serve endpoint
      let playlist = fs.readFileSync(playlistPath, 'utf8');
      playlist = playlist.replace(/seg(\d+)\.ts/g, `/api/hls/movies/${encodeURIComponent(req.params.filename)}/segment/seg$1.ts?session=${encodeURIComponent(sessionId)}`);
      return res.send(playlist);
    }
    waited += pollInterval;
    if (waited >= maxWait || ffmpeg.killed || ffmpeg.exitCode != null) {
      return res.status(504).json({ error: 'HLS playlist generation timed out' });
    }
    setTimeout(pollPlaylist, pollInterval);
  };

  // Handle client disconnect
  req.on('close', () => {
    // Don't kill ffmpeg on playlist request close — segments still needed
  });

  pollPlaylist();
});

app.get('/api/hls/movies/:filename/segment/:segmentFile', (req, res) => {
  const sessionId = req.query.session;
  const session = sessionId ? activeHlsSessions.get(sessionId) : null;

  // Try to find segment in session dir, or scan all active sessions
  let segmentPath = null;
  if (session?.outputDir) {
    segmentPath = path.join(session.outputDir, req.params.segmentFile);
  } else {
    // Fallback: search all sessions
    for (const [, s] of activeHlsSessions) {
      const candidate = path.join(s.outputDir, req.params.segmentFile);
      if (fs.existsSync(candidate)) { segmentPath = candidate; break; }
    }
  }

  if (!segmentPath || !fs.existsSync(segmentPath)) {
    // Segment might not be written yet (FFmpeg still encoding ahead) — poll briefly
    const maxWait = 8000;
    let waited = 0;
    const poll = () => {
      if (segmentPath && fs.existsSync(segmentPath)) {
        res.setHeader('Content-Type', 'video/mp2t');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return fs.createReadStream(segmentPath).pipe(res);
      }
      waited += 200;
      if (waited >= maxWait) return res.status(404).json({ error: 'Segment not found' });
      setTimeout(poll, 200);
    };
    return poll();
  }

  res.setHeader('Content-Type', 'video/mp2t');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  fs.createReadStream(segmentPath).pipe(res);
});

// Cleanup HLS sessions on process exit
process.on('exit', () => {
  for (const [, session] of activeHlsSessions) {
    if (!session.process.killed) session.process.kill('SIGKILL');
    try { fs.rmSync(session.outputDir, { recursive: true, force: true }); } catch (_) {}
  }
});

app.get('/api/library', (req, res) => {
  const { type } = req.query;
  const category = typeof type === 'string' ? type : '';

  // TV Shows is a virtual category (subset of movies)
  if (category === 'tvshows') {
    res.setHeader('Cache-Control', 'no-store');
    const allMovies = listCategoryFiles('movies');
    const tvshows = allMovies.filter((item) => item.isShowEpisode);
    console.log('[DEBUG] Scanned TV Shows:', tvshows.length);
    return res.json({ items: tvshows });
  }

  if (!CATEGORIES[category]) {
    return res.status(400).json({
      error: 'Invalid type. Use one of: movies, tvshows, music, books',
    });
  }

  res.setHeader('Cache-Control', 'no-store');

  const items = listCategoryFiles(category);
  // For movies category, filter out TV show episodes
  const filteredItems = category === 'movies' ? items.filter((item) => !item.isShowEpisode) : items;
  console.log(`[DEBUG] Scanned files for ${category}:`, filteredItems.length);

  return res.json({
    items: filteredItems,
  });
});

app.post('/api/upload/movie', uploadMovie.single('movieFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No movie file uploaded' });
  }

  if (!isMovieExtension(req.file.originalname || req.file.filename)) {
    fs.rmSync(req.file.path, { force: true });
    return res.status(400).json({
      error: 'Invalid movie format. Use one of: .mp4, .mkv, .webm, .mov, .avi, .m4v',
    });
  }

  res.setHeader('Cache-Control', 'no-store');

  setOriginalName('movies', req.file.filename, req.file.originalname);

  return res.status(201).json({
    message: 'Movie registered successfully',
    item: {
      id: `movies/${encodeURIComponent(req.file.filename)}`,
      name: req.file.filename,
      displayName: buildDisplayName(req.file.filename),
      title: buildDisplayTitle(req.file.filename),
      originalName: req.file.originalname,
      category: 'movies',
      ext: path.extname(req.file.filename),
      url: `/media/movies/${encodeURIComponent(req.file.filename)}`,
      size: req.file.size,
      previewUrl: null,
      detectedType: 'movies',
      needsTranscoding: needsMovieTranscoding(req.file.filename),
    },
  });
});

app.post(
  '/api/upload/music',
  uploadMusic.fields([
    { name: 'trackFile', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'lyricsFile', maxCount: 1 },
  ]),
  (req, res) => {
    const trackFile = req.files?.trackFile?.[0];
    if (!trackFile) {
      return res.status(400).json({ error: 'trackFile is required' });
    }

    const trackExt = path.extname(trackFile.originalname || '').toLowerCase();
    if (!MUSIC_EXTENSIONS.includes(trackExt)) {
      return res.status(400).json({ error: 'Invalid music format for trackFile' });
    }

    const albumNameRaw = sanitizeFilenamePart(req.body?.albumName || 'Singles') || 'Singles';
    const albumDir = path.join(CATEGORIES.music, albumNameRaw);
    fs.mkdirSync(albumDir, { recursive: true });

    const trackName = buildUniqueUploadFilename(albumDir, trackFile.originalname);
    fs.writeFileSync(path.join(albumDir, trackName), trackFile.buffer);
    setOriginalName('music', `${albumNameRaw}/${trackName}`, trackFile.originalname);

    const coverFile = req.files?.coverImage?.[0];
    if (coverFile) {
      const coverName = buildUniqueUploadFilename(albumDir, coverFile.originalname || 'cover.jpg');
      fs.writeFileSync(path.join(albumDir, coverName), coverFile.buffer);
      setOriginalName('music', `${albumNameRaw}/${coverName}`, coverFile.originalname || coverName);
    }

    const lyricsFile = req.files?.lyricsFile?.[0];
    if (lyricsFile) {
      const lyricsName = buildUniqueUploadFilename(albumDir, lyricsFile.originalname || `${path.basename(trackName, trackExt)}.lrc`);
      fs.writeFileSync(path.join(albumDir, lyricsName), lyricsFile.buffer);
      setOriginalName('music', `${albumNameRaw}/${lyricsName}`, lyricsFile.originalname || lyricsName);
    }

    return res.status(201).json({
      message: 'Music uploaded successfully',
      album: albumNameRaw,
      track: trackName,
    });
  },
);

app.post('/api/import/music', express.json({ limit: '2mb' }), (req, res) => {
  try {
    const inputPaths = Array.isArray(req.body?.filePaths) ? req.body.filePaths : [];
    if (!inputPaths.length) {
      return res.status(400).json({ ok: false, error: 'filePaths is required' });
    }

    const imported = [];
    const errors = [];
    let importedCount = 0;
    let skippedCount = 0;

    const importTrackFile = (absoluteFilePath, albumNameHint = 'Singles') => {
      const ext = path.extname(absoluteFilePath || '').toLowerCase();
      if (!MUSIC_EXTENSIONS.includes(ext)) {
        skippedCount += 1;
        return;
      }
      if (!fs.existsSync(absoluteFilePath)) {
        skippedCount += 1;
        return;
      }

      const albumName = sanitizeFilenamePart(albumNameHint || 'Singles') || 'Singles';
      const albumDir = path.join(CATEGORIES.music, albumName);
      fs.mkdirSync(albumDir, { recursive: true });

      const originalName = path.basename(absoluteFilePath);
      const targetName = buildUniqueUploadFilename(albumDir, originalName);
      const targetPath = path.join(albumDir, targetName);
      fs.copyFileSync(absoluteFilePath, targetPath);
      setOriginalName('music', `${albumName}/${targetName}`, originalName);

      // Import per-track sidecar artwork files (same basename as source track).
      try {
        const sourceDir = path.dirname(absoluteFilePath);
        const sourceBase = path.basename(absoluteFilePath, ext).toLowerCase();
        const targetBase = path.basename(targetName, path.extname(targetName));
        const dirEntries = fs.readdirSync(sourceDir);
        for (const entry of dirEntries) {
          const entryExt = path.extname(entry).toLowerCase();
          if (!PREVIEW_SIDECAR_EXTENSIONS.includes(entryExt)) continue;
          const entryBase = path.basename(entry, path.extname(entry)).toLowerCase();
          if (entryBase !== sourceBase) continue;
          const sidecarTargetName = `${targetBase}${entryExt}`;
          const sidecarTargetPath = path.join(albumDir, sidecarTargetName);
          fs.copyFileSync(path.join(sourceDir, entry), sidecarTargetPath);
          setOriginalName('music', `${albumName}/${sidecarTargetName}`, entry);
        }
      } catch (_) {}

      importedCount += 1;
      imported.push({ album: albumName, track: targetName });
    };

    const walkAndImport = (absolutePath, albumNameHint = null) => {
      let stat;
      try {
        stat = fs.statSync(absolutePath);
      } catch (e) {
        errors.push(`${absolutePath}: ${e.message}`);
        return;
      }

      if (stat.isFile()) {
        const parentAlbum = albumNameHint || path.basename(path.dirname(absolutePath)) || 'Singles';
        importTrackFile(absolutePath, parentAlbum);
        return;
      }

      if (!stat.isDirectory()) {
        skippedCount += 1;
        return;
      }

      const folderAlbum = albumNameHint || path.basename(absolutePath) || 'Singles';
      let entries = [];
      try {
        entries = fs.readdirSync(absolutePath, { withFileTypes: true });
      } catch (e) {
        errors.push(`${absolutePath}: ${e.message}`);
        return;
      }

      for (const entry of entries) {
        if (isHiddenSystemEntry(entry.name)) continue;
        const full = path.join(absolutePath, entry.name);
        if (entry.isDirectory()) {
          walkAndImport(full, folderAlbum);
        } else if (entry.isFile()) {
          importTrackFile(full, folderAlbum);
        }
      }
    };

    for (const raw of inputPaths) {
      const resolved = path.resolve(String(raw || ''));
      if (!resolved) continue;
      walkAndImport(resolved);
    }

    return res.status(200).json({
      ok: true,
      count: importedCount,
      skipped: skippedCount,
      imported,
      errors,
      message: importedCount ? `Imported ${importedCount} file(s)` : 'No music files were imported',
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || 'Import failed' });
  }
});

// ─── LIBRARY FOLDER LINKING (No-Copy Mode) ──────────────────────────────────

// Serve cached cover art from database (for linked tracks)
app.get('/api/track-cover', (req, res) => {
  const trackPath = req.query.path;
  if (!trackPath) return res.status(400).send('Missing path');
  try {
    const row = tracksDb.prepare('SELECT cover_format, cover_data FROM tracks WHERE path = ?').get(trackPath);
    if (!row?.cover_data || !row?.cover_format) return res.status(404).send('No cover');
    const buf = Buffer.from(row.cover_data, 'base64');

    // Optional resize
    const w = parseInt(req.query.w, 10);
    if (w > 0 && w <= 2000) {
      const fmt = req.query.fmt === 'webp' ? 'webp' : 'jpeg';
      let pipeline = sharp(buf).resize(w, w, { fit: 'inside', withoutEnlargement: true });
      if (fmt === 'webp') { pipeline = pipeline.webp({ quality: 82 }); res.type('image/webp'); }
      else { pipeline = pipeline.jpeg({ quality: 82 }); res.type('image/jpeg'); }
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      return pipeline.pipe(res);
    }

    res.setHeader('Content-Type', row.cover_format);
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return res.send(buf);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// Stream audio from any indexed absolute path (for linked library files)
app.get('/api/stream', (req, res) => {
  const absPath = req.query.path;
  if (!absPath) return res.status(400).json({ error: 'Missing path parameter' });

  // Security: only allow streaming files that are in a linked library path or MEDIA_ROOT
  const normalized = path.resolve(absPath);
  const allowed = [MEDIA_ROOT, ..._libraryPaths].some(lp => normalized.startsWith(path.resolve(lp)));
  if (!allowed) return res.status(403).json({ error: 'Path not in any linked library' });

  if (!fs.existsSync(normalized)) return res.status(404).json({ error: 'File not found' });

  const ext = path.extname(normalized).toLowerCase();
  const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);

  // Image resizing support (same as /media/:category/:filename)
  const requestedWidth = parseInt(req.query.w, 10);
  if (isImage && requestedWidth > 0 && requestedWidth <= 2000) {
    const format = req.query.fmt === 'webp' ? 'webp' : null;
    let pipeline = sharp(normalized).resize(requestedWidth, requestedWidth, { fit: 'inside', withoutEnlargement: true });
    if (format === 'webp') { pipeline = pipeline.webp({ quality: 82 }); res.type('image/webp'); }
    else { pipeline = pipeline.jpeg({ quality: 82 }); res.type('image/jpeg'); }
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return pipeline.pipe(res);
  }

  return res.sendFile(normalized);
});

// Get linked library folders
app.get('/api/library/folders', (_req, res) => {
  res.json({ folders: _libraryPaths, scanStatus: _libraryScanStatus });
});

// Link a new library folder (no-copy indexing)
app.post('/api/library/link-folder', express.json(), async (req, res) => {
  const folderPath = req.body?.folderPath;
  if (!folderPath || typeof folderPath !== 'string') {
    return res.status(400).json({ ok: false, error: 'folderPath required' });
  }
  const resolved = path.resolve(folderPath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    return res.status(400).json({ ok: false, error: 'Directory does not exist' });
  }
  if (_libraryPaths.includes(resolved)) {
    return res.json({ ok: true, message: 'Already linked', folders: _libraryPaths });
  }
  _libraryPaths.push(resolved);
  saveLibraryPaths();

  // Start async scan
  scanLibraryFolder(resolved).catch(e => console.error('[Library] Scan error:', e.message));
  startWatchingFolder(resolved);

  return res.json({ ok: true, folders: _libraryPaths });
});

// Unlink a library folder
app.post('/api/library/unlink-folder', express.json(), (req, res) => {
  const folderPath = req.body?.folderPath;
  const resolved = path.resolve(folderPath || '');
  _libraryPaths = _libraryPaths.filter(p => p !== resolved);
  saveLibraryPaths();
  stopWatchingFolder(resolved);
  // Remove indexed tracks from this folder
  try {
    tracksDb.prepare(`DELETE FROM tracks WHERE source = 'linked' AND absolute_path LIKE ?`).run(resolved + '%');
  } catch (_) {}
  return res.json({ ok: true, folders: _libraryPaths });
});

// Get scan status
app.get('/api/library/scan-status', (_req, res) => {
  res.json(_libraryScanStatus);
});

// Rescan all linked folders
app.post('/api/library/rescan', (_req, res) => {
  if (_libraryScanStatus.scanning) {
    return res.json({ ok: false, message: 'Scan already in progress' });
  }
  (async () => {
    for (const folder of _libraryPaths) {
      await scanLibraryFolder(folder);
    }
  })().catch(e => console.error('[Library] Rescan error:', e.message));
  return res.json({ ok: true, message: 'Rescan started' });
});

/**
 * Scan an external library folder and index all audio files by absolute path.
 * No files are copied — only metadata is stored in SQLite.
 */
async function scanLibraryFolder(folderPath) {
  const mm = await import('music-metadata');
  const resolved = path.resolve(folderPath);
  console.log(`[Library] Scanning linked folder: ${resolved}`);
  _libraryScanStatus = { scanning: true, folder: resolved, found: 0, total: 0, phase: 'indexing' };

  // Count total files first
  const audioFiles = [];
  const walkCount = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (isHiddenSystemEntry(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walkCount(full);
        else if (entry.isFile() && MUSIC_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
          audioFiles.push(full);
        }
      }
    } catch (_) {}
  };
  walkCount(resolved);
  _libraryScanStatus.total = audioFiles.length;
  console.log(`[Library] Found ${audioFiles.length} audio files in ${resolved}`);

  const stmtUpsert = tracksDb.prepare(`
    INSERT INTO tracks (path, title, artist, album, year, duration, disc, cover_format, cover_data, scanned_at, absolute_path, source)
    VALUES (@path, @title, @artist, @album, @year, @duration, @disc, @cover_format, @cover_data, @scanned_at, @absolute_path, 'linked')
    ON CONFLICT(path) DO UPDATE SET
      title=@title, artist=@artist, album=@album, year=@year, duration=@duration,
      disc=@disc, cover_format=@cover_format, cover_data=@cover_data, scanned_at=@scanned_at, absolute_path=@absolute_path, source='linked'
  `);

  // Track which album dirs have been checked for sidecar covers
  const albumCoverCache = new Map(); // dir -> coverPath or null

  let indexed = 0;
  for (const absFile of audioFiles) {
    try {
      const relToFolder = path.relative(resolved, absFile);
      const folderName = path.basename(resolved);
      const virtualPath = `music/${folderName}/${relToFolder}`.replace(/\\/g, '/');

      let title = path.basename(absFile, path.extname(absFile)).replace(/^\d{1,3}[\s._-]+/, '');
      let artist = null, album = null, year = null, duration = null, disc = null;
      let coverFormat = null, coverData = null;

      try {
        // Parse with covers enabled to extract embedded artwork
        const metadata = await mm.parseFile(absFile, { duration: true, skipCovers: false });
        if (metadata.common.title) title = metadata.common.title;
        artist = metadata.common.artist || metadata.common.albumartist || null;
        album = metadata.common.album || null;
        year = metadata.common.year || null;
        duration = metadata.format.duration || null;
        disc = metadata.common.disk?.no || null;

        // Extract embedded cover art
        const pictures = metadata.common.picture;
        if (pictures && pictures.length > 0) {
          const pic = pictures[0];
          coverFormat = pic.format || 'image/jpeg';
          coverData = Buffer.from(pic.data).toString('base64');
        }
      } catch (_) {}

      // If no embedded cover, try sidecar cover files in the album directory
      if (!coverData) {
        const albumDir = path.dirname(absFile);
        if (!albumCoverCache.has(albumDir)) {
          let foundCover = null;
          try {
            const dirFiles = fs.readdirSync(albumDir);
            const coverNames = ['cover', 'folder', 'front', 'albumart', 'album', 'artwork', 'thumb'];
            const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
            // Priority: named cover files first
            for (const f of dirFiles) {
              const base = path.basename(f, path.extname(f)).toLowerCase();
              const ext = path.extname(f).toLowerCase();
              if (imageExts.includes(ext) && coverNames.some(n => base.includes(n))) {
                foundCover = path.join(albumDir, f);
                break;
              }
            }
            // Fallback: any image
            if (!foundCover) {
              for (const f of dirFiles) {
                if (imageExts.includes(path.extname(f).toLowerCase())) {
                  foundCover = path.join(albumDir, f);
                  break;
                }
              }
            }
          } catch (_) {}
          albumCoverCache.set(albumDir, foundCover);
        }

        const sidecarCover = albumCoverCache.get(albumDir);
        if (sidecarCover) {
          try {
            const ext = path.extname(sidecarCover).toLowerCase();
            coverFormat = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
            coverData = fs.readFileSync(sidecarCover).toString('base64');
          } catch (_) {}
        }
      }

      // Fallback album name from parent directory
      if (!album) {
        const parentDir = path.basename(path.dirname(absFile));
        album = parentDir !== folderName ? parentDir : folderName;
      }

      stmtUpsert.run({
        path: virtualPath,
        title,
        artist,
        album,
        year,
        duration,
        disc,
        cover_format: coverFormat,
        cover_data: coverData,
        scanned_at: Date.now(),
        absolute_path: absFile,
      });

      indexed++;
      _libraryScanStatus.found = indexed;
    } catch (e) {
      console.warn(`[Library] Failed to index ${absFile}: ${e.message}`);
    }
  }

  _libraryScanStatus = { scanning: false, folder: null, found: indexed, total: audioFiles.length, phase: 'done' };
  console.log(`[Library] ✅ Indexed ${indexed}/${audioFiles.length} tracks from ${resolved}`);
}

// Cleanup orphaned DB entries on startup (files that no longer exist)
setTimeout(() => {
  try {
    const internalTracks = tracksDb.prepare(
      `SELECT path FROM tracks WHERE (source = 'internal' OR source IS NULL) AND deleted_at IS NULL`
    ).all();
    let cleaned = 0;
    for (const row of internalTracks) {
      const fullPath = path.join(MEDIA_ROOT, row.path);
      if (!fs.existsSync(fullPath)) {
        tracksDb.prepare('DELETE FROM tracks WHERE path = ?').run(row.path);
        cleaned++;
      }
    }
    if (cleaned > 0) console.log(`[Library] Cleaned ${cleaned} orphaned DB entries (files no longer on disk)`);
  } catch (e) {
    console.warn('[Library] Cleanup error:', e.message);
  }
}, 3000);

// Scan linked folders on startup (non-blocking)
setTimeout(() => {
  if (_libraryPaths.length > 0) {
    console.log(`[Library] Auto-scanning ${_libraryPaths.length} linked folder(s)...`);
    (async () => {
      for (const folder of _libraryPaths) {
        if (fs.existsSync(folder)) {
          await scanLibraryFolder(folder);
          startWatchingFolder(folder);
        }
        else console.warn(`[Library] Linked folder not found: ${folder}`);
      }
    })().catch(e => console.error('[Library] Auto-scan error:', e.message));
  }
}, 2000);

app.get('/api/progress/movies', (_req, res) => {
  console.log('[api] progress map request');
  const watchHistory = loadWatchHistory();
  return res.status(200).json({ progress: watchHistory.movies || {} });
});

app.get('/api/streams/movies/:filename', (req, res) => {
  console.log('[api] streams request', {
    method: req.method,
    path: req.originalUrl,
    filename: req.params.filename,
  });
  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Movie file not found' });
  }

  if (!isFfprobeAvailable()) {
    return res.status(503).json({ error: 'ffprobe is required to inspect stream tracks' });
  }

  const streams = probeMovieStreams(filePath);
  if (!streams) {
    return res.status(500).json({ error: 'Unable to inspect movie streams' });
  }
  console.log('[api] streams payload', streams);

  const durationSeconds = isFfprobeAvailable() ? probeMovieDurationSeconds(filePath) : 0;

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    file: req.params.filename,
    durationSeconds,
    ...streams,
  });
});

app.get('/api/subtitles/movies/:filename(*)/:index([0-9]+)', (req, res) => {
  console.log('SUBTITLE ROUTE HIT!', req.params.filename, req.params.index);
  return extractMovieSubtitleTrack(req, res, req.params.index, { useSubtitleOrdinal: true });
});

app.get('/api/subtitles/movies/:filename', (req, res) => {
  return extractMovieSubtitleTrack(req, res, req.query.stream, { useSubtitleOrdinal: false });
});

// Serve sidecar VTT files (e.g. .uk.vtt, .uk.enhanced.vtt)
app.get('/api/subtitles/vtt/movies/:filename/:lang', (req, res) => {
  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) return res.status(404).send('Not found');

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const enhanced = req.query.enhanced === 'true';
  const vttName = enhanced ? `${base}.${req.params.lang}.enhanced.vtt` : `${base}.${req.params.lang}.vtt`;
  const vttPath = path.join(dir, vttName);

  if (!fs.existsSync(vttPath)) return res.status(404).send('VTT not found');

  res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.sendFile(vttPath);
});

app.get('/api/metadata/movies/:filename', async (req, res) => {
  console.log('[api] metadata request', {
    method: req.method,
    path: req.originalUrl,
    filename: req.params.filename,
  });
  const filePath = resolveMediaPath('movies', req.params.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Movie file not found' });
  }

  const identity = parseMovieIdentity(req.params.filename);
  const fallbackMetadata = {
    source: 'local',
    title: identity.title,
    query: identity.query,
    isEpisode: identity.isEpisode,
    season: identity.season,
    episode: identity.episode,
  };

  try {
    const tmdb = await fetchTmdbMetadata(identity);
    return res.status(200).json({
      metadata: tmdb || fallbackMetadata,
    });
  } catch (_error) {
    return res.status(200).json({ metadata: fallbackMetadata });
  }
});

app.get('/api/progress/movies/:filename', (req, res) => {
  console.log('[api] progress get request', {
    method: req.method,
    path: req.originalUrl,
    filename: req.params.filename,
  });
  const decodedName = decodeMovieFilenameParam(req.params.filename);
  if (!decodedName) {
    return res.status(400).json({ error: 'Invalid filename encoding' });
  }
  console.log('[api] progress get filename normalized', {
    raw: req.params.filename,
    decoded: decodedName,
    ext: path.extname(decodedName),
  });

  const watchHistory = loadWatchHistory();
  const entry = watchHistory.movies[decodedName] || null;
  return res.status(200).json({ progress: entry });
});

app.put('/api/progress/movies/:filename', (req, res) => {
  try {
    console.log('[api] progress put request', {
      method: req.method,
      path: req.originalUrl,
      route: '/api/progress/movies/:filename',
      filename: req.params.filename,
    });
    const decodedName = decodeMovieFilenameParam(req.params.filename);
    if (!decodedName) {
      return res.status(400).json({ error: 'Invalid filename encoding' });
    }

    const time = Number(req.body?.time || 0);
    const duration = Number(req.body?.duration || 0);
    if (!Number.isFinite(time) || time < 0) {
      return res.status(400).json({ error: 'time must be a positive number' });
    }

    const watchHistory = loadWatchHistory();
    watchHistory.movies[decodedName] = {
      time,
      duration: Number.isFinite(duration) ? duration : 0,
      subtitleTrack: req.body?.subtitleTrack || null,
      audioTrack: req.body?.audioTrack || null,
      updatedAt: Date.now(),
    };
    saveWatchHistory(watchHistory);
    return res.status(200).json({ progress: watchHistory.movies[decodedName] });
  } catch (error) {
    console.error('[api] progress put ERROR', error);
    return res.status(500).json({ error: error?.message || 'Internal error' });
  }
});

app.delete('/api/progress/movies/:filename', (req, res) => {
  console.log('[api] progress delete request', {
    method: req.method,
    path: req.originalUrl,
    filename: req.params.filename,
  });
  const decodedName = decodeMovieFilenameParam(req.params.filename);
  if (!decodedName) {
    return res.status(400).json({ error: 'Invalid filename encoding' });
  }
  console.log('[api] progress delete filename normalized', {
    raw: req.params.filename,
    decoded: decodedName,
    ext: path.extname(decodedName),
  });

  const watchHistory = loadWatchHistory();
  delete watchHistory.movies[decodedName];
  saveWatchHistory(watchHistory);
  return res.status(200).json({ message: 'Progress cleared' });
});

app.put('/api/progress/music/:trackId', (req, res) => {
  console.log('[api] music progress put request', {
    method: req.method,
    path: req.originalUrl,
    trackId: req.params.trackId,
  });
  let decodedId;
  try {
    decodedId = decodeURIComponent(req.params.trackId);
  } catch (_error) {
    return res.status(400).json({ error: 'Invalid trackId encoding' });
  }

  const time = Number(req.body?.time || 0);
  const duration = Number(req.body?.duration || 0);
  if (!Number.isFinite(time) || time < 0) {
    return res.status(400).json({ error: 'time must be a positive number' });
  }

  const watchHistory = loadWatchHistory();
  if (!watchHistory.music) {
    watchHistory.music = {};
  }
  watchHistory.music[decodedId] = {
    time,
    duration: Number.isFinite(duration) ? duration : 0,
    updatedAt: Date.now(),
  };
  saveWatchHistory(watchHistory);
  return res.status(200).json({ progress: watchHistory.music[decodedId] });
});

app.get('/api/progress/music/:trackId', (req, res) => {
  let decodedId;
  try {
    decodedId = decodeURIComponent(req.params.trackId);
  } catch (_error) {
    return res.status(400).json({ error: 'Invalid trackId encoding' });
  }

  const watchHistory = loadWatchHistory();
  const entry = watchHistory.music?.[decodedId] || null;
  return res.status(200).json({ progress: entry });
});

app.delete('/api/media/:category/:filename', (req, res) => {
  const { category, filename } = req.params;
  if (!CATEGORIES[category]) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const decodedFilename = decodeURIComponent(filename);
  const hardDelete = req.query.hard === 'true';  // Only hard-delete if explicitly requested

  // Check if this is a linked (external) track — NEVER delete the original file
  const trackPath = `${category}/${decodedFilename}`;
  let isLinked = false;
  try {
    const row = tracksDb.prepare('SELECT source, absolute_path FROM tracks WHERE path = ?').get(trackPath);
    if (row?.source === 'linked') {
      isLinked = true;
      // Soft-delete: just mark in DB, don't touch the file
      tracksDb.prepare('UPDATE tracks SET deleted_at = ? WHERE path = ?').run(Date.now(), trackPath);
      console.log(`[Delete] Soft-deleted linked track: ${trackPath}`);
      return res.status(200).json({ message: 'Soft-deleted (linked)', category, filename: decodedFilename, soft: true });
    }
  } catch (_) {}

  // Internal tracks: soft-delete by default, hard-delete only if requested
  if (!hardDelete) {
    try {
      tracksDb.prepare('UPDATE tracks SET deleted_at = ? WHERE path = ?').run(Date.now(), trackPath);
      // Also try with just the relative name
      tracksDb.prepare('UPDATE tracks SET deleted_at = ? WHERE path = ?').run(Date.now(), decodedFilename);
    } catch (_) {}
    console.log(`[Delete] Soft-deleted internal track: ${trackPath}`);
    return res.status(200).json({ message: 'Soft-deleted', category, filename: decodedFilename, soft: true });
  }

  // Hard delete: actually remove the file (only for internal, non-linked tracks)
  const filePath = resolveMediaPath(category, decodedFilename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    return res.status(400).json({ error: 'Only files can be deleted' });
  }

  const categoryRoot = path.resolve(CATEGORIES[category]);
  const relativePath = toForwardSlashes(path.relative(categoryRoot, filePath));
  fs.rmSync(filePath, { force: true });
  removeOriginalName(category, relativePath);

  // Remove from DB
  try {
    tracksDb.prepare('DELETE FROM tracks WHERE path = ?').run(trackPath);
    tracksDb.prepare('DELETE FROM tracks WHERE path = ?').run(decodedFilename);
  } catch (_) {}

  let currentDir = path.dirname(filePath);
  while (currentDir.startsWith(categoryRoot) && currentDir !== categoryRoot) {
    const remaining = fs.readdirSync(currentDir).filter((name) => !isHiddenSystemEntry(name));
    if (remaining.length > 0) {
      break;
    }
    fs.rmdirSync(currentDir);
    currentDir = path.dirname(currentDir);
  }

  return res.status(200).json({ message: 'Deleted', category, filename: relativePath, soft: false });
});

// Restore a soft-deleted track
app.post('/api/media/restore', express.json(), (req, res) => {
  const trackPath = req.body?.path;
  if (!trackPath) return res.status(400).json({ error: 'Missing path' });
  try {
    const row = tracksDb.prepare('SELECT absolute_path, source FROM tracks WHERE path = ?').get(trackPath);
    const absPath = row?.absolute_path || (row?.source !== 'linked' ? path.join(MEDIA_ROOT, trackPath) : null);
    if (absPath && !fs.existsSync(absPath)) {
      return res.status(410).json({ error: 'Source files missing. Cannot restore.' });
    }
    tracksDb.prepare('UPDATE tracks SET deleted_at = NULL WHERE path = ?').run(trackPath);
    return res.json({ ok: true, restored: trackPath });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// List soft-deleted tracks (for restore UI)
app.get('/api/media/deleted', (_req, res) => {
  try {
    const rows = tracksDb.prepare(
      'SELECT path, title, artist, album, source, deleted_at, absolute_path FROM tracks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC LIMIT 200'
    ).all();
    return res.json({ tracks: rows });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Permanently purge soft-deleted tracks (cleanup)
app.post('/api/media/purge-deleted', (_req, res) => {
  try {
    const result = tracksDb.prepare('DELETE FROM tracks WHERE deleted_at IS NOT NULL').run();
    return res.json({ ok: true, purged: result.changes });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Bulk soft-delete multiple tracks
app.post('/api/media/bulk-delete', express.json(), (req, res) => {
  const paths = req.body?.paths;
  if (!Array.isArray(paths) || paths.length === 0) return res.status(400).json({ error: 'Missing paths array' });
  const now = Date.now();
  const stmt = tracksDb.prepare('UPDATE tracks SET deleted_at = ? WHERE path = ?');
  let deleted = 0;
  for (const p of paths) {
    try { const r = stmt.run(now, p); deleted += r.changes; } catch (_) {}
  }
  return res.json({ ok: true, deleted });
});

// Bulk restore multiple tracks
app.post('/api/media/bulk-restore', express.json(), (req, res) => {
  const paths = req.body?.paths;
  if (!Array.isArray(paths) || paths.length === 0) return res.status(400).json({ error: 'Missing paths array' });
  const stmt = tracksDb.prepare('UPDATE tracks SET deleted_at = NULL WHERE path = ?');
  const checkFile = tracksDb.prepare('SELECT absolute_path, source FROM tracks WHERE path = ?');
  const results = [];
  for (const p of paths) {
    try {
      const row = checkFile.get(p);
      const absPath = row?.absolute_path || (row?.source !== 'linked' ? path.join(MEDIA_ROOT, p) : null);
      if (absPath && !fs.existsSync(absPath)) {
        results.push({ path: p, restored: false, reason: 'Source files missing. Cannot restore.' });
        continue;
      }
      stmt.run(p);
      results.push({ path: p, restored: true });
    } catch (e) {
      results.push({ path: p, restored: false, reason: e.message });
    }
  }
  return res.json({ ok: true, results });
});

// API catch-all moved below track-info route

app.get('/media/:category/:filename', (req, res) => {
  const { category, filename } = req.params;

  if (!CATEGORIES[category]) {
    return res.status(404).send('Category not found');
  }

  const filePath = resolveMediaPath(category, filename);

  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  // On-the-fly image resizing for cover art (e.g. ?w=400)
  const requestedWidth = parseInt(req.query.w, 10);
  const ext = path.extname(filePath).toLowerCase();
  const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);

  if (isImage && requestedWidth > 0 && requestedWidth <= 2000) {
    const format = req.query.fmt === 'webp' ? 'webp' : (req.query.fmt === 'avif' ? 'avif' : null);
    let pipeline = sharp(filePath).resize(requestedWidth, requestedWidth, { fit: 'inside', withoutEnlargement: true });
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality: 82 });
      res.type('image/webp');
    } else if (format === 'avif') {
      pipeline = pipeline.avif({ quality: 65 });
      res.type('image/avif');
    } else {
      pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
      res.type('image/jpeg');
    }
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return pipeline.pipe(res);
  }

  return res.sendFile(filePath);
});

// ─── TRACK METADATA DATABASE (SQLite) ───────────────────────────────────────

const TRACKS_DB_PATH = path.join(MEDIA_ROOT, 'tracks.db');
const tracksDb = new Database(TRACKS_DB_PATH);
tracksDb.pragma('journal_mode = WAL');
tracksDb.exec(`
  CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT UNIQUE NOT NULL,
    title TEXT,
    artist TEXT,
    album TEXT,
    year INTEGER,
    duration REAL,
    lyrics TEXT,
    lyrics_type TEXT,
    cover_format TEXT,
    cover_data TEXT,
    scanned_at INTEGER
  )
`);

// Migration: add lyrics_type column if missing (existing DBs)
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN lyrics_type TEXT'); } catch {}
// Migration: add disc column if missing
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN disc INTEGER'); } catch {}
// Migration: add status column for gold verification
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN status TEXT'); } catch {}
// Migration: add validation columns for gold integrity
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN validation_score INTEGER DEFAULT 0'); } catch {}
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN last_error_log TEXT'); } catch {}
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN checksum_sha256 TEXT'); } catch {}
// Migration: add absolute_path for external library indexing
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN absolute_path TEXT'); } catch {}
// Migration: add track_number column
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN track_number INTEGER'); } catch {}
// Migration: add source column to distinguish internal vs linked files
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN source TEXT DEFAULT \'internal\''); } catch {}
// Migration: add soft-delete column
try { tracksDb.exec('ALTER TABLE tracks ADD COLUMN deleted_at INTEGER DEFAULT NULL'); } catch {}
// Index on deleted_at for fast filtering
try { tracksDb.exec('CREATE INDEX IF NOT EXISTS idx_tracks_deleted_at ON tracks(deleted_at)'); } catch {}
// Migration: invalidate cache for synced LRC tracks without end times (parseLrc fix v2)
try {
  const needRescan = tracksDb.prepare(
    `SELECT path FROM tracks WHERE lyrics_type = 'synced' AND lyrics IS NOT NULL AND lyrics NOT LIKE '%"end"%' AND lyrics LIKE '%"time"%'`
  ).all();
  if (needRescan.length > 0) {
    const stmtReset = tracksDb.prepare('UPDATE tracks SET scanned_at = 0 WHERE path = ?');
    for (const row of needRescan) stmtReset.run(row.path);
    console.log(`[migration] Reset scanned_at for ${needRescan.length} tracks to re-parse LRC with end times`);
  }
} catch (e) { console.warn('[migration] LRC rescan check failed:', e.message); }


const stmtUpsertTrack = tracksDb.prepare(`
  INSERT INTO tracks (path, title, artist, album, year, disc, track_number, duration, lyrics, lyrics_type, cover_format, cover_data, scanned_at)
  VALUES (@path, @title, @artist, @album, @year, @disc, @track_number, @duration, @lyrics, @lyrics_type, @cover_format, @cover_data, @scanned_at)
  ON CONFLICT(path) DO UPDATE SET
    title=@title, artist=@artist, album=@album, year=@year, disc=@disc, track_number=@track_number,
    duration=@duration, lyrics=@lyrics, lyrics_type=@lyrics_type, cover_format=@cover_format,
    cover_data=@cover_data, scanned_at=@scanned_at
`);
const stmtGetTrack = tracksDb.prepare('SELECT * FROM tracks WHERE path = ?');
const stmtGetTrackMeta = tracksDb.prepare(
  'SELECT path, title, artist, album, year, duration, disc, cover_format, deleted_at, absolute_path, source FROM tracks WHERE path = ?'
);

/** Resolve a relative track path to an absolute file path.
 *  Handles both local (MEDIA_ROOT) and linked (absolute_path in DB) tracks. */
function resolveTrackFullPath(relativePath) {
  const local = path.join(MEDIA_ROOT, relativePath);
  if (fs.existsSync(local)) return local;
  try {
    const row = tracksDb.prepare('SELECT absolute_path FROM tracks WHERE path = ?').get(relativePath);
    if (row?.absolute_path && fs.existsSync(row.absolute_path)) return row.absolute_path;
  } catch (_) {}
  return local; // fallback (caller checks existence)
}

/**
 * Parse .lrc file content into array of {time, text}
 */
function parseEnhancedLrcTimestamp(tag) {
  // Parse <mm:ss.xx> or <mm:ss.xxx> inline word timestamp
  const m = tag.match(/(\d{2}):(\d{2})(?:\.(\d{2,3}))?/);
  if (!m) return NaN;
  const mins = parseInt(m[1], 10);
  const secs = parseInt(m[2], 10);
  const ms = m[3] ? parseInt(m[3].padEnd(3, '0'), 10) : 0;
  return mins * 60 + secs + ms / 1000;
}

function parseLrc(content) {
  const lines = [];
  // First pass: collect ALL timestamps (including empty lines) for gap detection
  const allTimestamps = [];
  const regex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    const ms = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;
    const time = minutes * 60 + seconds + ms / 1000;
    const rawText = match[4].trim();
    allTimestamps.push({ time, rawText });
  }
  allTimestamps.sort((a, b) => a.time - b.time);

  // Second pass: build lines with proper end times using ALL timestamps
  for (let i = 0; i < allTimestamps.length; i++) {
    const { time, rawText } = allTimestamps[i];
    if (!rawText) continue; // Skip empty lines (but they were used for timing above)

    // Find the next timestamp (including empty lines) to compute end time
    const nextTimestamp = allTimestamps[i + 1]?.time;

    // Check for Enhanced LRC format: <mm:ss.xx>word <mm:ss.xx>word ...
    const wordTagRegex = /<(\d{2}:\d{2}(?:\.\d{2,3})?)>\s*([^<]*)/g;
    let wordMatch;
    const wordTimestamps = [];
    while ((wordMatch = wordTagRegex.exec(rawText)) !== null) {
      const wordTime = parseEnhancedLrcTimestamp(wordMatch[1]);
      const wordText = wordMatch[2].trim();
      if (wordText && !isNaN(wordTime)) {
        wordTimestamps.push({ word: wordText, start: wordTime });
      }
    }

    if (wordTimestamps.length > 0) {
      // Enhanced LRC — we have word-level timestamps!
      const words = wordTimestamps.map((wt, wi) => {
        const nextStart = wordTimestamps[wi + 1]?.start;
        const end = nextStart != null ? nextStart : wt.start + 0.5;
        return { word: wt.word, start: wt.start, end };
      });
      const plainText = words.map(w => w.word).join(' ');
      console.log(`[parseLrc] Enhanced LRC line: "${plainText}" with ${words.length} word timestamps`);
      lines.push({ time, text: plainText, words, end: words[words.length - 1].end });
    } else {
      // Standard LRC — line-level only, end at next timestamp
      // Whisper will later provide accurate word-level timestamps
      const plainText = rawText.replace(/<[^>]*>/g, '').trim();
      if (!plainText) continue;

      // Use next timestamp (including empty lines) as end — no caps, no estimation
      const end = nextTimestamp != null ? nextTimestamp : time + 3.0;
      lines.push({ time, text: plainText, end });
    }
  }

  const sorted = lines.sort((a, b) => a.time - b.time);
  console.log(`[parseLrc] Parsed ${sorted.length} lines, ${sorted.filter(l => l.words).length} with word-level timestamps, ${sorted.filter(l => l.end).length} with computed end times`);
  return sorted;
}



// ─── LYRICS ENGINE (LRCLIB + syncedlyrics) ──────────────────────────────────

const LYRICS_QUEUE = [];
let lyricsProcessing = false;
let lyricsCurrentPath = null; // path currently being processed
let syncedlyricsAvailable = null; // lazy check

/** Get lyrics generation status for a track path */
function getLyricsStatus(relativePath) {
  const whisperInfo = _whisperEnhancing.get(relativePath);
  if (whisperInfo) {
    if (whisperInfo.status === 'running') return 'generating';
    if (whisperInfo.status === 'done') return 'ready';
    if (whisperInfo.status === 'failed') return 'not_found';
  }
  if (lyricsCurrentPath === relativePath) return 'generating';
  const queueIdx = LYRICS_QUEUE.findIndex(q => q.path === relativePath);
  if (queueIdx >= 0) return 'queued';
  return null;
}

/** Get queue info for a track (position, what's currently processing) */
function getLyricsQueueInfo(relativePath) {
  const queueIdx = LYRICS_QUEUE.findIndex(q => q.path === relativePath);
  const currentTask = lyricsCurrentPath ? LYRICS_QUEUE.find(q => q.path === lyricsCurrentPath) : null;
  // Find currently processing task name from whisper map or current path
  let processingTitle = null;
  if (lyricsProcessing && lyricsCurrentPath && lyricsCurrentPath !== relativePath) {
    // Look up the title from _whisperEnhancing or just use the path
    processingTitle = lyricsCurrentPath.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/^\d+[-_.\s]+/, '') || null;
  }
  return {
    queuePosition: queueIdx >= 0 ? queueIdx + 1 : 0,
    queueTotal: LYRICS_QUEUE.length,
    processingTitle,
  };
}
let whisperAvailable = null; // lazy check

// Paths to lyrics-engine venv binaries (writable root in packaged app via CHROMIC_LYRICS_ROOT)
const LYRICS_ENGINE_ROOT = process.env.CHROMIC_LYRICS_ROOT || path.join(__dirname, 'lyrics-engine');
const BUNDLED_LYRICS_ENGINE_ROOT = process.env.CHROMIC_BUNDLED_LYRICS_ROOT || null;
const LYRICS_VENV_DIR = path.join(LYRICS_ENGINE_ROOT, 'venv');
const LYRICS_BIN_DIR = process.platform === 'win32'
  ? path.join(LYRICS_VENV_DIR, 'Scripts')
  : path.join(LYRICS_VENV_DIR, 'bin');
const LYRICS_PYTHON = process.platform === 'win32'
  ? path.join(LYRICS_BIN_DIR, 'python.exe')
  : path.join(LYRICS_BIN_DIR, 'python');
const LYRICS_SYNCEDLYRICS = process.platform === 'win32'
  ? path.join(LYRICS_BIN_DIR, 'syncedlyrics.exe')
  : path.join(LYRICS_BIN_DIR, 'syncedlyrics');
const LYRICS_WHISPER = process.platform === 'win32'
  ? path.join(LYRICS_BIN_DIR, 'whisper-ctranslate2.exe')
  : path.join(LYRICS_BIN_DIR, 'whisper-ctranslate2');
const SCRIPTS_ROOT = process.env.CHROMIC_SCRIPTS_ROOT || path.join(__dirname, 'scripts');
const ALIGNER_MODULE_TO_PIP = {
  dotenv: 'python-dotenv',
  rapidfuzz: 'rapidfuzz',
  lyricsgenius: 'lyricsgenius',
  faster_whisper: 'faster-whisper',
  mlx_whisper: 'mlx-whisper',
  whisperx: 'whisperx',
  whisper: 'openai-whisper',
};

function resolveAlignerScriptPath() {
  const candidates = [
    path.join(SCRIPTS_ROOT, 'aligner.py'),
    path.join(SCRIPTS_ROOT, 'lyrics-engine', 'aligner.py'),
    path.join(LYRICS_ENGINE_ROOT, 'aligner.py'),
    ...(BUNDLED_LYRICS_ENGINE_ROOT ? [path.join(BUNDLED_LYRICS_ENGINE_ROOT, 'aligner.py')] : []),
    path.join(__dirname, 'lyrics-engine', 'aligner.py'),
  ];
  return candidates.find((p) => fs.existsSync(p)) || candidates[0];
}

function resolveTrackPathFromAudio(audioPath) {
  try {
    const rel = path.relative(MEDIA_ROOT, audioPath);
    if (!rel || rel.startsWith('..')) {
      // Check if it's a linked library file — find its virtual path in DB
      try {
        const row = tracksDb.prepare('SELECT path FROM tracks WHERE absolute_path = ?').get(audioPath);
        if (row) return row.path;
      } catch (_) {}
      return null;
    }
    return rel.split(path.sep).join('/');
  } catch {
    return null;
  }
}

function getLyricsPipBin() {
  return process.platform === 'win32'
    ? path.join(LYRICS_VENV_DIR, 'Scripts', 'pip.exe')
    : path.join(LYRICS_VENV_DIR, 'bin', 'pip');
}

function resolveWhisperEngineForPlatform(engine) {
  const desired = ['mlx', 'whisperx', 'faster', 'openai'].includes(engine) ? engine : 'faster';
  // MLX is Apple Silicon only; never try it on Windows/Linux.
  if (desired === 'mlx' && process.platform !== 'darwin') return 'faster';
  // On Windows, prefer faster-whisper for word-level timestamps (DLL crash prevention is in aligner.py)
  // Fallback to openai if user explicitly selected it
  if (process.platform === 'win32' && desired === 'mlx') return 'faster';
  return desired;
}

function ensureLyricsVenvExists() {
  if (fs.existsSync(LYRICS_PYTHON)) return true;
  const bootstrapPython = getPythonBootstrapBin();
  fs.mkdirSync(path.dirname(LYRICS_VENV_DIR), { recursive: true });
  const mkVenv = runCommandCapture(bootstrapPython, ['-m', 'venv', LYRICS_VENV_DIR]);
  if (!mkVenv.ok) {
    console.warn(`[LyricsEngine] Failed to create lyrics venv: ${mkVenv.error || mkVenv.stderr || mkVenv.stdout}`);
    return false;
  }
  return fs.existsSync(LYRICS_PYTHON);
}

/** Async version — does NOT block the event loop */
async function ensureLyricsVenvExistsAsync() {
  if (fs.existsSync(LYRICS_PYTHON)) return true;
  const bootstrapPython = getPythonBootstrapBin();
  fs.mkdirSync(path.dirname(LYRICS_VENV_DIR), { recursive: true });
  const mkVenv = await runCommandCaptureAsync(bootstrapPython, ['-m', 'venv', LYRICS_VENV_DIR]);
  if (!mkVenv.ok) {
    console.warn(`[LyricsEngine] Failed to create lyrics venv: ${mkVenv.error || mkVenv.stderr || mkVenv.stdout}`);
    return false;
  }
  return fs.existsSync(LYRICS_PYTHON);
}

function installMissingAlignerDepsIfNeeded(stderrText = '', relativePath = null) {
  const text = String(stderrText || '');
  const missingModules = [];
  const re = /No module named ['\"]([^'\"\n]+)['\"]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) missingModules.push(m[1].trim());
  }
  if (!missingModules.length) return false;

  const missing = [...new Set(missingModules.map((mod) => ALIGNER_MODULE_TO_PIP[mod] || mod))];

  if (!ensureLyricsVenvExists()) return false;
  if (relativePath) {
    const info = _whisperEnhancing.get(relativePath);
    if (info && info.status === 'running') {
      info.step = 'installing_dependencies';
      info.stepLabel = `Installing Python modules: ${missing.join(', ')}`;
      if (!info.steps) info.steps = [];
      info.steps.push({ step: info.step, label: info.stepLabel, at: Date.now() });
    }
  }
  const pipBin = getLyricsPipBin();
  if (!fs.existsSync(pipBin)) return false;

  const install = runCommandCapture(pipBin, ['install', '--upgrade', ...new Set(missing)]);
  if (!install.ok) {
    console.warn(`[LyricsEngine] Failed to auto-install aligner deps: ${install.error || install.stderr || install.stdout}`);
    return false;
  }
  console.log(`[LyricsEngine] Auto-installed aligner deps: ${missing.join(', ')}`);
  return true;
}

function ensureWhisperEngineDeps(engine, relativePath = null) {
  const normalized = resolveWhisperEngineForPlatform(engine);
  const depsByEngine = {
    faster: ['faster-whisper==1.0.3', 'ctranslate2==4.4.0'],
    whisperx: ['whisperx', 'faster-whisper==1.0.3', 'ctranslate2==4.4.0'],
    mlx: ['mlx-whisper'],
    openai: ['openai-whisper', 'soundfile', 'imageio-ffmpeg'],
  };
  const deps = depsByEngine[normalized] || depsByEngine.faster;
  if (!ensureLyricsVenvExists()) return false;
  const pipBin = getLyricsPipBin();
  if (!fs.existsSync(pipBin)) return false;

  // Check if all deps are already installed first (quick pip show check)
  const venvPython = LYRICS_PYTHON;
  const mainPkg = deps[0].split('==')[0].split('[')[0]; // e.g. "faster-whisper" from "faster-whisper==1.0.3"
  const checkInstalled = runCommandCapture(venvPython, ['-c', `import importlib.util; exit(0 if importlib.util.find_spec("${mainPkg.replace('-', '_')}") else 1)`]);
  const alreadyInstalled = checkInstalled.ok;

  // Only show "installing" status if not already installed
  if (!alreadyInstalled && relativePath) {
    const info = _whisperEnhancing.get(relativePath);
    if (info && info.status === 'running') {
      info.step = 'installing_dependencies';
      info.stepLabel = `Preparing AI runtime (${normalized}): ${deps.join(', ')}`;
      if (!info.steps) info.steps = [];
      info.steps.push({ step: info.step, label: info.stepLabel, at: Date.now() });
    }
  }

  // On Windows with NVIDIA GPU, install CUDA-enabled PyTorch for GPU acceleration
  if (process.platform === 'win32' && normalized === 'openai') {
    try {
      const nvidiaSmi = runCommandCapture('nvidia-smi', ['--query-gpu=name', '--format=csv,noheader']);
      if (nvidiaSmi.ok && nvidiaSmi.stdout && nvidiaSmi.stdout.trim()) {
        console.log(`[LyricsEngine] NVIDIA GPU detected: ${nvidiaSmi.stdout.trim()}`);
        // Check if torch is already CUDA-enabled
        const venvPython = LYRICS_PYTHON;
        const torchCheck = runCommandCapture(venvPython, ['-c', 'import torch; print(torch.cuda.is_available())']);
        if (!torchCheck.ok || torchCheck.stdout.trim() !== 'True') {
          console.log('[LyricsEngine] Installing CUDA-enabled PyTorch for GPU acceleration...');
          const updateInfo = relativePath ? _whisperEnhancing.get(relativePath) : null;
          if (updateInfo && updateInfo.status === 'running') {
            updateInfo.step = 'installing_cuda';
            updateInfo.stepLabel = 'Installing CUDA PyTorch for GPU acceleration (one-time, ~2GB)…';
            if (!updateInfo.steps) updateInfo.steps = [];
            updateInfo.steps.push({ step: updateInfo.step, label: updateInfo.stepLabel, at: Date.now() });
          }
          runCommandCapture(pipBin, ['install', 'torch', 'torchaudio', '--index-url', 'https://download.pytorch.org/whl/cu121']);
        }
      }
    } catch (_) { /* no nvidia-smi = no GPU, CPU fallback is fine */ }
  }

  const install = runCommandCapture(pipBin, ['install', '--upgrade', ...deps]);
  if (!install.ok) {
    console.warn(`[LyricsEngine] Failed to ensure whisper deps (${normalized}): ${install.error || install.stderr || install.stdout}`);
    return false;
  }

  // Windows: remove cuDNN/CUDA DLLs from ctranslate2 to prevent STATUS_DLL_NOT_FOUND crash
  // ctranslate2 bundles these but they require a full CUDA+cuDNN install to work
  if (process.platform === 'win32' && normalized === 'faster') {
    try {
      const ct2Dir = path.join(LYRICS_VENV_DIR, 'Lib', 'site-packages', 'ctranslate2');
      if (fs.existsSync(ct2Dir)) {
        const entries = fs.readdirSync(ct2Dir);
        const cudaDlls = entries.filter(f => /cudnn|cublas|cufft|curand|cusolver|cusparse|nvinfer|nvrtc/i.test(f) && f.endsWith('.dll'));
        for (const dll of cudaDlls) {
          try { fs.unlinkSync(path.join(ct2Dir, dll)); } catch (_) {}
        }
        if (cudaDlls.length) {
          console.log(`[LyricsEngine] Removed ${cudaDlls.length} CUDA DLLs from ctranslate2 (CPU-only mode)`);
        }
      }
    } catch (e) {
      console.warn(`[LyricsEngine] Failed to clean CUDA DLLs: ${e.message}`);
    }
  }

  return true;
}

/** Async version — does NOT block the event loop during pip install */
async function ensureWhisperEngineDepsAsync(engine, relativePath = null) {
  const normalized = resolveWhisperEngineForPlatform(engine);
  const depsByEngine = {
    faster: ['faster-whisper==1.0.3', 'ctranslate2==4.4.0'],
    whisperx: ['whisperx', 'faster-whisper==1.0.3', 'ctranslate2==4.4.0'],
    mlx: ['mlx-whisper'],
    openai: ['openai-whisper', 'soundfile', 'imageio-ffmpeg'],
  };
  const deps = depsByEngine[normalized] || depsByEngine.faster;
  if (!(await ensureLyricsVenvExistsAsync())) return false;
  const pipBin = getLyricsPipBin();
  if (!fs.existsSync(pipBin)) return false;

  const venvPython = LYRICS_PYTHON;
  const mainPkg = deps[0].split('==')[0].split('[')[0];
  const checkInstalled = await runCommandCaptureAsync(venvPython, ['-c', `import importlib.util; exit(0 if importlib.util.find_spec("${mainPkg.replace('-', '_')}") else 1)`]);
  const alreadyInstalled = checkInstalled.ok;

  if (alreadyInstalled) return true;

  if (relativePath) {
    const info = _whisperEnhancing.get(relativePath);
    if (info && info.status === 'running') {
      info.step = 'installing_dependencies';
      info.stepLabel = `Preparing AI runtime (${normalized}): ${deps.join(', ')}`;
      if (!info.steps) info.steps = [];
      info.steps.push({ step: info.step, label: info.stepLabel, at: Date.now() });
    }
  }

  if (process.platform === 'win32' && normalized === 'openai') {
    try {
      const nvidiaSmi = await runCommandCaptureAsync('nvidia-smi', ['--query-gpu=name', '--format=csv,noheader']);
      if (nvidiaSmi.ok && nvidiaSmi.stdout && nvidiaSmi.stdout.trim()) {
        console.log(`[LyricsEngine] NVIDIA GPU detected: ${nvidiaSmi.stdout.trim()}`);
        const torchCheck = await runCommandCaptureAsync(venvPython, ['-c', 'import torch; print(torch.cuda.is_available())']);
        if (!torchCheck.ok || torchCheck.stdout.trim() !== 'True') {
          console.log('[LyricsEngine] Installing CUDA-enabled PyTorch for GPU acceleration...');
          const updateInfo = relativePath ? _whisperEnhancing.get(relativePath) : null;
          if (updateInfo && updateInfo.status === 'running') {
            updateInfo.step = 'installing_cuda';
            updateInfo.stepLabel = 'Installing CUDA PyTorch for GPU acceleration (one-time, ~2GB)…';
          }
          await runCommandCaptureAsync(pipBin, ['install', 'torch', 'torchaudio', '--index-url', 'https://download.pytorch.org/whl/cu121']);
        }
      }
    } catch (_) {}
  }

  const install = await runCommandCaptureAsync(pipBin, ['install', '--upgrade', ...deps]);
  if (!install.ok) {
    console.warn(`[LyricsEngine] Failed to ensure whisper deps (${normalized}): ${install.error || install.stderr || install.stdout}`);
    return false;
  }

  if (process.platform === 'win32' && normalized === 'faster') {
    try {
      const ct2Dir = path.join(LYRICS_VENV_DIR, 'Lib', 'site-packages', 'ctranslate2');
      if (fs.existsSync(ct2Dir)) {
        const entries = fs.readdirSync(ct2Dir);
        const cudaDlls = entries.filter(f => /cudnn|cublas|cufft|curand|cusolver|cusparse|nvinfer|nvrtc/i.test(f) && f.endsWith('.dll'));
        for (const dll of cudaDlls) {
          try { fs.unlinkSync(path.join(ct2Dir, dll)); } catch (_) {}
        }
        if (cudaDlls.length) console.log(`[LyricsEngine] Removed ${cudaDlls.length} CUDA DLLs from ctranslate2 (CPU-only mode)`);
      }
    } catch (e) {
      console.warn(`[LyricsEngine] Failed to clean CUDA DLLs: ${e.message}`);
    }
  }

  return true;
}

/**
 * Fetch synced lyrics from LRCLIB (free API, no key needed)
 */
async function fetchFromLrclib(artist, title, album) {
  try {
    const params = new URLSearchParams();
    if (artist) params.set('artist_name', artist);
    if (title) params.set('track_name', title);
    if (album) params.set('album_name', album);

    const url = `https://lrclib.net/api/get?${params.toString()}`;
    console.log(`[LyricsEngine] LRCLIB request: ${url}`);

    const res = await fetch(url, {
      headers: { 'User-Agent': 'MyMedia/1.0 (github.com/user/mymedia)' },
      timeout: 10000,
    });

    if (!res.ok) {
      console.log(`[LyricsEngine] LRCLIB returned ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data.syncedLyrics) {
      console.log(`[LyricsEngine] ✅ LRCLIB found synced lyrics for "${artist} - ${title}"`);
      return parseLrc(data.syncedLyrics);
    }
    if (data.plainLyrics) {
      console.log(`[LyricsEngine] LRCLIB has plain lyrics (no sync) for "${artist} - ${title}" — using as text source`);
      // Return plain lyrics as untimed lines so Whisper can add timestamps
      // while keeping the correct human-verified text
      const lines = data.plainLyrics.split('\n').filter(l => l.trim());
      return lines.map((text, i) => ({ text: text.trim(), time: 0, _plain: true }));
    }
    return null;
  } catch (e) {
    console.warn(`[LyricsEngine] LRCLIB error: ${e.message}`);
    return null;
  }
}

/**
 * Fetch synced lyrics via syncedlyrics Python CLI
 */
async function fetchFromSyncedlyrics(artist, title) {
  // Check availability once
  if (syncedlyricsAvailable === null) {
    syncedlyricsAvailable = fs.existsSync(LYRICS_SYNCEDLYRICS);
    if (!syncedlyricsAvailable) {
      console.log('[LyricsEngine] syncedlyrics not found in venv (run: cd lyrics-engine && venv/bin/pip install syncedlyrics)');
    }
  }
  if (!syncedlyricsAvailable) return null;

  return new Promise((resolve) => {
    const searchTerm = `${artist} - ${title}`;
    const tmpFile = path.join(os.tmpdir(), `lyrics_${Date.now()}.lrc`);
    console.log(`[LyricsEngine] syncedlyrics: searching "${searchTerm}"`);

    const proc = spawn(LYRICS_SYNCEDLYRICS, [searchTerm, '--output', tmpFile], {
      timeout: 20000,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let killed = false;
    const timer = setTimeout(() => {
      killed = true;
      proc.kill('SIGTERM');
      console.log('[LyricsEngine] syncedlyrics: timed out');
      resolve(null);
    }, 20000);

    proc.on('close', (code) => {
      clearTimeout(timer);
      if (killed) return;
      if (code === 0 && fs.existsSync(tmpFile)) {
        try {
          const content = fs.readFileSync(tmpFile, 'utf-8');
          fs.unlinkSync(tmpFile);
          if (content.trim()) {
            console.log(`[LyricsEngine] ✅ syncedlyrics found lyrics for "${searchTerm}"`);
            resolve(parseLrc(content));
            return;
          }
        } catch (e) { /* ignore */ }
      }
      console.log(`[LyricsEngine] syncedlyrics: no result for "${searchTerm}"`);
      resolve(null);
    });

    proc.on('error', () => {
      clearTimeout(timer);
      resolve(null);
    });
  });
}

/**
 * Fetch word-level lyrics via Whisper AI (local transcription)
 * Uses whisper-ctranslate2 from lyrics-engine/venv with --word_timestamps True
 */
async function fetchFromWhisper(audioPath, title, language) {
  // Check availability once
  if (whisperAvailable === null) {
    whisperAvailable = fs.existsSync(LYRICS_WHISPER);
    if (!whisperAvailable) {
      console.log('[LyricsEngine] whisper-ctranslate2 not found in venv (run: cd lyrics-engine && venv/bin/pip install whisper-ctranslate2)');
    }
  }
  if (!whisperAvailable) return null;

  // Skip files > 10 minutes (too heavy for background processing)
  try {
    const stat = fs.statSync(audioPath);
    if (stat.size > 500 * 1024 * 1024) { // ~500MB = likely very long
      console.log(`[LyricsEngine] Whisper: skipping large file (${(stat.size/1024/1024).toFixed(0)}MB): ${title}`);
      return null;
    }
  } catch (e) { return null; }

  return new Promise((resolve) => {
    const outputDir = os.tmpdir();
    console.log(`[LyricsEngine]  Whisper: transcribing "${title}"...`);

    const proc = spawn(LYRICS_WHISPER, [
      audioPath,
      '--model', 'base',
      '--task', 'transcribe',
      '--output_format', 'json',
      '--word_timestamps', 'True',
      '--output_dir', outputDir,
      ...(language ? ['--language', language] : []),
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Store process reference for cancellation
    _whisperProcesses.set(audioPath, proc);

    let stderr = '';
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    // Timeout: 3 minutes max for a single track
    let killed = false;
    const timer = setTimeout(() => {
      killed = true;
      proc.kill('SIGTERM');
      console.log(`[LyricsEngine] Whisper: timed out for "${title}"`);
      resolve(null);
    }, 180000);

    proc.on('close', (code) => {
      clearTimeout(timer);
      _whisperProcesses.delete(audioPath);
      if (killed) return;

      // Find the output JSON file
      const baseName = path.basename(audioPath, path.extname(audioPath));
      const jsonFile = path.join(outputDir, baseName + '.json');

      if (code !== 0 || !fs.existsSync(jsonFile)) {
        console.log(`[LyricsEngine] Whisper: failed (code=${code}) for "${title}"`);
        if (stderr) console.log('[LyricsEngine] Whisper stderr:', stderr.slice(0, 200));
        resolve(null);
        return;
      }

      try {
        const raw = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
        fs.unlinkSync(jsonFile); // cleanup

        // Convert Whisper JSON to lyricIdea14 format
        const lines = [];
        if (raw.segments) {
          for (const seg of raw.segments) {
            const words = [];
            if (seg.words) {
              for (const w of seg.words) {
                const wordText = (w.word || w.text || '').trim();
                if (wordText) {
                  words.push({ word: wordText, start: w.start, end: w.end });
                }
              }
            }
            const text = words.length > 0
              ? words.map(w => w.word).join(' ')
              : (seg.text || '').trim();
            if (text) {
              lines.push({
                time: seg.start,
                text,
                words: words.length > 0 ? words : undefined,
              });
            }
          }
        }

        if (lines.length > 0) {
          console.log(`[LyricsEngine] ✅ Whisper: transcribed ${lines.length} lines (${lines.filter(l=>l.words).length} with word-level) for "${title}"`);
          resolve(lines);
        } else {
          resolve(null);
        }
      } catch (e) {
        console.warn(`[LyricsEngine] Whisper: JSON parse error: ${e.message}`);
        resolve(null);
      }
    });

    proc.on('error', (e) => {
      clearTimeout(timer);
      _whisperProcesses.delete(audioPath);
      console.warn(`[LyricsEngine] Whisper: spawn error: ${e.message}`);
      resolve(null);
    });
  });
}

const _alignerFailures = new Map(); // relativePath -> launch/runtime error text


/**
 * Run aligner.py — handles anchor text, Whisper, forced alignment, LRC hints, vocal cues.
 * Returns array of {time, text, words, type?} or null on failure.
 */
async function fetchFromAligner(audioPath, artist, title, language, retryCount = 0) {
  const relativePath = resolveTrackPathFromAudio(audioPath);
  if (relativePath) _alignerFailures.delete(relativePath);

  const alignerScript = resolveAlignerScriptPath();
  if (!fs.existsSync(alignerScript)) {
    const msg = `aligner script not found at ${alignerScript}`;
    console.warn(`[LyricsEngine] Aligner: ${msg}`);
    if (relativePath) _alignerFailures.set(relativePath, msg);
    return null;
  }

  // Prefer managed venv in packaged mode; create it lazily if needed.
  if (process.env.CHROMIC_LYRICS_ROOT) {
    await ensureLyricsVenvExistsAsync();
  }
  const pythonCommand = fs.existsSync(LYRICS_PYTHON)
    ? LYRICS_PYTHON
    : (process.platform === 'win32' ? 'python' : 'python3');

  try {
    const stat = fs.statSync(audioPath);
    if (stat.size > 500 * 1024 * 1024) return null;
  } catch (e) { return null; }

  // Ensure deps are installed (async — won't freeze the app)
  const aiCfg = loadAiConfig();
  const whisperModel = aiCfg.whisperModel || 'medium';
  const runtimeEngine = resolveWhisperEngineForPlatform(aiCfg.whisperEngine);
  if (retryCount === 0) {
    await ensureWhisperEngineDepsAsync(runtimeEngine, relativePath);
  }

  return new Promise((resolve) => {
    console.log(`[LyricsEngine] 🎯 Aligner: processing "${title}"...`);
    console.log(`[LyricsEngine] 🎯 Aligner: cmd="${pythonCommand}" script="${alignerScript}" scriptsRoot="${SCRIPTS_ROOT}"`);
    const args = [alignerScript, audioPath, '--artist', artist || '', '--title', title || '', '--model', whisperModel];
    if (runtimeEngine) {
      args.push('--engine', runtimeEngine);
      if (runtimeEngine !== aiCfg.whisperEngine) {
        console.log(`[LyricsEngine] Engine override for platform: requested=${aiCfg.whisperEngine} using=${runtimeEngine}`);
        const info = relativePath ? _whisperEnhancing.get(relativePath) : null;
        if (info && info.status === 'running') {
          info.step = 'engine_fallback';
          info.stepLabel = `Engine '${aiCfg.whisperEngine}' is unsupported on ${process.platform}; using '${runtimeEngine}'`;
        }
      }
    }
    if (language) args.push('--language', language);

    // Pass decensor config to aligner
    if (aiCfg.decensorLyrics === 'false' || aiCfg.decensorLyrics === false) {
      args.push('--no-decensor');
    }

    // Pass HF credentials to aligner so it can load LoRA adapter
    const alignerEnv = { ...process.env, CUDA_VISIBLE_DEVICES: '' };
    // Ensure common tool paths are on PATH (Electron strips them on macOS)
    if (process.platform === 'darwin') {
      const extraPaths = ['/opt/homebrew/bin', '/usr/local/bin', '/opt/local/bin'];
      const curPath = alignerEnv.PATH || '';
      const missing = extraPaths.filter(p => !curPath.split(':').includes(p));
      if (missing.length) alignerEnv.PATH = [...missing, curPath].join(':');
    }
    // Limit PyTorch MPS memory to prevent system freeze on macOS
    if (process.platform === 'darwin') {
      alignerEnv.PYTORCH_MPS_HIGH_WATERMARK_RATIO = '0.5';
      alignerEnv.PYTORCH_MPS_LOW_WATERMARK_RATIO = '0.0';
    }

    let proc;
    try {
      proc = spawn(pythonCommand, args, { stdio: ['ignore', 'pipe', 'pipe'], cwd: path.dirname(alignerScript), env: alignerEnv });
    } catch (e) {
      const msg = `spawn throw: ${e.message}`;
      console.error(`[LyricsEngine] Aligner spawn failed: ${msg}`);
      if (relativePath) _alignerFailures.set(relativePath, msg);
      resolve(null);
      return;
    }
    _whisperProcesses.set(audioPath, proc);

    // Handle spawn-level errors (e.g. Python binary not found)
    proc.on('error', (err) => {
      console.error(`[Aligner] Process error: ${err.message}`);
      const matchKey = [..._whisperEnhancing.keys()].find(k => audioPath.includes(k) || audioPath.endsWith(k));
      const info = matchKey ? _whisperEnhancing.get(matchKey) : null;
      if (info) { info.step = 'error'; info.stepLabel = `Process error: ${err.message}`; }
    });

    let stdout = '', stderr = '';
    let lastOutputAt = Date.now();
    let isDownloading = false;

    // Timeout watchdog: kill zombie processes that stop producing output
    const WATCHDOG_INTERVAL = 10_000;
    const WATCHDOG_TIMEOUT = 120_000; // 2 min — LoRA adapter inference on MPS can take 1-3 min
    const watchdog = setInterval(() => {
      if (isDownloading) return; // Don't kill during model download
      if (Date.now() - lastOutputAt > WATCHDOG_TIMEOUT) {
        console.warn(`[Aligner] ⚠️ Watchdog: no output for ${WATCHDOG_TIMEOUT / 1000}s — killing zombie process`);
        try { proc.kill('SIGTERM'); } catch {}
        clearInterval(watchdog);
        const matchKey = [..._whisperEnhancing.keys()].find(k => audioPath.includes(k) || audioPath.endsWith(k));
        const info = matchKey ? _whisperEnhancing.get(matchKey) : null;
        if (info) { info.step = 'error'; info.stepLabel = 'Process timed out — please retry'; }
      }
    }, WATCHDOG_INTERVAL);

    proc.stdout.on('data', (d) => {
      const chunk = d.toString();
      stdout += chunk;
      lastOutputAt = Date.now();
      // Parse STATUS/PROGRESS/ERROR signals from aligner stdout
      chunk.split('\n').filter(l => l.trim()).forEach(l => {
        const matchKey = [..._whisperEnhancing.keys()].find(k => audioPath.includes(k) || audioPath.endsWith(k));
        const info = matchKey ? _whisperEnhancing.get(matchKey) : null;

        if (l.startsWith('STATUS:') || l.startsWith('PROGRESS:') || l.startsWith('ERROR:')) {
          console.log(`[Aligner:signal] ${l}`);
        }

        if (l.includes('STATUS:CHECKING_MODELS')) {
          if (info && info.status === 'running') {
            info.step = 'checking_models'; info.stepLabel = 'Checking AI models…';
          }
        } else if (l.includes('STATUS:DOWNLOADING_MODELS_START') || l.includes('PROGRESS:DOWNLOADING_MODEL')) {
          isDownloading = true;
          console.log('[Aligner] 📥 Model download in progress...');
          if (info && info.status === 'running') {
            info.step = 'downloading_model';
            info.stepLabel = 'Downloading AI model (~500MB)… First run only.';
            if (!info.steps) info.steps = [];
            info.steps.push({ step: 'downloading_model', label: info.stepLabel, at: Date.now() });
          }
        } else if (l.includes('STATUS:MODEL_LOADED') || l.includes('PROGRESS:MODEL_READY')) {
          isDownloading = false;
          console.log('[Aligner] ✅ Model loaded');
          if (info && info.status === 'running') {
            info.step = 'transcribing'; info.stepLabel = 'Model loaded, transcribing…';
          }
        } else if (l.includes('STATUS:ADAPTER_TRANSCRIBING')) {
          // Heartbeat from LoRA adapter inference — keep watchdog alive
          if (info && info.status === 'running') {
            info.step = 'transcribing'; info.stepLabel = 'Transcribing with LoRA adapter…';
          }
        } else if (l.includes('STATUS:READY')) {
          if (info && info.status === 'running') {
            info.step = 'finalizing'; info.stepLabel = 'Finalizing…';
          }
        } else if (l.startsWith('ERROR:AI_ENGINE_FAILED:')) {
          const errMsg = l.replace('ERROR:AI_ENGINE_FAILED:', '').trim();
          console.error(`[Aligner] ❌ AI engine failed: ${errMsg}`);
          if (info) { info.step = 'error'; info.stepLabel = `AI error: ${errMsg.slice(0, 100)}`; }
        }
      });
    });
    proc.stderr.on('data', (d) => {
      const chunk = d.toString();
      stderr += chunk;
      lastOutputAt = Date.now();
      chunk.split('\n').filter(l => l.trim()).forEach(l => {
        console.log(`[Aligner] ${l}`);
        // Parse aligner progress steps for FE reporting
        const matchKey = [..._whisperEnhancing.keys()].find(k => audioPath.includes(k) || audioPath.endsWith(k));
        const info = matchKey ? _whisperEnhancing.get(matchKey) : null;
        if (info && info.status === 'running') {
          if (!info.steps) info.steps = [];
          if (l.includes('Searching lyrics')) { info.step = 'searching_lyrics'; info.stepLabel = 'Searching for lyrics…'; }
          else if (l.includes('✅') && l.includes('anchor')) { info.step = 'anchor_found'; info.stepLabel = 'Lyrics found'; }
          else if (l.includes('No anchor text found')) { info.step = 'no_anchor'; info.stepLabel = 'No lyrics found, transcribing…'; }
          else if (l.includes('Loading') && l.includes('model') || l.includes('Loading MLX model')) { info.step = 'downloading_model'; info.stepLabel = 'Downloading/loading AI model…'; }
          else if (l.includes('Downloading') || l.includes('download')) { info.step = 'downloading_model'; info.stepLabel = 'Downloading AI model…'; }
          else if (l.includes('Guided mode')) { info.step = 'transcribing'; info.stepLabel = 'Transcribing audio…'; }
          else if (l.includes('Detected language')) { const m = l.match(/language:\s*(\w+)/); info.step = 'transcribing'; info.stepLabel = `Transcribing (${m?.[1] || 'auto'})…`; }
          else if (l.includes('Whisper returned') || l.includes('MLX Whisper returned')) { const m = l.match(/(\d+)\s*segments?,\s*(\d+)\s*words?/); info.step = 'aligning'; info.stepLabel = `Aligning ${m?.[2] || ''} words…`; }
          else if (l.includes('Audio duration')) { const m = l.match(/([\d.]+)s/); info.step = 'aligning'; info.stepLabel = `Processing ${m?.[1] ? Math.round(parseFloat(m[1])) + 's' : ''} of audio…`; }
          else if (l.includes('Mapping')) { info.step = 'mapping'; info.stepLabel = 'Mapping timestamps to lyrics…'; }
          else if (l.includes('De-censored')) { info.step = 'decensoring'; info.stepLabel = 'De-censoring lyrics…'; }
          if (info.step) {
            info.steps.push({ step: info.step, label: info.stepLabel, at: Date.now() });
          }
        }
      });
    });

    proc.on('close', (code) => {
      clearInterval(watchdog);
      _whisperProcesses.delete(audioPath);
      if (code !== 0) {
        // Faster-Whisper regression on some Windows installs: recover by reinstalling pinned deps once.
        const hasEncoderCrash = /encocder_output|detect_language[\s\S]*\bencode\b/i.test(stderr || '');
        if (retryCount < 1 && hasEncoderCrash) {
          console.warn('[LyricsEngine] Detected faster-whisper encoder crash, reinstalling pinned runtime and retrying once...');
          ensureWhisperEngineDeps(runtimeEngine, relativePath);
          resolve(fetchFromAligner(audioPath, artist, title, language, retryCount + 1));
          return;
        }
        if (retryCount < 1 && installMissingAlignerDepsIfNeeded(stderr, relativePath)) {
          console.log('[LyricsEngine] Retrying aligner after dependency auto-fix...');
          resolve(fetchFromAligner(audioPath, artist, title, language, retryCount + 1));
          return;
        }
        const msg = `exit code ${code}${stderr ? `; stderr: ${stderr.slice(0, 2000)}` : ''}`;
        console.warn(`[LyricsEngine] Aligner failed: ${msg}`);
        if (relativePath) _alignerFailures.set(relativePath, msg);
        resolve(null);
        return;
      }
      try {
        // Filter out STATUS/PROGRESS/ERROR signal lines that aligner prints to stdout
        const jsonOut = stdout.split('\n')
          .filter(l => !l.startsWith('STATUS:') && !l.startsWith('PROGRESS:') && !l.startsWith('ERROR:'))
          .join('\n').trim();
        const result = JSON.parse(jsonOut);
        const lines = (result.lines || []).map(l => {
          const entry = { time: l.time, text: l.text || '' };
          if (l.type === 'vocal_cue') { entry.type = 'vocal_cue'; entry.end = l.end; }
          if (l.words?.length > 0) {
            entry.words = l.words.map(w => {
              const wo = { word: w.word, start: w.start, end: w.end };
              if (w.adlib) wo.adlib = true;
              if (w.whisper) wo.whisper = true;
              if (w.spoken) wo.spoken = true;
              if (w.sung) wo.sung = true;
              if (w.stretch) wo.stretch = true;
              return wo;
            });
            entry.end = l.words[l.words.length - 1].end;
          }
          return entry;
        });

        // Store raw whisper + reference text as sidecar for Word Snapper UI
        if (result.raw_whisper || result.reference_text) {
          try {
            const whisperSidecar = audioPath.replace(/\.[^/.]+$/, '.whisper.json');
            const whisperData = {};
            if (result.raw_whisper) whisperData.raw_whisper = result.raw_whisper;
            if (result.reference_text) whisperData.reference_text = result.reference_text;
            whisperData.source = result.source || 'unknown';
            whisperData.timestamp = new Date().toISOString();
            if (fs.existsSync(whisperSidecar)) {
              const whisperBackup = whisperSidecar.replace(/\.whisper\.json$/, '.whisper.backup.json');
              fs.copyFileSync(whisperSidecar, whisperBackup);
            }
            fs.writeFileSync(whisperSidecar, JSON.stringify(whisperData, null, 2));
            console.log(`[LyricsEngine] 📝 Saved raw whisper sidecar: ${path.basename(whisperSidecar)}`);
          } catch (e) {
            console.warn(`[LyricsEngine] Failed to save whisper sidecar: ${e.message}`);
          }
        }

        console.log(`[LyricsEngine] ✅ Aligner: ${lines.length} lines (source: ${result.source}) for "${title}"`);
        if (relativePath) _alignerFailures.delete(relativePath);
        resolve(lines.length > 0 ? lines : null);
      } catch (e) {
        const msg = `invalid aligner JSON: ${e.message}`;
        console.warn(`[LyricsEngine] Aligner parse failed: ${msg}`);
        if (relativePath) _alignerFailures.set(relativePath, msg);
        resolve(null);
      }
    });
    proc.on('error', (e) => {
      _whisperProcesses.delete(audioPath);
      const msg = `spawn error: ${e.message}`;
      console.error(`[LyricsEngine] Aligner process error: ${msg}`);
      if (relativePath) _alignerFailures.set(relativePath, msg);
      resolve(null);
    });
  });
}

/**
 * Try all sources and store lyrics for a track
 * Strategy: Store line-level lyrics immediately, then enhance with Whisper word timestamps.
 * Frontend polls /api/lyrics/enhance-status to know when word-level data is ready.
 */
// Track which paths are currently being Whisper-enhanced
const _whisperEnhancing = new Map(); // path → { status: 'pending'|'running'|'done'|'failed', startedAt, proc? }
const _whisperProcesses = new Map(); // path → ChildProcess (for cancellation)

async function fetchAndStoreLyrics(relativePath, artist, title, album) {
  const fullPath = resolveTrackFullPath(relativePath);
  if (!fs.existsSync(fullPath)) return;

  console.log(`[LyricsEngine] Processing: "${artist} - ${title}"`);

  _whisperEnhancing.set(relativePath, { status: 'running', startedAt: Date.now(), step: 'starting', stepLabel: 'Starting lyrics engine…', steps: [], title: title || '', artist: artist || '' });

  const runtime = await awaitWhisperRuntimeReady();
  if (!runtime.ok) {
    _whisperEnhancing.set(relativePath, {
      status: 'failed',
      reason: runtime.reason || 'whisper-runtime-not-ready',
      errorMessage: runtime.error || _whisperWarmupState.lastError || 'Whisper runtime setup failed',
      warmupStatus: runtime.status || _whisperWarmupState.status,
    });
    setTimeout(() => _whisperEnhancing.delete(relativePath), 300000);
    return;
  }

  // Priority order (handled by aligner.py):
  //   1. Local .lrc file → used as 100% trusted guide (timestamps + text) for Whisper word alignment
  //   2. Genius/LRCLIB lyrics → anchor text for guided Whisper transcription
  //   3. Full blind Whisper transcription (no anchor, no timestamps)
  let parsed = null;
  const aiCfg = loadAiConfig();
  if (!parsed) {
    const alignerResult = await fetchFromAligner(fullPath, artist, title, null);
    if (alignerResult && alignerResult.length > 0) {
      parsed = alignerResult;
      _whisperEnhancing.set(relativePath, { status: 'done', finishedAt: Date.now() });
    } else {
      // FALLBACK: basic whisper-ctranslate2 (no alignment, no anchor text)
      console.log(`[LyricsEngine] Aligner failed, falling back to basic Whisper`);
    const whisperResult = await fetchFromWhisper(fullPath, title, null);
    if (whisperResult && whisperResult.length > 0) {
      parsed = whisperResult;
      _whisperEnhancing.set(relativePath, { status: 'done', finishedAt: Date.now() });
    } else {
      const alignerError = _alignerFailures.get(relativePath);
      _whisperEnhancing.set(relativePath, {
        status: 'failed',
        reason: alignerError ? 'aligner-launch-failed' : 'aligner-and-whisper-failed',
        errorMessage: alignerError || null,
      });
    }
    }
  }
  setTimeout(() => _whisperEnhancing.delete(relativePath), 300000);

  if (parsed && parsed.length > 0) {
    const lyricsJson = JSON.stringify(parsed);
    try {
      const stmtUpdate = tracksDb.prepare('UPDATE tracks SET lyrics=@lyrics, lyrics_type=@lyrics_type WHERE path=@path');
      stmtUpdate.run({ path: relativePath, lyrics: lyricsJson, lyrics_type: 'synced' });
      console.log(`[LyricsEngine] ✅ Stored ${parsed.length} synced lines for "${artist} - ${title}"`);
    } catch (e) {
      console.warn(`[LyricsEngine] DB update failed: ${e.message}`);
    }
    try {
      const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      // Don't overwrite user-edited sidecars
      if (fs.existsSync(sidecarPath)) {
        try {
          const existing = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
          if (existing && !Array.isArray(existing) && existing.userEdited) {
            console.log(`[LyricsEngine] ⏭️ Skipping sidecar overwrite — user-edited: ${path.basename(sidecarPath)}`);
            return;
          }
          if (Array.isArray(existing) && existing[0]?._userEdited) {
            console.log(`[LyricsEngine] ⏭️ Skipping sidecar overwrite — flow-edited: ${path.basename(sidecarPath)}`);
            return;
          }
        } catch (e) { /* parse error, ok to overwrite */ }
      }
      // Backup existing sidecar before overwriting
      if (fs.existsSync(sidecarPath)) {
        try {
          const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 23);
          const backupDir = path.join(path.dirname(sidecarPath), '.chromic-backups');
          if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
          const backupName = path.basename(sidecarPath).replace(/\.lyrics\.json$/, `.lyrics.backup_${ts}.json`);
          const backupPath = path.join(backupDir, backupName);
          fs.copyFileSync(sidecarPath, backupPath);
          console.log(`[LyricsEngine] 💾 Backed up existing sidecar: ${backupName}`);
        } catch (be) {
          console.warn(`[LyricsEngine] Failed to backup sidecar: ${be.message}`);
        }
      }
      fs.writeFileSync(sidecarPath, lyricsJson);

      // ── Auto-generate .lrc sidecar (line-level) alongside .lyrics.json (word-level) ──
      // This gives users an editable .lrc file they can tweak in any text editor.
      try {
        const lrcPath = fullPath.replace(/\.[^/.]+$/, '.lrc');
        if (!fs.existsSync(lrcPath)) {
          const lrcLines = [];
          for (const line of parsed) {
            if (!line.text || line.type === 'vocal_cue') continue;
            const t = line.time ?? 0;
            const mins = Math.floor(t / 60);
            const secs = t - mins * 60;
            const ts = `[${String(mins).padStart(2, '0')}:${secs.toFixed(2).padStart(5, '0')}]`;
            lrcLines.push(`${ts} ${line.text}`);
          }
          if (lrcLines.length > 0) {
            fs.writeFileSync(lrcPath, lrcLines.join('\n') + '\n', 'utf-8');
            console.log(`[LyricsEngine] 📝 Auto-generated .lrc sidecar: ${path.basename(lrcPath)} (${lrcLines.length} lines)`);
          }
        }
      } catch (le) {
        console.warn(`[LyricsEngine] Failed to generate .lrc: ${le.message}`);
      }
    } catch (e) { /* ignore */ }
  } else {
    try {
      const stmtMark = tracksDb.prepare('UPDATE tracks SET lyrics_type=@lyrics_type WHERE path=@path AND lyrics IS NULL');
      stmtMark.run({ path: relativePath, lyrics_type: 'not_found' });
    } catch (e) { /* ignore */ }
    console.log(`[LyricsEngine] ❌ No lyrics found for "${artist} - ${title}"`);
  }
}

/**
 * Add track to background lyrics processing queue
 */
function enqueueLyricsFetch(relativePath, artist, title, album, force = false) {
  // Don't re-queue same track if it's already running or queued (unless force).
  if (!force && lyricsCurrentPath === relativePath) return;
  if (!force && LYRICS_QUEUE.some(q => q.path === relativePath)) return;
  // If force and already queued, remove old entry to re-queue fresh
  if (force) {
    const idx = LYRICS_QUEUE.findIndex(q => q.path === relativePath);
    if (idx !== -1) LYRICS_QUEUE.splice(idx, 1);
  }
  LYRICS_QUEUE.push({ path: relativePath, artist, title, album });
  processNextLyrics();
}

async function processNextLyrics() {
  if (lyricsProcessing || LYRICS_QUEUE.length === 0) return;
  lyricsProcessing = true;

  const task = LYRICS_QUEUE.shift();
  lyricsCurrentPath = task.path;
  try {
    await fetchAndStoreLyrics(task.path, task.artist, task.title, task.album);
  } catch (e) {
    console.warn(`[LyricsEngine] Error processing ${task.title}:`, e.message);
  }

  // Rate limit: 1 second between requests
  await new Promise(r => setTimeout(r, 1000));
  lyricsCurrentPath = null;
  lyricsProcessing = false;
  processNextLyrics();
}

/**
 * Look for .lrc sidecar file next to audio file
 */
function findLrcFile(audioPath) {
  const dir = path.dirname(audioPath);
  const base = path.basename(audioPath, path.extname(audioPath));
  const lrcPath = path.join(dir, base + '.lrc');
  if (fs.existsSync(lrcPath)) {
    return fs.readFileSync(lrcPath, 'utf8');
  }
  return null;
}

/**
 * Extract track metadata using music-metadata (async import for ESM module)
 */
async function extractTrackMetadata(filePath) {
  const mm = await import('music-metadata');
  const metadata = await mm.parseFile(filePath);

  // ── DEBUG: dump all metadata ──
  const basename = path.basename(filePath);
  console.log(`[metadata] ─── Parsing: ${basename} ───`);
  console.log(`[metadata] common.title: ${metadata.common.title}`);
  console.log(`[metadata] common.artist: ${metadata.common.artist}`);
  console.log(`[metadata] common.album: ${metadata.common.album}`);
  console.log(`[metadata] common.year: ${metadata.common.year}`);
  console.log(`[metadata] common.lyrics: ${metadata.common.lyrics ? JSON.stringify(metadata.common.lyrics).slice(0, 200) : '(empty)'}`);
  console.log(`[metadata] format: codec=${metadata.format.codec}, sr=${metadata.format.sampleRate}, bps=${metadata.format.bitsPerSample}, duration=${metadata.format.duration}`);
  if (metadata.native) {
    for (const [fmt, tags] of Object.entries(metadata.native)) {
      const tagNames = tags.map(t => t.id);
      const uniqueNames = [...new Set(tagNames)];
      console.log(`[metadata] native.${fmt} tags (${tags.length}): ${uniqueNames.join(', ')}`);
      // Show any tag with "lyric" in the name
      const lyricRelated = tags.filter(t => /lyric/i.test(t.id));
      if (lyricRelated.length) {
        lyricRelated.forEach(t => console.log(`[metadata]   → ${t.id} = ${String(t.value).slice(0, 150)}`));
      }
    }
  } else {
    console.log('[metadata] native: (empty)');
  }
  console.log(`[metadata] ─── End: ${basename} ───`);

  const lrcContent = findLrcFile(filePath);
  let lyrics = null;
  let lyricsType = null;

  // Priority 0 (HIGHEST): .lyrics.json sidecar (Whisper AI / LyricsEngine output)
  const sidecarPath = filePath.replace(/\.[^/.]+$/, '.lyrics.json');
  if (fs.existsSync(sidecarPath)) {
    try {
      const sidecarRaw = fs.readFileSync(sidecarPath, 'utf-8');
      const sidecarParsed = JSON.parse(sidecarRaw);
      // Sidecar can be {source, lines: [...]} or just [...]
      const sidecarLines = Array.isArray(sidecarParsed) ? sidecarParsed : (Array.isArray(sidecarParsed?.lines) ? sidecarParsed.lines : null);
      if (sidecarLines && sidecarLines.length > 0) {
        // Validate: reject sidecar if timestamps exceed audio duration significantly
        const audioDuration = metadata.format.duration || 0;
        const maxTimestamp = Math.max(...sidecarLines.map(l => parseFloat(l.time) || parseFloat(l.start) || 0));
        if (audioDuration > 0 && maxTimestamp > audioDuration * 1.15 + 10) {
          console.warn(`[metadata] ⚠️ .lyrics.json sidecar REJECTED — timestamps (${maxTimestamp.toFixed(1)}s) exceed audio duration (${audioDuration.toFixed(1)}s)`);
        } else {
          // Fix CJK text fields: remove spaces between consecutive CJK characters
          const CJK_SPACE_RE = /([\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF、。！？…・ー〜]) ([\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF])/g;
          for (const line of sidecarLines) {
            if (line.text && typeof line.text === 'string') {
              // Apply repeatedly since regex can't overlap
              let prev;
              do { prev = line.text; line.text = line.text.replace(CJK_SPACE_RE, '$1$2'); } while (line.text !== prev);
            }
          }
          lyrics = JSON.stringify(sidecarLines);
          lyricsType = 'synced';
          console.log(`[metadata] ✅ Using .lyrics.json sidecar (${sidecarLines.length} lines)`);
        }
      } else {
        console.warn(`[metadata] ⚠️ .lyrics.json sidecar exists but has no valid lines`);
      }
    } catch (e) {
      console.warn(`[metadata] Failed to parse .lyrics.json: ${e.message}`);
    }
  }


  // Priority 2: LRC sidecar
  if (!lyrics && lrcContent) {
    lyrics = JSON.stringify(parseLrc(lrcContent));
    lyricsType = 'synced';
  } else if (!lyrics && metadata.common.lyrics && metadata.common.lyrics.length > 0) {
    const raw = metadata.common.lyrics[0];
    lyrics = typeof raw === 'string' ? raw : (raw?.text || raw?.lyrics || JSON.stringify(raw));
    lyricsType = 'unsynced';
  }

  // Fallback: search native tags (FLAC Vorbis Comments, ID3 USLT, etc.)
  if (!lyrics && metadata.native) {
    for (const [format, tags] of Object.entries(metadata.native)) {
      const lyricTag = tags.find(t =>
        /^(LYRICS|UNSYNCEDLYRICS|UNSYNCED LYRICS|USLT|TEXT)$/i.test(t.id)
      );
      if (lyricTag) {
        lyrics = typeof lyricTag.value === 'string' ? lyricTag.value : (lyricTag.value?.text || lyricTag.value?.lyrics || JSON.stringify(lyricTag.value));
        lyricsType = 'unsynced';
        console.log(`[metadata] Found native lyrics in tag: ${lyricTag.id} (${format})`);
        break;
      }
    }
  }

  let coverFormat = null;
  let coverData = null;
  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const pic = metadata.common.picture[0];
    coverFormat = pic.format;
    coverData = Buffer.from(pic.data).toString('base64');
  }

  return {
    title: String(metadata.common.title || path.basename(filePath, path.extname(filePath))),
    artist: String(metadata.common.artist || 'Unknown'),
    album: String(metadata.common.album || ''),
    year: typeof metadata.common.year === 'number' ? metadata.common.year : null,
    disc: metadata.common.disk?.no || null,
    trackNumber: metadata.common.track?.no || null,
    duration: Number(metadata.format.duration) || 0,
    lyrics: lyrics ? String(lyrics) : null,
    lyricsType,
    coverFormat: coverFormat ? String(coverFormat) : null,
    coverData: coverData ? String(coverData) : null,
  };
}

// ─── SPOTLIGHT SEARCH API ─────────────────────────────────────────────────────

/** Normalize text for search: strip punctuation, lowercase */
function normalizeSearch(str) {
  return (str || '').toLowerCase().replace(/[''`]/g, '').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

/** Simple Levenshtein distance for fuzzy matching */
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q || q.length < 2) return res.json({ tracks: [], lyrics: [] });

  try {
    const normQ = normalizeSearch(q);
    const pattern = `%${q}%`;
    const patternLower = `%${q.toLowerCase()}%`;

    // Search track titles/artists/albums (SQL LIKE is case-insensitive for ASCII only)
    const trackResults = tracksDb.prepare(
      `SELECT path, title, artist, album FROM tracks WHERE deleted_at IS NULL AND (title LIKE ? OR artist LIKE ? OR album LIKE ? OR title LIKE ? OR artist LIKE ? OR album LIKE ?) LIMIT 20`
    ).all(pattern, pattern, pattern, patternLower, patternLower, patternLower);

    // Also try normalized search for tracks with punctuation differences
    const normPattern = `%${normQ.replace(/ /g, '%')}%`;
    const extraTracks = tracksDb.prepare(
      `SELECT path, title, artist, album FROM tracks WHERE deleted_at IS NULL AND (REPLACE(REPLACE(LOWER(title), '''', ''), ',', '') LIKE ? OR REPLACE(REPLACE(LOWER(album), '''', ''), ',', '') LIKE ? OR REPLACE(REPLACE(LOWER(artist), '''', ''), ',', '') LIKE ?) LIMIT 10`
    ).all(normPattern, normPattern, normPattern);

    // Merge, dedupe by path
    const seenPaths = new Set(trackResults.map(t => t.path));
    for (const t of extraTracks) {
      if (!seenPaths.has(t.path)) { trackResults.push(t); seenPaths.add(t.path); }
    }

    // Search inside lyrics text
    const lyricsResults = tracksDb.prepare(
      `SELECT path, title, artist, lyrics FROM tracks WHERE deleted_at IS NULL AND lyrics LIKE ? AND lyrics IS NOT NULL LIMIT 15`
    ).all(pattern);

    // Also search normalized lyrics
    const lyricsNorm = tracksDb.prepare(
      `SELECT path, title, artist, lyrics FROM tracks WHERE deleted_at IS NULL AND lyrics IS NOT NULL AND REPLACE(REPLACE(LOWER(lyrics), '''', ''), ',', '') LIKE ? LIMIT 10`
    ).all(normPattern);
    const seenLyricPaths = new Set(lyricsResults.map(r => r.path));
    for (const r of lyricsNorm) {
      if (!seenLyricPaths.has(r.path)) { lyricsResults.push(r); seenLyricPaths.add(r.path); }
    }

    // Extract matched lines with word-level timestamps
    const lyricsMatches = [];
    for (const row of lyricsResults) {
      if (!row.lyrics) continue;
      try {
        const lines = JSON.parse(row.lyrics);
        const matches = [];
        for (const line of (Array.isArray(lines) ? lines : [])) {
          const text = line.text || '';
          const normText = normalizeSearch(text);
          // Exact normalized match or fuzzy (for short queries allow distance 1)
          const isMatch = normText.includes(normQ) ||
            (normQ.length >= 4 && normQ.split(' ').some(w => normText.split(' ').some(tw => tw.length > 2 && levenshtein(w, tw) <= 1)));

          if (isMatch) {
            // Try to find word-level start time
            let startTime = line.time || line.start || 0;
            if (line.words && Array.isArray(line.words)) {
              const normWords = normQ.split(' ');
              for (const w of line.words) {
                if (normalizeSearch(w.text || '').includes(normWords[0])) {
                  startTime = w.start || startTime;
                  break;
                }
              }
            }
            matches.push({ text, time: startTime });
            if (matches.length >= 3) break;
          }
        }
        if (matches.length > 0) {
          lyricsMatches.push({
            path: row.path,
            title: row.title || path.basename(row.path, path.extname(row.path)),
            artist: row.artist || '',
            matches,
          });
        }
      } catch (_) {}
    }

    // Search standalone music files on disk (not just DB)
    // Also search .lyrics.json sidecar files directly (handles Cyrillic, stale DB, flow-mode edits)
    const seenSidecarPaths = new Set(lyricsMatches.map(r => r.path));
    try {
      const qLower = q.toLowerCase();
      const allTracks = tracksDb.prepare('SELECT path, title, artist, absolute_path, source FROM tracks WHERE deleted_at IS NULL LIMIT 2000').all();
      console.log(`[search] Sidecar scan: ${allTracks.length} tracks, query="${q}"`);
      let sidecarChecked = 0, sidecarFound = 0;
      for (const row of allTracks) {
        if (seenSidecarPaths.has(row.path)) continue;
        if (lyricsMatches.length >= 25) break;
        const fullP = row.absolute_path || (row.source !== 'linked' ? path.join(MEDIA_ROOT, row.path) : null);
        if (!fullP) continue;
        const sidecar = fullP.replace(/\.[^/.]+$/, '.lyrics.json');
        try {
          if (!fs.existsSync(sidecar)) continue;
          sidecarChecked++;
          const raw = fs.readFileSync(sidecar, 'utf-8');
          if (!raw.toLowerCase().includes(qLower)) continue;
          sidecarFound++;
          console.log(`[search] Sidecar HIT: ${path.basename(sidecar)}`);
          const lines = JSON.parse(raw);
          const matches = [];
          for (const line of (Array.isArray(lines) ? lines : [])) {
            const text = line.text || '';
            if (text.toLowerCase().includes(qLower)) {
              matches.push({ text, time: line.time || line.start || 0 });
              if (matches.length >= 3) break;
            }
          }
          if (matches.length > 0) {
            lyricsMatches.push({ path: row.path, title: row.title || '', artist: row.artist || '', matches });
            seenSidecarPaths.add(row.path);
          }
        } catch {}
      }
      console.log(`[search] Sidecar scan done: checked=${sidecarChecked} found=${sidecarFound}`);
    } catch (e) { console.error('[search] Sidecar outer error:', e.message, e.stack?.split('\n')[1]); }

    const musicFileResults = [];
    try {
      const musicDir = path.join(MEDIA_ROOT, 'music');
      if (fs.existsSync(musicDir)) {
        const musicFiles = fs.readdirSync(musicDir).filter(f => /\.(mp3|flac|wav|m4a|aac|ogg|opus|wma|aiff)$/i.test(f));
        const seenMusic = new Set(trackResults.map(t => t.path));
        for (const f of musicFiles) {
          const cleanName = f.replace(/\.[^/.]+$/, '').replace(/\./g, ' ');
          if ((cleanName.toLowerCase().includes(q.toLowerCase()) || normalizeSearch(cleanName).includes(normQ)) && !seenMusic.has(`music/${f}`)) {
            musicFileResults.push({ path: `music/${f}`, title: cleanName, type: 'music' });
            seenMusic.add(`music/${f}`);
            if (musicFileResults.length >= 10) break;
          }
        }
      }
    } catch (_) {}

    // Search translation sidecar files (.lyrics.*.json)
    const seenTranslationPaths = new Set(lyricsMatches.map(r => r.path));
    try {
      // Get all tracks that have lyrics (potential translation candidates)
      const allLyricTracks = tracksDb.prepare(
        `SELECT path, title, artist FROM tracks WHERE lyrics IS NOT NULL LIMIT 500`
      ).all();
      for (const row of allLyricTracks) {
        if (seenTranslationPaths.has(row.path)) continue;
        const fullPath = path.join(MEDIA_ROOT, row.path);
        // Check all translation sidecar files
        const dir = path.dirname(fullPath);
        const base = path.basename(fullPath, path.extname(fullPath));
        try {
          const dirFiles = fs.readdirSync(dir);
          for (const f of dirFiles) {
            if (!f.startsWith(base + '.lyrics.') || !f.endsWith('.json') || f === base + '.lyrics.json') continue;
            const transPath = path.join(dir, f);
            try {
              const transLines = JSON.parse(fs.readFileSync(transPath, 'utf-8'));
              if (!Array.isArray(transLines)) continue;
              const matches = [];
              for (let li = 0; li < transLines.length; li++) {
                const line = String(transLines[li] || '');
                if (line.toLowerCase().includes(q.toLowerCase())) {
                  // Try to get timestamp from original lyrics
                  const origLyrics = JSON.parse(fs.readFileSync(fullPath.replace(/\.[^/.]+$/, '.lyrics.json'), 'utf-8') || '[]');
                  const origLine = Array.isArray(origLyrics) ? origLyrics[li] : null;
                  const startTime = origLine?.time || origLine?.start || 0;
                  matches.push({ text: line, time: startTime, isTranslation: true });
                  if (matches.length >= 3) break;
                }
              }
              if (matches.length > 0) {
                const lang = f.match(/\.lyrics\.(\w+)\.json$/)?.[1] || '';
                lyricsMatches.push({
                  path: row.path,
                  title: row.title || path.basename(row.path, path.extname(row.path)),
                  artist: row.artist || '',
                  matches,
                  translationLang: lang,
                });
                seenTranslationPaths.add(row.path);
              }
            } catch {}
          }
        } catch {}
        if (lyricsMatches.length >= 25) break;
      }
    } catch (e) {
      console.warn('[search] Translation search error:', e.message);
    }

    // Search albums by name, artist, OR folder path
    const albumResults = tracksDb.prepare(
      `SELECT album, artist, MIN(path) as samplePath, COUNT(*) as trackCount
       FROM tracks WHERE album IS NOT NULL AND album != ''
       AND (album LIKE ? OR album LIKE ? OR artist LIKE ? OR artist LIKE ? OR path LIKE ? OR path LIKE ?)
       GROUP BY album, artist LIMIT 10`
    ).all(pattern, patternLower, pattern, patternLower, pattern, patternLower);

    console.log(`[search] q="${q}" → tracks=${trackResults.length} lyrics=${lyricsMatches.length} music=${musicFileResults.length} albums=${albumResults.length}`);
    res.json({ tracks: trackResults.slice(0, 20), lyrics: lyricsMatches, music: musicFileResults, albums: albumResults });
  } catch (err) {
    console.error('[search] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── AI/PRO SETTINGS API ─────────────────────────────────────────────────────
app.get('/api/engine/health', (req, res) => {
  const mem = process.memoryUsage();
  const osMem = require('os');
  res.json({
    heap: {
      usedMB: Math.round(mem.heapUsed / 1048576),
      totalMB: Math.round(mem.heapTotal / 1048576),
      rssMB: Math.round(mem.rss / 1048576),
      externalMB: Math.round(mem.external / 1048576),
    },
    system: {
      totalMB: Math.round(osMem.totalmem() / 1048576),
      freeMB: Math.round(osMem.freemem() / 1048576),
    },
    uptime: Math.round(process.uptime()),
  });
});

app.get('/api/settings/ai', (req, res) => {
  const config = loadAiConfig();
  // Mask secrets for security
  if (config.openaiApiKey) {
    config.openaiApiKey = config.openaiApiKey.slice(0, 7) + '...' + config.openaiApiKey.slice(-4);
  }
  res.json(config);
});

app.patch('/api/settings/ai', express.json(), (req, res) => {
  try {
    const current = loadAiConfig();
    const updates = req.body;
    // If key is masked (contains ...), keep the old one
    if (updates.openaiApiKey && updates.openaiApiKey.includes('...')) {
      delete updates.openaiApiKey;
    }
    const saved = saveAiConfig({ ...current, ...updates });
    // Reset sticky Ollama fallback so new settings take effect immediately
    _ollamaFallbackUntil = 0;
    _ollamaFallbackModel = '';
    // Re-warm runtime for changed engine/model/deps in background.
    startWhisperWarmupIfNeeded({ force: true });
    console.log('[Settings] ✅ AI config updated');
    // Mask key in response
    const response = { ...saved };
    if (response.openaiApiKey) {
      response.openaiApiKey = response.openaiApiKey.slice(0, 7) + '...' + response.openaiApiKey.slice(-4);
    }
    res.json({ ok: true, config: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ─── Developer Access Key Verification ───────────────────────────────────────
// Keys are validated by SHA-256 hash so plaintext keys aren't in the binary.
// Each key is bound to the first machine that uses it (machine fingerprint stored in config).
// To add a new key: node -e "console.log(require('crypto').createHash('sha256').update('YOUR_KEY').digest('hex'))"
const VALID_DEV_KEY_HASHES = new Set([
  '54770a858751e9e14a11cbf12afbed6006a8dbf9ff7563d100ee7c62c2d51288', // chromic-dev-CYP-...
]);

const DEV_ACCESS_KEY = process.env.CHROMIC_DEV_KEY || '';

/** Generate a stable machine fingerprint from hostname + OS + CPU arch */
function getMachineFingerprint() {
  const crypto = require('crypto');
  const os = require('os');
  const raw = `${os.hostname()}|${os.platform()}|${os.arch()}|${os.cpus()?.[0]?.model || ''}|${os.userInfo().username}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
}

function isValidDevKey(key) {
  if (!key) return false;
  // 1. Check env var (local dev — no machine binding)
  if (DEV_ACCESS_KEY && key === DEV_ACCESS_KEY) return true;
  // 2. Check embedded hash list (prod)
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  if (!VALID_DEV_KEY_HASHES.has(hash)) return false;
  // 3. Machine binding — first activation binds the key to this machine
  const config = loadAiConfig();
  const fingerprint = getMachineFingerprint();
  const bindings = config._devKeyBindings || {};
  if (bindings[hash] && bindings[hash] !== fingerprint) {
    console.warn(`[DevAccess] Key already bound to different machine (${bindings[hash]} ≠ ${fingerprint})`);
    return false; // Key was used on a different machine
  }
  if (!bindings[hash]) {
    // First use — bind to this machine
    bindings[hash] = fingerprint;
    config._devKeyBindings = bindings;
    saveAiConfig(config);
    console.log(`[DevAccess] Key bound to machine fingerprint: ${fingerprint}`);
  }
  return true;
}

app.post('/api/ai/verify-dev-key', express.json(), (req, res) => {
  const { key } = req.body || {};
  if (!key) return res.status(400).json({ ok: false, error: 'Missing key' });
  if (isValidDevKey(key)) {
    console.log('[DevAccess] ✅ Developer access granted');
    return res.json({ ok: true });
  }
  console.log('[DevAccess] ❌ Invalid developer key attempt');
  return res.json({ ok: false, error: 'Invalid developer key' });
  return res.json({ ok: false, error: 'Invalid key' });
});

const PY_SETUP_PACKAGES = [
  'pip',
  'setuptools',
  'wheel',
  'syncedlyrics',
  'whisper-ctranslate2',
  'faster-whisper==1.0.3',
  'ctranslate2==4.4.0',
  'python-dotenv',
  'rapidfuzz',
  'lyricsgenius',
  'mlx-whisper',
  'openai-whisper',
  'soundfile',
  'imageio-ffmpeg',
];

function getPythonBootstrapBin() {
  if (process.env.PYTHON_BIN) return process.env.PYTHON_BIN;
  if (process.platform === 'win32') return 'python';
  return 'python3';
}

function runCommandCapture(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
    ...opts,
  });
  return {
    ok: !result.error && result.status === 0,
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error?.message || null,
  };
}

/** Async version of runCommandCapture — does NOT block the event loop */
function runCommandCaptureAsync(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    let stdout = '', stderr = '';
    let proc;
    try {
      proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], ...opts });
    } catch (e) {
      resolve({ ok: false, status: -1, stdout: '', stderr: '', error: e.message });
      return;
    }
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('error', (e) => {
      resolve({ ok: false, status: -1, stdout, stderr, error: e.message });
    });
    proc.on('close', (code) => {
      resolve({ ok: code === 0, status: code, stdout, stderr, error: null });
    });
  });
}

const _whisperWarmupState = {
  status: 'idle', // idle | skipped | running | ready | failed
  engine: null,
  model: null,
  startedAt: null,
  finishedAt: null,
  lastError: null,
  markerPath: null,
};
let _whisperWarmupPromise = null;

function getWhisperWarmupMarkerPath(engine, model) {
  const safeEngine = String(engine || 'auto').replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
  const safeModel = String(model || 'medium').replace(/[^a-z0-9._-]/gi, '_').toLowerCase();
  return path.join(LYRICS_ENGINE_ROOT, `.warmup-${safeEngine}-${safeModel}.done`);
}

function buildWhisperWarmupScript(engine, model) {
  const escModel = JSON.stringify(model || 'medium');
  if (engine === 'openai') {
    return [
      'import os, sys, shutil',
      'if not shutil.which("ffmpeg"):',
      '  try:',
      '    import imageio_ffmpeg',
      '    ff = imageio_ffmpeg.get_ffmpeg_exe()',
      '    os.environ["PATH"] = os.path.dirname(ff) + os.pathsep + os.environ.get("PATH", "")',
      '    print(f"[warmup] ffmpeg from imageio-ffmpeg: {ff}", file=sys.stderr)',
      '  except Exception as e:',
      '    print(f"[warmup] ffmpeg bootstrap failed: {e}", file=sys.stderr)',
      'import whisper, torch',
      `model_name = ${escModel}`,
      'if model_name == "large-v3-turbo": model_name = "turbo"',
      'device = "cpu"',
      'if torch.cuda.is_available():',
      '    try:',
      '        torch.cuda.get_device_name(0)',
      '        device = "cuda"',
      '    except Exception:',
      '        print("[warmup] CUDA reported available but broken — using CPU", file=sys.stderr)',
      'print(f"[warmup] device={device} model={model_name}", file=sys.stderr)',
      'whisper.load_model(model_name, device=device)',
      'print("ok")',
    ].join('\n');
  }

  if (engine === 'mlx') {
    return [
      'import os, tempfile, wave',
      'import mlx_whisper',
      `model_name = ${escModel}`,
      'mlx_models = {',
      '  "tiny": "mlx-community/whisper-tiny-mlx",',
      '  "base": "mlx-community/whisper-base-mlx",',
      '  "small": "mlx-community/whisper-small-mlx",',
      '  "medium": "mlx-community/whisper-medium-mlx",',
      '  "large": "mlx-community/whisper-large-v3-mlx",',
      '  "large-v3": "mlx-community/whisper-large-v3-mlx",',
      '  "large-v3-turbo": "mlx-community/whisper-large-v3-turbo",',
      '}',
      'repo = mlx_models.get(model_name, f"mlx-community/whisper-{model_name}-mlx")',
      'fd, wav_path = tempfile.mkstemp(suffix=".wav")',
      'os.close(fd)',
      'with wave.open(wav_path, "wb") as wf:',
      '  wf.setnchannels(1)',
      '  wf.setsampwidth(2)',
      '  wf.setframerate(16000)',
      '  wf.writeframes(b"\\x00\\x00" * 16000)',
      'try:',
      '  mlx_whisper.transcribe(wav_path, path_or_hf_repo=repo, word_timestamps=False, condition_on_previous_text=False)',
      'finally:',
      '  try: os.remove(wav_path)',
      '  except OSError: pass',
      'print("ok")',
    ].join('\n');
  }

  if (engine === 'whisperx') {
    return [
      'import whisperx',
      `model_name = ${escModel}`,
      'whisperx.load_model(model_name, "cpu", compute_type="int8")',
      'print("ok")',
    ].join('\n');
  }

  // Default: faster-whisper — always use CPU int8, disable CUDA to avoid cuDNN DLL crashes
  return [
    'import os, sys, glob, importlib',
    'os.environ["CUDA_VISIBLE_DEVICES"] = ""',
    '# On Windows: delete cuDNN/CUDA DLLs from ctranslate2 before import to prevent STATUS_DLL_NOT_FOUND crash',
    'if sys.platform == "win32":',
    '    import site',
    '    for sp in site.getsitepackages() + [os.path.join(sys.prefix, "Lib", "site-packages")]:',
    '        ct2_dir = os.path.join(sp, "ctranslate2")',
    '        if os.path.isdir(ct2_dir):',
    '            for dll in glob.glob(os.path.join(ct2_dir, "*.dll")):',
    '                bn = os.path.basename(dll).lower()',
    '                if any(x in bn for x in ["cudnn", "cublas", "cufft", "curand", "cusolver", "cusparse", "nvinfer", "nvrtc"]):',
    '                    try: os.remove(dll)',
    '                    except: pass',
    '        libs_dir = os.path.join(ct2_dir, ".libs")',
    '        if os.path.isdir(libs_dir):',
    '            for dll in glob.glob(os.path.join(libs_dir, "*.dll")):',
    '                bn = os.path.basename(dll).lower()',
    '                if any(x in bn for x in ["cudnn", "cublas", "cufft", "curand", "cusolver", "cusparse", "nvinfer", "nvrtc"]):',
    '                    try: os.remove(dll)',
    '                    except: pass',
    'from faster_whisper import WhisperModel',
    `model_name = ${escModel}`,
    'print(f"[warmup] device=cpu compute=int8 model={model_name}", file=sys.stderr)',
    'WhisperModel(model_name, device="cpu", compute_type="int8")',
    'print("ok")',
  ].join('\n');
}

function startWhisperWarmupIfNeeded({ force = false } = {}) {
  // Only auto-warmup in packaged/electron runtime where CHROMIC_LYRICS_ROOT is configured.
  if (!process.env.CHROMIC_LYRICS_ROOT) {
    _whisperWarmupState.status = 'skipped';
    _whisperWarmupState.lastError = 'not-packaged-runtime';
    return null;
  }
  if (_whisperWarmupPromise) return _whisperWarmupPromise;

  const aiCfg = loadAiConfig();
  const engine = resolveWhisperEngineForPlatform(aiCfg.whisperEngine);
  const model = aiCfg.whisperModel || 'medium';
  const markerPath = getWhisperWarmupMarkerPath(engine, model);

  _whisperWarmupState.engine = engine;
  _whisperWarmupState.model = model;
  _whisperWarmupState.markerPath = markerPath;

  if (!force && fs.existsSync(markerPath)) {
    _whisperWarmupState.status = 'ready';
    _whisperWarmupState.lastError = null;
    return null;
  }

  _whisperWarmupState.status = 'running';
  _whisperWarmupState.startedAt = Date.now();
  _whisperWarmupState.finishedAt = null;
  _whisperWarmupState.lastError = null;

  _whisperWarmupPromise = (async () => {
    try {
      if (!(await ensureLyricsVenvExistsAsync())) {
        throw new Error('lyrics venv missing and bootstrap failed');
      }
      const pythonBin = fs.existsSync(LYRICS_PYTHON)
        ? LYRICS_PYTHON
        : getPythonBootstrapBin();

      const warmupScript = buildWhisperWarmupScript(engine, model);
      let warmup = await runCommandCaptureAsync(pythonBin, ['-c', warmupScript], {
        cwd: LYRICS_ENGINE_ROOT,
        env: { ...process.env },
      });
      if (!warmup.ok) {
        const warmupErr = warmup.error || warmup.stderr || warmup.stdout || '';
        if (installMissingAlignerDepsIfNeeded(warmupErr) || (await ensureWhisperEngineDepsAsync(engine))) {
          warmup = await runCommandCaptureAsync(pythonBin, ['-c', warmupScript], {
            cwd: LYRICS_ENGINE_ROOT,
            env: { ...process.env },
          });
        }
      }
      if (!warmup.ok) {
        throw new Error((warmup.error || warmup.stderr || warmup.stdout || 'warmup failed').trim().slice(0, 1200));
      }

      fs.mkdirSync(path.dirname(markerPath), { recursive: true });
      fs.writeFileSync(markerPath, JSON.stringify({ engine, model, at: Date.now() }, null, 2));
      _whisperWarmupState.status = 'ready';
      _whisperWarmupState.finishedAt = Date.now();
      _whisperWarmupState.lastError = null;
      console.log(`[WhisperWarmup] Ready: engine=${engine} model=${model}`);
    } catch (e) {
      _whisperWarmupState.status = 'failed';
      _whisperWarmupState.finishedAt = Date.now();
      _whisperWarmupState.lastError = e.message;
      console.warn(`[WhisperWarmup] Failed: ${e.message}`);
    } finally {
      _whisperWarmupPromise = null;
    }
  })();

  return _whisperWarmupPromise;
}

async function awaitWhisperRuntimeReady({ timeoutMs = 30 * 60 * 1000 } = {}) {
  const startedAt = Date.now();
  let retriedAfterFailure = false;
  while (Date.now() - startedAt < timeoutMs) {
    const warmup = _whisperWarmupState;
    if (warmup.status === 'ready' || warmup.status === 'skipped') {
      return { ok: true, status: warmup.status };
    }

    if (warmup.status === 'idle') {
      startWhisperWarmupIfNeeded();
    } else if (warmup.status === 'failed' && !retriedAfterFailure) {
      // Retry once on demand for user-triggered operations.
      retriedAfterFailure = true;
      startWhisperWarmupIfNeeded({ force: true });
    }

    if (_whisperWarmupPromise) {
      const remaining = Math.max(1, timeoutMs - (Date.now() - startedAt));
      const waited = await Promise.race([
        _whisperWarmupPromise.then(() => 'done').catch(() => 'done'),
        new Promise((resolve) => setTimeout(() => resolve('timeout'), remaining)),
      ]);
      if (waited === 'timeout') {
        return {
          ok: false,
          reason: 'warmup-timeout',
          status: _whisperWarmupState.status,
          error: _whisperWarmupState.lastError || null,
        };
      }
      continue;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return {
    ok: false,
    reason: 'warmup-timeout',
    status: _whisperWarmupState.status,
    error: _whisperWarmupState.lastError || null,
  };
}

function getPythonSetupStatus() {
  const bootstrapPython = getPythonBootstrapBin();
  const venvPython = LYRICS_PYTHON;
  const venvPip = process.platform === 'win32'
    ? path.join(LYRICS_VENV_DIR, 'Scripts', 'pip.exe')
    : path.join(LYRICS_VENV_DIR, 'bin', 'pip');

  const bootstrapCheck = runCommandCapture(bootstrapPython, ['--version']);
  const venvExists = fs.existsSync(venvPython);
  const pipExists = fs.existsSync(venvPip);
  const syncedlyricsCli = fs.existsSync(LYRICS_SYNCEDLYRICS);
  const whisperCli = fs.existsSync(LYRICS_WHISPER);

  let installedPkgs = [];
  if (pipExists) {
    const freeze = runCommandCapture(venvPip, ['freeze']);
    if (freeze.ok) {
      installedPkgs = freeze.stdout
        .split('\n')
        .map((line) => line.trim().split('==')[0].toLowerCase())
        .filter(Boolean);
    }
  }

  const hasPkg = (name) => installedPkgs.includes(String(name).toLowerCase());
  return {
    ok: bootstrapCheck.ok,
    bootstrapPython,
    pythonVersion: (bootstrapCheck.stdout || bootstrapCheck.stderr || '').trim(),
    venvExists,
    pipExists,
    syncedlyricsCli,
    whisperCli,
    packages: {
      syncedlyrics: hasPkg('syncedlyrics'),
      whisperCTranslate2: hasPkg('whisper-ctranslate2'),
      fasterWhisper: hasPkg('faster-whisper'),
      ctranslate2: hasPkg('ctranslate2'),
      pythonDotenv: hasPkg('python-dotenv'),
      rapidfuzz: hasPkg('rapidfuzz'),
      lyricsgenius: hasPkg('lyricsgenius'),
      openaiWhisper: hasPkg('openai-whisper'),
      imageioFfmpeg: hasPkg('imageio-ffmpeg'),
    },
  };
}

app.get('/api/setup/python/status', (_req, res) => {
  try {
    const status = getPythonSetupStatus();
    return res.json(status);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || 'Status check failed' });
  }
});

app.get('/api/setup/whisper-warmup/status', (_req, res) => {
  try {
    res.json({ ..._whisperWarmupState, running: _whisperWarmupState.status === 'running' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'Warmup status failed' });
  }
});

// ─── Unified Whisper Runtime Health (readiness contract for frontend) ────────
app.get('/api/setup/whisper-runtime/health', (_req, res) => {
  try {
    const pythonStatus = getPythonSetupStatus();
    const warmup = _whisperWarmupState;
    const aiCfg = loadAiConfig();
    const engine = warmup.engine || aiCfg.whisperEngine || 'faster';
    const model = warmup.model || aiCfg.whisperModel || 'medium';

    // Ready when: python OK + venv exists + warmup ready (or skipped in dev)
    const pythonReady = pythonStatus.ok && pythonStatus.venvExists;
    const warmupReady = warmup.status === 'ready' || warmup.status === 'skipped';
    const ready = pythonReady && warmupReady;

    let reason = null;
    if (!pythonStatus.ok) reason = 'python-not-found';
    else if (!pythonStatus.venvExists) reason = 'venv-missing';
    else if (warmup.status === 'running') reason = 'warmup-in-progress';
    else if (warmup.status === 'failed') reason = 'warmup-failed';
    else if (warmup.status === 'idle') reason = 'warmup-not-started';

    res.json({ ready, reason, engine, model, warmupStatus: warmup.status, pythonReady });
  } catch (e) {
    res.status(500).json({ ready: false, reason: 'internal-error', error: e.message });
  }
});

// ─── Unified Services Status (aligner, AI, Python) ────────────────────────────
app.get('/api/services/status', (_req, res) => {
  try {
    const pythonStatus = getPythonSetupStatus();
    const aiConfig = loadAiConfig();
    const alignerScript = resolveAlignerScriptPath();
    const alignerExists = fs.existsSync(alignerScript);

    // Test aligner.py with a quick --help or ping (won't actually run alignment)
    let alignerReady = false;
    let alignerError = null;
    if (alignerExists && pythonStatus.ok && pythonStatus.venvExists) {
      try {
        const test = runCommandCapture(LYRICS_PYTHON, [alignerScript, '--help']);
        alignerReady = test.ok;
        if (!test.ok) alignerError = test.stderr || test.error || 'Aligner test failed';
      } catch (e) {
        alignerError = e.message;
      }
    } else if (!alignerExists) {
      alignerError = 'aligner.py not found';
    } else if (!pythonStatus.ok) {
      alignerError = 'Python not available';
    } else if (!pythonStatus.venvExists) {
      alignerError = 'Python venv not created';
    }

    // AI readiness (OpenAI key configured)
    const aiConfigured = !!(aiConfig.openaiApiKey && aiConfig.openaiApiKey.length > 10);

    // Whisper readiness
    const whisperReady = pythonStatus.syncedlyricsCli || pythonStatus.whisperCli;

    res.json({
      python: {
        ready: pythonStatus.ok && pythonStatus.venvExists,
        version: pythonStatus.pythonVersion,
        venvExists: pythonStatus.venvExists,
        packages: pythonStatus.packages,
      },
      aligner: {
        ready: alignerReady,
        scriptPath: alignerScript,
        exists: alignerExists,
        error: alignerError,
      },
      whisper: {
        ready: whisperReady,
        engine: aiConfig.whisperEngine,
        model: aiConfig.whisperModel,
        warmupStatus: _whisperWarmupState.status,
      },
      ai: {
        configured: aiConfigured,
        provider: aiConfig.aiProvider,
        model: aiConfig.openaiModel,
      },
      lyricsProvider: aiConfig.lyricsProvider,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Aligner Ping (quick health check) ────────────────────────────────────────
app.get('/api/aligner/ping', (_req, res) => {
  try {
    const pythonStatus = getPythonSetupStatus();
    const alignerScript = resolveAlignerScriptPath();
    const alignerExists = fs.existsSync(alignerScript);

    if (!pythonStatus.ok) {
      return res.json({ ok: false, reason: 'python-not-found' });
    }
    if (!pythonStatus.venvExists) {
      return res.json({ ok: false, reason: 'venv-missing', needsSetup: true });
    }
    if (!alignerExists) {
      return res.json({ ok: false, reason: 'aligner-not-found' });
    }

    // Quick test - check if required packages are present
    const hasCriticalPkgs = pythonStatus.packages.rapidfuzz && pythonStatus.packages.syncedlyrics;
    if (!hasCriticalPkgs) {
      return res.json({ ok: false, reason: 'packages-missing', needsSetup: true, packages: pythonStatus.packages });
    }

    // Try running aligner with --help (fast, no actual processing)
    const test = runCommandCapture(LYRICS_PYTHON, [alignerScript, '--help']);
    if (!test.ok) {
      return res.json({ ok: false, reason: 'aligner-error', error: test.stderr || test.error });
    }

    return res.json({ ok: true });
  } catch (e) {
    return res.json({ ok: false, reason: 'internal-error', error: e.message });
  }
});

app.post('/api/setup/whisper-warmup/start', express.json(), (_req, res) => {
  try {
    startWhisperWarmupIfNeeded({ force: true });
    res.json({ ok: true, status: 'started' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'Warmup start failed' });
  }
});

app.post('/api/setup/python/install', express.json(), (_req, res) => {
  try {
    const bootstrapPython = getPythonBootstrapBin();
    const logs = [];

    // Create venv if missing
    if (!fs.existsSync(LYRICS_PYTHON)) {
      fs.mkdirSync(path.dirname(LYRICS_VENV_DIR), { recursive: true });
      const mkVenv = runCommandCapture(bootstrapPython, ['-m', 'venv', LYRICS_VENV_DIR]);
      logs.push(`[venv] ${mkVenv.ok ? 'ok' : 'fail'} ${mkVenv.stderr || mkVenv.stdout}`.trim());
      if (!mkVenv.ok) {
        return res.status(500).json({ ok: false, step: 'venv', logs, error: mkVenv.error || mkVenv.stderr || 'Failed to create venv' });
      }
    }

    const pipBin = process.platform === 'win32'
      ? path.join(LYRICS_VENV_DIR, 'Scripts', 'pip.exe')
      : path.join(LYRICS_VENV_DIR, 'bin', 'pip');

    const upgradePip = runCommandCapture(pipBin, ['install', '--upgrade', ...PY_SETUP_PACKAGES]);
    logs.push(`[pip] ${upgradePip.ok ? 'ok' : 'fail'} ${upgradePip.stderr || upgradePip.stdout}`.trim());
    if (!upgradePip.ok) {
      return res.status(500).json({ ok: false, step: 'pip', logs, error: upgradePip.error || upgradePip.stderr || 'Package install failed' });
    }

    const status = getPythonSetupStatus();
    return res.json({ ok: true, logs, status });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || 'Install failed' });
  }
});

// ─── STREAMING PYTHON INSTALL (with live progress) ──────────────────────────
app.get('/api/setup/python/install-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (type, data) => {
    res.write(`data: ${JSON.stringify({ type, ...data, ts: Date.now() })}\n\n`);
  };

  const bootstrapPython = getPythonBootstrapBin();

  // Step 1: Check Python availability
  send('step', { step: 'check-python', label: 'Checking Python installation...' });
  const pythonCheck = runCommandCapture(bootstrapPython, ['--version']);
  if (!pythonCheck.ok) {
    send('error', { message: 'Python not found. Please install Python 3.9+ and try again.' });
    send('done', { ok: false });
    res.end();
    return;
  }
  send('log', { text: `✓ Python found: ${(pythonCheck.stdout || pythonCheck.stderr).trim()}` });

  // Step 2: Create venv if needed
  if (!fs.existsSync(LYRICS_PYTHON)) {
    send('step', { step: 'create-venv', label: 'Creating Python virtual environment...' });
    try {
      fs.mkdirSync(path.dirname(LYRICS_VENV_DIR), { recursive: true });
    } catch (e) {
      send('error', { message: `Cannot create directory: ${e.message}` });
      send('done', { ok: false });
      res.end();
      return;
    }

    const venvProc = spawn(bootstrapPython, ['-m', 'venv', LYRICS_VENV_DIR]);
    venvProc.stdout.on('data', (d) => send('log', { text: d.toString() }));
    venvProc.stderr.on('data', (d) => send('log', { text: d.toString() }));

    venvProc.on('close', (code) => {
      if (code !== 0) {
        send('error', { message: 'Failed to create virtual environment' });
        send('done', { ok: false });
        res.end();
        return;
      }
      send('log', { text: '✓ Virtual environment created' });
      installPackages(res, send);
    });
  } else {
    send('log', { text: '✓ Virtual environment already exists' });
    installPackages(res, send);
  }
});

function installPackages(res, send) {
  const pipBin = process.platform === 'win32'
    ? path.join(LYRICS_VENV_DIR, 'Scripts', 'pip.exe')
    : path.join(LYRICS_VENV_DIR, 'bin', 'pip');

  if (!fs.existsSync(pipBin)) {
    send('error', { message: 'pip not found in virtual environment' });
    send('done', { ok: false });
    res.end();
    return;
  }

  // Install packages one by one for better progress reporting
  const packages = [...PY_SETUP_PACKAGES];
  let current = 0;

  const installNext = () => {
    if (current >= packages.length) {
      send('step', { step: 'verify', label: 'Verifying installation...' });
      const status = getPythonSetupStatus();
      send('log', { text: '✓ All packages installed successfully' });
      send('done', { ok: true, status });
      res.end();
      return;
    }

    const pkg = packages[current];
    const progress = Math.round(((current + 1) / packages.length) * 100);
    send('step', { step: 'install', label: `Installing ${pkg}...`, progress, current: current + 1, total: packages.length });

    const proc = spawn(pipBin, ['install', '--upgrade', pkg], {
      env: { ...process.env, PIP_PROGRESS_BAR: 'off' }
    });

    let output = '';
    proc.stdout.on('data', (d) => {
      output += d.toString();
      // Filter to important lines
      const lines = d.toString().split('\n').filter(l => l.trim());
      for (const line of lines) {
        if (line.includes('Downloading') || line.includes('Installing') || line.includes('Successfully')) {
          send('log', { text: line.trim() });
        }
      }
    });
    proc.stderr.on('data', (d) => {
      output += d.toString();
      const lines = d.toString().split('\n').filter(l => l.trim() && !l.includes('WARNING'));
      for (const line of lines) {
        send('log', { text: line.trim(), type: 'warn' });
      }
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        // Non-critical failure - log but continue
        send('log', { text: `⚠ ${pkg} may have issues (exit code ${code})`, type: 'warn' });
      } else {
        send('log', { text: `✓ ${pkg}` });
      }
      current++;
      installNext();
    });
  };

  installNext();
}

// ─── OLLAMA MODEL DISCOVERY ─────────────────────────────────────────────────

// ─── HF TRAINING PIPELINE ───────────────────────────────────────────────────
const TRAINING_MANIFEST_PATH = path.join(__dirname, 'lyrics-engine', 'training-manifest.json');

function loadTrainingManifest() {
  try { return JSON.parse(fs.readFileSync(TRAINING_MANIFEST_PATH, 'utf8')); } catch { return { tracks: [] }; }
}
function saveTrainingManifest(data) {
  fs.writeFileSync(TRAINING_MANIFEST_PATH, JSON.stringify(data, null, 2));
}

app.post('/api/training/mark-track', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'trackPath required' });
    const manifest = loadTrainingManifest();
    if (!manifest.tracks.includes(trackPath)) {
      manifest.tracks.push(trackPath);
      saveTrainingManifest(manifest);
    }
    console.log(`[Training] ✓ Marked track: ${path.basename(trackPath)} (${manifest.tracks.length} total)`);
    res.json({ ok: true, total: manifest.tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/training/start', express.json(), async (req, res) => {
  try {
    const manifest = loadTrainingManifest();
    if (!manifest.tracks.length) {
      return res.json({ ok: false, error: 'No tracks marked for training. Mark tracks first!' });
    }
    // Launch dataset builder + training in background
    const scriptPath = path.join(__dirname, 'lyrics-engine', 'hf_dataset_builder.py');
    const musicDir = path.dirname(manifest.tracks[0]); // Use first track's dir
    const proc = spawn(fs.existsSync(LYRICS_PYTHON) ? LYRICS_PYTHON : _pythonBin, [scriptPath, '--music_dir', musicDir, '--append'], {
      cwd: path.join(__dirname, 'lyrics-engine'),
      detached: true,
      stdio: 'ignore',
    });
    proc.unref();
    console.log(`[Training] 🚀 Dataset build started for ${manifest.tracks.length} tracks`);
    res.json({ ok: true, message: `Building dataset from ${manifest.tracks.length} tracks. Check HF repo when done.` });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/ollama/models', async (req, res) => {
  try {
    const config = loadAiConfig();
    const baseUrl = (config.openaiBaseUrl || 'http://localhost:11434').replace(/\/v1\/?$/, '');
    const ollamaUrl = baseUrl.includes('11434') ? baseUrl : 'http://localhost:11434';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(`${ollamaUrl}/api/tags`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
    const data = await response.json();
    const models = (data.models || []).map(m => ({
      name: m.name,
      size: m.size,
      family: m.details?.family || '',
      parameterSize: m.details?.parameter_size || '',
      quantization: m.details?.quantization_level || '',
    }));
    res.json({ ok: true, running: true, models });
  } catch (err) {
    res.json({ ok: true, running: false, models: [], error: err.message });
  }
});

// ─── CHROMIC EDITOR: METADATA WRITE-BACK API ────────────────────────────────

// Rename track metadata (title, artist, track number)
app.patch('/api/metadata/rename', express.json(), (req, res) => {
  try {
    const { trackPath, field, value } = req.body;
    console.log(`[Rename] Request: field=${field}, trackPath=${trackPath?.slice(0, 80)}, value=${value?.slice?.(0, 50)}`);
    if (!trackPath || !field) return res.status(400).json({ error: 'Missing trackPath or field' });

    const allowedFields = { title: 'title', artist: 'artist', album: 'album', trackNum: 'disc' };
    const dbField = allowedFields[field];
    if (!dbField && field !== 'trackNum') return res.status(400).json({ error: 'Invalid field' });

    // Update SQLite
    if (field === 'trackNum') {
      // Track number is not a direct column — we store it in path-based sorting
      // But we can update the filename on disk
      const fullPath = path.join(MEDIA_ROOT, trackPath);
      if (fs.existsSync(fullPath)) {
        const dir = path.dirname(fullPath);
        const ext = path.extname(fullPath);
        const baseName = path.basename(fullPath, ext);
        // Replace leading number: "01 - Title" → "05 - Title"
        const newBase = baseName.replace(/^\d+/, value.toString().padStart(2, '0'));
        const newPath = path.join(dir, newBase + ext);
        if (newPath !== fullPath && !fs.existsSync(newPath)) {
          fs.renameSync(fullPath, newPath);
          // Also rename sidecars
          for (const suf of ['.lrc', '.lyrics.json']) {
            const old = fullPath.replace(ext, suf);
            const nw = newPath.replace(ext, suf);
            if (fs.existsSync(old)) fs.renameSync(old, nw);
          }
          // Update DB path
          const relOld = trackPath;
          const relNew = path.relative(MEDIA_ROOT, newPath);
          tracksDb.prepare('UPDATE tracks SET path = ? WHERE path = ?').run(relNew, relOld);
        }
      }
    } else {
      tracksDb.prepare(`UPDATE tracks SET ${dbField} = ? WHERE path = ?`).run(value, trackPath);
    }

    console.log(`[Rename] ✅ ${field} → "${value}" for ${path.basename(trackPath)}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('[Rename] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/metadata/update', express.json({ limit: '2mb' }), (req, res) => {
  try {
    const { trackPath, lines } = req.body;
    if (!trackPath || !Array.isArray(lines)) {
      return res.status(400).json({ error: 'Missing trackPath or lines array' });
    }

    const fullPath = path.join(MEDIA_ROOT, trackPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Track file not found' });
    }

    // Write to .lyrics.json sidecar (same format as aligner.py output)
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');

    // Convert ChromicEditor format to sidecar format
    const sidecarData = lines.map((entry, i) => ({
      time: entry.startSec || 0,
      end: entry.endSec || 0,
      text: entry.text || '',
      words: (entry.words || []).map((w) => {
        const word = { text: w.text || '', start: w.start || 0, end: w.end || 0 };
        if (w.style && w.style !== 'normal') word.style = w.style;
        if (w.stretch) word.stretch = true;
        return word;
      }),
    }));

    fs.writeFileSync(sidecarPath, JSON.stringify(sidecarData, null, 2));

    // Also update the SQLite DB if the track exists there
    try {
      const relativePath = trackPath;
      const stmtUpdate = tracksDb.prepare('UPDATE tracks SET lyrics = ?, lyrics_type = ? WHERE path = ?');
      stmtUpdate.run(JSON.stringify(sidecarData), 'synced', relativePath);
    } catch (_) { /* DB update is best-effort */ }

    console.log(`[ChromicEditor] ✓ Saved ${lines.length} lines to ${path.basename(sidecarPath)}`);
    res.json({ ok: true, savedAt: new Date().toISOString(), lineCount: lines.length });
  } catch (err) {
    console.error('[ChromicEditor] Write-back error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── WHISPER ENHANCE STATUS (polling endpoint) ──────────────────────────────
app.post('/api/lyrics/enhance-status', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const info = _whisperEnhancing.get(trackPath);
    if (!info) {
      // If transient in-memory state is gone, infer terminal status from DB.
      try {
        const row = tracksDb.prepare('SELECT lyrics, lyrics_type FROM tracks WHERE path = ?').get(trackPath);
        if (row?.lyrics && row.lyrics_type === 'synced') return res.json({ status: 'done' });
        if (row?.lyrics_type === 'not_found') return res.json({ status: 'failed', reason: 'not_found' });
      } catch (_) { /* ignore DB inference errors */ }
      return res.json({ status: 'none' });
    }
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Whisper Readiness Gate (middleware helper) ──────────────────────────────
async function requireWhisperReady(req, res, next) {
  try {
    const ready = await awaitWhisperRuntimeReady();
    if (ready.ok) return next();
    return res.status(503).json({
      error: 'Whisper runtime not ready',
      reason: ready.reason || 'whisper-not-ready',
      warmupStatus: ready.status || _whisperWarmupState.status,
      warmupError: ready.error || _whisperWarmupState.lastError || null,
    });
  } catch (e) {
    return res.status(503).json({ error: 'Whisper runtime not ready', reason: 'warmup-exception', warmupError: e.message || String(e) });
  }
}

// ─── ENRICH TRACK (trigger lyrics fetch + Whisper for single track) ──────────
app.post('/api/lyrics/enrich-track', express.json(), requireWhisperReady, async (req, res) => {
  try {
    const { trackPath, force } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'File not found' });

    // ── Force regenerate: backup & remove existing .lyrics.json so aligner starts fresh ──
    if (force) {
      const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      if (fs.existsSync(sidecarPath)) {
        try {
          const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 23);
          const backupDir = path.join(path.dirname(sidecarPath), '.chromic-backups');
          if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
          const backupName = path.basename(sidecarPath).replace(/\.lyrics\.json$/, `.lyrics.backup_${ts}.json`);
          const backupPath = path.join(backupDir, backupName);
          fs.copyFileSync(sidecarPath, backupPath);
          console.log(`[LyricsEngine] 💾 Force-regenerate: backed up sidecar → ${backupName}`);
        } catch (be) {
          console.warn(`[LyricsEngine] Failed to backup sidecar before regenerate: ${be.message}`);
        }
        try {
          fs.unlinkSync(sidecarPath);
          console.log(`[LyricsEngine] 🗑️ Force-regenerate: removed old sidecar so aligner starts fresh`);
        } catch (re) {
          console.warn(`[LyricsEngine] Failed to remove old sidecar: ${re.message}`);
        }
      }
      // Also clear any cached DB lyrics so metadata re-reads from source
      try {
        const stmtClear = tracksDb.prepare('UPDATE tracks SET lyrics=NULL, lyrics_type=NULL WHERE path=@path');
        stmtClear.run({ path: trackPath });
      } catch (_) {}
      // Clear whisper enhancing status so it doesn't think it's already done
      _whisperEnhancing.delete(trackPath);
    }

    // Extract metadata for artist/title
    let artist = '', title = '', album = '';
    try {
      const meta = await extractTrackMetadata(fullPath);
      artist = meta?.artist || '';
      title = meta?.title || path.basename(trackPath, path.extname(trackPath));
      album = meta?.album || '';
    } catch (_) {
      title = path.basename(trackPath, path.extname(trackPath));
    }
    if (!force && lyricsCurrentPath === trackPath) {
      return res.json({ ok: true, queued: false, status: 'running' });
    }
    if (!force && LYRICS_QUEUE.some(q => q.path === trackPath)) {
      return res.json({ ok: true, queued: false, status: 'queued' });
    }
    enqueueLyricsFetch(trackPath, artist, title, album, !!force);
    res.json({ ok: true, queued: true, status: 'queued' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ENRICH ALBUM STATUS (check how many tracks need sync) ──────────────────
app.post('/api/lyrics/enrich-album-status', express.json(), (req, res) => {
  try {
    const { tracks } = req.body;
    if (!Array.isArray(tracks) || !tracks.length) {
      return res.status(400).json({ error: 'Missing tracks array' });
    }
    let needsSync = 0;
    for (const rawTrackPath of tracks) {
      const trackPath = decodeURIComponent(rawTrackPath);
      let fullPath = path.join(MEDIA_ROOT, trackPath);
      if (!fs.existsSync(fullPath)) fullPath = path.join(MEDIA_ROOT, `music/${trackPath}`);
      if (!fs.existsSync(fullPath)) { needsSync++; continue; }
      const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      if (!fs.existsSync(sidecarPath)) { needsSync++; continue; }
      try {
        const data = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
        const lines = Array.isArray(data) ? data : [];
        if (lines.length === 0) needsSync++;
      } catch (_) { needsSync++; }
    }
    res.json({ ok: true, needsSync, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ENRICH ALBUM (batch enqueue lyrics fetch for all tracks) ────────────────
app.post('/api/lyrics/enrich-album', express.json(), requireWhisperReady, async (req, res) => {
  try {
    const { tracks, force } = req.body;
    if (!Array.isArray(tracks) || !tracks.length) {
      return res.status(400).json({ error: 'Missing tracks array' });
    }
    let queued = 0;
    for (const rawTrackPath of tracks) {
      const trackPath = decodeURIComponent(rawTrackPath);
      let fullPath = resolveTrackFullPath(trackPath);
      if (!fs.existsSync(fullPath)) {
        fullPath = resolveTrackFullPath(`music/${trackPath}`);
      }
      if (!fs.existsSync(fullPath)) continue;

      // Skip if already has lyrics and not forcing
      if (!force) {
        const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
        if (fs.existsSync(sidecarPath)) {
          try {
            const data = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
            if ((Array.isArray(data) ? data : []).length > 0) continue;
          } catch (_) { /* treat as needs sync */ }
        }
      }

      let artist = '', title = '', album = '';
      try {
        const meta = await extractTrackMetadata(fullPath);
        artist = meta?.artist || '';
        title = meta?.title || path.basename(trackPath, path.extname(trackPath));
        album = meta?.album || '';
      } catch (_) {
        title = path.basename(trackPath, path.extname(trackPath));
      }
      enqueueLyricsFetch(trackPath, artist, title, album);
      queued++;
    }
    res.json({ ok: true, queued, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CHECK ASSETS (single track — synced, words, translation, edited) ────────
app.post('/api/lyrics/check-assets', express.json(), (req, res) => {
  try {
    const { trackPath, targetLang = 'uk' } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    let fullPath = resolveTrackFullPath(trackPath);
    if (!fs.existsSync(fullPath)) fullPath = resolveTrackFullPath(`music/${trackPath}`);
    const result = _checkTrackAssets(fullPath, targetLang);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CHECK ASSETS ALBUM (batch — per-track asset statuses) ───────────────────
app.post('/api/lyrics/check-assets-album', express.json(), (req, res) => {
  try {
    const { tracks, targetLang = 'uk' } = req.body;
    if (!Array.isArray(tracks) || !tracks.length) {
      return res.status(400).json({ error: 'Missing tracks array' });
    }
    const statuses = {};
    for (const rawTrackPath of tracks) {
      const trackPath = decodeURIComponent(rawTrackPath);
      let fullPath = resolveTrackFullPath(trackPath);
      if (!fs.existsSync(fullPath)) fullPath = resolveTrackFullPath(`music/${trackPath}`);
      statuses[trackPath] = _checkTrackAssets(fullPath, targetLang);
    }
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Helper: check what assets exist for a single track
 */
function _checkTrackAssets(fullPath, targetLang = 'uk') {
  const result = { hasSynced: false, syncedWords: false, hasTranslation: false, userEdited: false };
  if (!fs.existsSync(fullPath)) return result;
  const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
  if (fs.existsSync(sidecarPath)) {
    try {
      const raw = fs.readFileSync(sidecarPath, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        result.hasSynced = true;
        result.syncedWords = data.some(l => l.words && l.words.length > 0);
        if (data[0]?._userEdited) result.userEdited = true;
      } else if (data && !Array.isArray(data) && data.userEdited) {
        result.userEdited = true;
        if (data.lines && data.lines.length > 0) {
          result.hasSynced = true;
          result.syncedWords = data.lines.some(l => l.words && l.words.length > 0);
        }
      }
    } catch (_) {}
  }
  const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${targetLang}.json`);
  if (fs.existsSync(translationPath)) {
    result.hasTranslation = true;
  }
  return result;
}

// ─── LYRICS REFRESH (re-fetch from sidecar after enhancement) ───────────────

// ─── WHISPER CANCEL ──────────────────────────────────────────────────────────
app.post('/api/lyrics/whisper-cancel', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    // Kill the whisper process if running
    const fullPath = path.join(MEDIA_ROOT, trackPath);
    const proc = _whisperProcesses.get(fullPath);
    if (proc) {
      proc.kill('SIGTERM');
      _whisperProcesses.delete(fullPath);
      console.log(`[LyricsEngine] ❌ Whisper cancelled for "${path.basename(trackPath)}"`);
    }
    // Also remove from queue
    const queueIdx = LYRICS_QUEUE.findIndex(q => q.path === trackPath);
    if (queueIdx >= 0) LYRICS_QUEUE.splice(queueIdx, 1);
    // Mark as cancelled
    _whisperEnhancing.set(trackPath, { status: 'failed', reason: 'cancelled' });
    setTimeout(() => _whisperEnhancing.delete(trackPath), 30000);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lyrics/refresh', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');

    let lyrics = null;

    // Try sidecar first
    if (fs.existsSync(sidecarPath)) {
      try {
        lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
      } catch (e) { /* sidecar unreadable, fall through to DB */ }
    }

    // Fallback: read from DB if sidecar unavailable
    if (!lyrics) {
      try {
        const row = tracksDb.prepare('SELECT lyrics FROM tracks WHERE path = ?').get(trackPath);
        if (row?.lyrics) {
          lyrics = JSON.parse(row.lyrics);
        }
      } catch (e) { /* DB read failed */ }
    }

    if (!lyrics) return res.status(404).json({ error: 'No lyrics available' });

    // Normalize: handle both {source, lines} wrapper and plain array
    const linesArray = Array.isArray(lyrics) ? lyrics : (lyrics.lines || lyrics);
    const hasWords = Array.isArray(linesArray) && linesArray.some(l => Array.isArray(l.words) && l.words.length > 0);
    console.log(`[Lyrics] Refresh: ${Array.isArray(linesArray) ? linesArray.length : '?'} lines, hasWords=${hasWords} for ${path.basename(trackPath)}`);
    res.json({ lyrics: linesArray, hasWords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── LYRICS TRANSLATION (Album Batch) ───────────────────────────────────────

app.post('/api/lyrics/translate-album-status', express.json(), (req, res) => {
  try {
    const { tracks, targetLang = 'uk' } = req.body;
    if (!Array.isArray(tracks) || !tracks.length) {
      return res.status(400).json({ error: 'Missing tracks array' });
    }
    let needsTranslation = 0;
    for (const rawTrackPath of tracks) {
      const trackPath = decodeURIComponent(rawTrackPath);
      // Use resolveTrackFullPath to handle both local and linked library paths
      let fullPath = resolveTrackFullPath(trackPath);
      if (!fs.existsSync(fullPath)) fullPath = resolveTrackFullPath(`music/${trackPath}`);
      if (!fs.existsSync(fullPath)) { needsTranslation++; continue; }
      const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${targetLang}.json`);
      if (!fs.existsSync(translationPath)) needsTranslation++;
    }
    res.json({ ok: true, needsTranslation, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lyrics/translate-album', express.json({ limit: '2mb' }), async (req, res) => {
  try {
    const { tracks, targetLang = 'uk', force } = req.body;
    if (!Array.isArray(tracks) || !tracks.length) {
      return res.status(400).json({ error: 'Missing tracks array' });
    }
    let translated = 0;
    let skipped = 0;
    let errors = 0;
    for (const rawTrackPath of tracks) {
      const trackPath = decodeURIComponent(rawTrackPath);
      // Use resolveTrackFullPath to handle both local and linked library paths
      let fullPath = resolveTrackFullPath(trackPath);
      if (!fs.existsSync(fullPath)) fullPath = resolveTrackFullPath(`music/${trackPath}`);
      if (!fs.existsSync(fullPath)) {
        console.warn(`[Lyrics Translation] Track file not found: "${trackPath}"`);
        continue;
      }
      const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${targetLang}.json`);
      if (!force && fs.existsSync(translationPath)) {
        skipped++;
        translated++;
        continue;
      }
      const lyricsPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      if (!fs.existsSync(lyricsPath)) {
        console.warn(`[Lyrics Translation] No lyrics sidecar for: "${path.basename(trackPath)}"`);
        continue;
      }
      const lyrics = JSON.parse(fs.readFileSync(lyricsPath, 'utf-8'));
      const lines = (Array.isArray(lyrics) ? lyrics : []).filter(l => l.text).map(l => l.text);
      if (!lines.length) {
        console.warn(`[Lyrics Translation] No text lines in lyrics for: "${path.basename(trackPath)}"`);
        continue;
      }
      console.log(`[Lyrics Translation] Translating ${lines.length} lines for: "${path.basename(trackPath)}"...`);
      try {
        const CHUNK_SIZE = 15;
        const allTranslations = [];
        for (let ci = 0; ci < lines.length; ci += CHUNK_SIZE) {
          const chunk = lines.slice(ci, ci + CHUNK_SIZE);
          const langNames = { uk: 'Ukrainian', de: 'German', fr: 'French', es: 'Spanish', it: 'Italian', pt: 'Portuguese', pl: 'Polish', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ar: 'Arabic', tr: 'Turkish', nl: 'Dutch', sv: 'Swedish', cs: 'Czech', ro: 'Romanian', hu: 'Hungarian', el: 'Greek', he: 'Hebrew', hi: 'Hindi' };
          const langFull = langNames[targetLang] || targetLang;
          const prompt = `Translate these song lyrics to ${langFull}. This is music — song text from a track. Translate every line strictly into ${langFull} language. Do NOT leave any English words unless they are proper nouns (artist names, place names). Return ONLY a JSON array of ${chunk.length} translated strings in the same order. No explanations.\n\n${JSON.stringify(chunk)}`;
          const content = await callAiProvider(prompt, {
            systemPrompt: `You are a professional song lyrics translator. You translate music text strictly into ${langFull}. Every word must be in ${langFull} — never leave English words. Preserve poetic meaning, emotional tone, and rhythm. Return only a JSON array of translated strings.`,
            temperature: 0.3,
          });
          const jsonMatch = content.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            allTranslations.push(...JSON.parse(jsonMatch[0]));
          } else {
            allTranslations.push(...chunk);
            console.warn(`[Lyrics Translation] ⚠️ Chunk ${ci}-${ci + chunk.length} parse failed, keeping originals`);
          }
        }
        if (allTranslations.length > 0) {
          createBackup(translationPath);
          fs.writeFileSync(translationPath, JSON.stringify(allTranslations, null, 2));
          console.log(`[Lyrics Translation] ✅ Translated ${allTranslations.length} lines for: "${path.basename(trackPath)}"`);
          translated++;
        } else {
          errors++;
        }
      } catch (e) {
        console.warn(`[Lyrics Translation] AI call failed for ${path.basename(trackPath)}:`, e.message);
        errors++;
      }
    }
    const remaining = tracks.length - translated;
    console.log(`[Lyrics Translation] 🌐 Album done: ${translated}/${tracks.length} translated, ${skipped} cached, ${errors} errors`);
    res.json({ ok: true, translated, skipped, total: tracks.length, remaining, errors });
  } catch (err) {
    console.error('[Lyrics Album Translation] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── LYRICS TRANSLATION (Background async — no long HTTP connections) ───────
const _translationJobs = new Map(); // trackPath+lang → { status, progress, total, translations, error, cancelled }

// Cancel a running translation job
app.post('/api/lyrics/translate-cancel', express.json(), (req, res) => {
  const { trackPath, targetLang = 'uk' } = req.body;
  const jobKey = `${trackPath}:${targetLang}`;
  const job = _translationJobs.get(jobKey);
  if (job && job.status === 'running') {
    job.cancelled = true;
    job.status = 'cancelled';
    if (job.abort) job.abort.abort();
    _translationJobs.delete(jobKey);
    console.log(`[Translation] ❌ Cancelled job: ${path.basename(trackPath)} → ${targetLang}`);
    // Tell Ollama to unload the model immediately so it frees VRAM
    _unloadOllamaModel();
    return res.json({ status: 'cancelled' });
  }
  // Also delete completed/errored jobs
  _translationJobs.delete(jobKey);
  res.json({ status: 'ok' });
});

app.post('/api/lyrics/translate', express.json({ limit: '2mb' }), async (req, res) => {
  try {
    const { trackPath, targetLang = 'uk', lines, force } = req.body;
    if (!trackPath || !Array.isArray(lines) || !lines.length) {
      return res.status(400).json({ error: 'Missing trackPath or lines' });
    }

    // Use resolveTrackFullPath to handle both local and linked library paths
    const fullPath = resolveTrackFullPath(trackPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Track not found' });
    }

    // Check if cached translation exists
    const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${targetLang}.json`);
    if (!force && fs.existsSync(translationPath)) {
      const cached = JSON.parse(fs.readFileSync(translationPath, 'utf-8'));
      // Validate: cached line count should roughly match request (±5 tolerance for vocal_cue filtering differences)
      const requestLineCount = lines.filter(l => l.text && l.text.trim()).length;
      if (Array.isArray(cached) && Math.abs(cached.length - requestLineCount) <= 5) {
        return res.json({ translations: cached, cached: true });
      }
      // Stale cache — line count mismatch, delete and re-translate
      console.warn(`[Translation] ⚠️ Stale cache: ${path.basename(trackPath)} has ${cached.length} cached lines but request has ${requestLineCount} — re-translating`);
      createBackup(translationPath);
      try { fs.unlinkSync(translationPath); } catch {}
    }

    const jobKey = `${trackPath}:${targetLang}`;

    // If job already running, return current status
    const existing = _translationJobs.get(jobKey);
    if (existing && existing.status === 'running') {
      return res.json({ status: 'running', progress: existing.progress, total: existing.total });
    }

    // If job completed, return result
    if (existing && existing.status === 'done') {
      _translationJobs.delete(jobKey);
      return res.json({ translations: existing.translations, cached: false });
    }

    const texts = lines.map((l) => l.text || '').filter(Boolean);
    if (!texts.length) return res.status(400).json({ error: 'No text lines' });

    const langNames = { uk: 'Ukrainian', de: 'German', fr: 'French', es: 'Spanish', it: 'Italian', pt: 'Portuguese', pl: 'Polish', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ar: 'Arabic', tr: 'Turkish', nl: 'Dutch', sv: 'Swedish', cs: 'Czech', ro: 'Romanian', hu: 'Hungarian', el: 'Greek', he: 'Hebrew', hi: 'Hindi' };
    const langFull = langNames[targetLang] || targetLang;

    // Extract song metadata from path for context
    // Supports formats like "music/Artist/Album/Title.ext" or "music/NN - Artist - Title.ext"
    const baseName = path.basename(trackPath).replace(/\.[^/.]+$/, '');
    const pathParts = trackPath.replace(/\.[^/.]+$/, '').split('/').filter(Boolean);
    let songTitle = baseName, songArtist = '';
    // Try "NN - Artist - Title" format in filename
    const dashParts = baseName.split(/\s*-\s*/);
    if (dashParts.length >= 3) {
      // e.g. "14 - Lana Del Rey - Lolita"
      songArtist = dashParts[1].trim();
      songTitle = dashParts.slice(2).join(' - ').trim();
    } else if (dashParts.length === 2) {
      // e.g. "Artist - Title"
      songArtist = dashParts[0].trim();
      songTitle = dashParts[1].trim();
    } else if (pathParts.length >= 3) {
      // Folder structure: music/Artist/Album/Title
      songArtist = pathParts[pathParts.length - 3].replace(/[-_]/g, ' ');
      songTitle = pathParts[pathParts.length - 1].replace(/[-_]/g, ' ');
    }
    // Remove leading track numbers from title
    songTitle = songTitle.replace(/^\d+[\s.)\]]*/, '').trim() || songTitle;
    const songContext = songArtist ? `"${songTitle}" by ${songArtist}` : `"${songTitle}"`;

    const CHUNK_SIZE = 15;
    const totalChunks = Math.ceil(texts.length / CHUNK_SIZE);

    // Build full lyrics preview for context (truncated to avoid huge prompts)
    const fullLyricsPreview = texts.join('\n').slice(0, 1500);

    // Detect if using TranslateGemma model (needs specific prompt format)
    const currentModel = loadAiConfig().ollamaModel || '';
    const isTranslateGemma = currentModel.toLowerCase().includes('translategemma');

    // Language codes for TranslateGemma prompt format
    const langCodes = { uk: 'uk', de: 'de', fr: 'fr', es: 'es', it: 'it', pt: 'pt', pl: 'pl', ja: 'ja', ko: 'ko', zh: 'zh-Hans', ar: 'ar', tr: 'tr', nl: 'nl', sv: 'sv', cs: 'cs', ro: 'ro', hu: 'hu', el: 'el', he: 'he', hi: 'hi', ru: 'ru', en: 'en' };
    const sourceLangCode = 'en'; // assume source is English
    const sourceLangFull = 'English';
    const targetLangCode = langCodes[targetLang] || targetLang;

    // Start background job
    const jobAbort = new AbortController();
    const job = { status: 'running', progress: 0, total: totalChunks, translations: [], error: null, cancelled: false, abort: jobAbort };
    _translationJobs.set(jobKey, job);

    console.log(`[Translation] Starting background translation: ${texts.length} lines → ${langFull} (${targetLang}), ${totalChunks} chunks, song: ${songContext}, model: ${currentModel}, isTranslateGemma: ${isTranslateGemma}`);
    console.log(`[Translation] First 3 input lines: ${texts.slice(0, 3).map(l => `"${l}"`).join(' | ')}`);

    // Return immediately — client will poll
    res.json({ status: 'running', progress: 0, total: totalChunks });

    // Run translation in background
    (async () => {
      try {
        for (let ci = 0; ci < texts.length; ci += CHUNK_SIZE) {
          // Check if cancelled before each chunk
          if (job.cancelled) {
            console.log(`[Translation] ⏹ Job cancelled, stopping at chunk ${ci / CHUNK_SIZE + 1}/${totalChunks}`);
            return;
          }

          const chunkIdx = ci / CHUNK_SIZE;
          const chunk = texts.slice(ci, ci + CHUNK_SIZE);

          let prompt, systemPrompt;

          if (isTranslateGemma) {
            // TranslateGemma official prompt format — feed lyrics as numbered lines
            // so we can parse numbered output back
            const numberedLines = chunk.map((line, i) => `${i + 1}. ${line}`).join('\n');
            prompt = `You are a professional ${sourceLangFull} (${sourceLangCode}) to ${langFull} (${targetLangCode}) translator. Your goal is to accurately convey the meaning and nuances of the original ${sourceLangFull} text while adhering to ${langFull} grammar, vocabulary, and cultural sensitivities.
Produce only the ${langFull} translation, without any additional explanations or commentary. Please translate the following ${sourceLangFull} text into ${langFull}:


${numberedLines}`;
            systemPrompt = undefined; // TranslateGemma expects no system prompt
          } else {
            // Generic AI model prompt
            prompt = `You are translating the song ${songContext} into ${langFull}.

FULL SONG LYRICS (for context — do NOT translate all, only the numbered lines below):
---
${fullLyricsPreview}
---

Translate ONLY these ${chunk.length} lines into ${langFull}. These are lines ${ci + 1}–${ci + chunk.length} of the song.

Rules:
- This is a SONG — preserve the poetic feel, emotion, metaphors, and rhythm
- Translate the MEANING, not word-by-word — adapt idioms and slang naturally
- Keep EXACTLY ${chunk.length} lines — one translated line per original line, same order
- Every word MUST be in ${langFull} (except proper nouns: artist names, place names)
- Keep emotional intensity: if the original is raw/passionate/sad, the translation must feel the same
- If a line is a vocal sound (oh, ah, yeah, la-la) keep it as-is
- Return ONLY a JSON array of ${chunk.length} strings. No explanation, no markdown.

Lines to translate:
${JSON.stringify(chunk)}`;
            systemPrompt = `You are a professional song lyrics translator specializing in ${langFull}. You deeply understand music, poetry, and cultural context. You translate lyrics so they sound natural and emotionally authentic in ${langFull} — as if the song was originally written in that language. You always return only a JSON array of translated strings.`;
          }

          console.log(`[Translation] Chunk ${chunkIdx + 1}/${totalChunks} (${chunk.length} lines)...`);
          const startTime = Date.now();
          const content = await callAiProvider(prompt, {
            systemPrompt,
            temperature: 0.3,
            signal: jobAbort.signal,
          });
          console.log(`[Translation] Chunk ${chunkIdx + 1}/${totalChunks} done in ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

          // Check if cancelled after AI call
          if (job.cancelled) {
            console.log(`[Translation] ⏹ Job cancelled after chunk ${chunkIdx + 1}/${totalChunks}`);
            return;
          }

          let parsed;
          if (isTranslateGemma) {
            // Parse numbered lines output: "1. translated line\n2. translated line\n..."
            // or plain lines if no numbers
            const outputLines = content.trim().split('\n').filter(l => l.trim());
            parsed = outputLines.map(l => l.replace(/^\d+\.\s*/, '').trim());
            // Ensure we have the right count
            if (parsed.length !== chunk.length) {
              console.warn(`[Translation] ⚠️ TranslateGemma returned ${parsed.length} lines, expected ${chunk.length}. Raw:\n${content.slice(0, 500)}`);
              // Pad or trim to match
              while (parsed.length < chunk.length) parsed.push(chunk[parsed.length]);
              parsed = parsed.slice(0, chunk.length);
            }
            job.translations.push(...parsed);
            console.log(`[Translation] Chunk ${chunkIdx + 1} output (first 2): ${parsed.slice(0, 2).map(l => `"${l}"`).join(' | ')}`);
          } else {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
              parsed = JSON.parse(jsonMatch[0]);
              job.translations.push(...parsed);
              console.log(`[Translation] Chunk ${chunkIdx + 1} output (first 2): ${parsed.slice(0, 2).map(l => `"${l}"`).join(' | ')}`);
            } else {
              job.translations.push(...chunk);
              console.warn(`[Translation] ⚠️ Chunk ${chunkIdx + 1} parse failed, keeping originals. Raw response: ${content.slice(0, 200)}`);
            }
          }
          job.progress = chunkIdx + 1;
        }
        // Save to cache — validate trackPath matches before writing
        console.log(`[Translation] 💾 Saving ${job.translations.length} lines to: ${translationPath}`);
        console.log(`[Translation] 💾 First translation: "${(job.translations[0] || '').substring(0, 60)}"`);
        createBackup(translationPath);
        fs.writeFileSync(translationPath, JSON.stringify(job.translations, null, 2));
        job.status = 'done';
        console.log(`[Translation] ✅ Done: ${job.translations.length} lines to ${langFull} (${targetLang}) for ${path.basename(trackPath)}`);
      } catch (err) {
        if (job.cancelled || err.name === 'AbortError' || err.message === 'Aborted') {
          console.log(`[Translation] ⏹ Job aborted mid-request for ${path.basename(trackPath)}`);
        } else {
          console.error('[Translation] ❌ Background error:', err.message);
          job.status = 'error';
          job.error = err.message;
        }
      }
    })();
  } catch (err) {
    console.error('[Translation] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Poll translation status
app.post('/api/lyrics/translate-status', express.json(), (req, res) => {
  const { trackPath, targetLang = 'uk' } = req.body;
  const jobKey = `${trackPath}:${targetLang}`;
  const job = _translationJobs.get(jobKey);
  if (!job) {
    // Check if cached file exists — use resolveTrackFullPath for linked library paths
    const fullPath = resolveTrackFullPath(trackPath);
    const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${targetLang}.json`);
    if (fs.existsSync(translationPath)) {
      const cached = JSON.parse(fs.readFileSync(translationPath, 'utf-8'));
      return res.json({ status: 'done', translations: cached });
    }
    return res.json({ status: 'none' });
  }
  if (job.status === 'done') {
    _translationJobs.delete(jobKey);
    return res.json({ status: 'done', translations: job.translations });
  }
  if (job.status === 'error') {
    _translationJobs.delete(jobKey);
    return res.json({ status: 'error', error: job.error });
  }
  res.json({ status: 'running', progress: job.progress, total: job.total });
});

// ─── GENIUS-STYLE CONTEXT TOOLTIP ───────────────────────────────────────────
app.post('/api/lyrics/explain-word', express.json(), async (req, res) => {
  try {
    const { word, lineText, songTitle, artist } = req.body;
    if (!word) return res.status(400).json({ error: 'Missing word' });

    const prompt = `Explain the meaning of the lyric "${word}" in the context of the line "${lineText || word}" from the song "${songTitle || 'Unknown'}" by "${artist || 'Unknown'}". Keep it under 2 sentences. Be insightful and culturally aware.`;
    const content = await callAiProvider(prompt, {
      systemPrompt: 'You are a music critic and lyrics analyst. Give concise, insightful explanations of lyric meanings.',
      temperature: 0.5,
    });

    res.json({ explanation: content.trim() });
  } catch (err) {
    console.error('[Explain Word] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── AI SENTIMENT COLOR EXTRACTION ──────────────────────────────────────────
app.post('/api/lyrics/sentiment', express.json({ limit: '2mb' }), async (req, res) => {
  try {
    const { lines, songTitle, artist } = req.body;
    if (!Array.isArray(lines) || !lines.length) {
      return res.status(400).json({ error: 'Missing lines' });
    }

    const sampleLines = lines.slice(0, 20).map(l => l.text || l).filter(Boolean).join('\n');
    const prompt = `Analyze the sentiment/mood of these song lyrics from "${songTitle || 'Unknown'}" by "${artist || 'Unknown'}":\n\n${sampleLines}\n\nReturn ONLY a valid JSON object: {"mood": "one-word mood", "color": "#hexcode", "colors": ["#hex1", "#hex2", "#hex3"]}. Choose colors that represent the mood (e.g., sad=blue, angry=red, happy=yellow/orange, melancholy=purple, peaceful=green).`;

    const content = await callAiProvider(prompt, {
      systemPrompt: 'You are a music mood analyst. Return only valid JSON with mood and color data.',
      temperature: 0.4,
    });

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ error: 'Failed to parse sentiment response' });

    const sentiment = JSON.parse(jsonMatch[0]);
    res.json(sentiment);
  } catch (err) {
    console.error('[Sentiment] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── SAVE TRANSLATION EDITS ────────────────────────────────────────────────
app.patch('/api/lyrics/translation/save', express.json({ limit: '2mb' }), async (req, res) => {
  try {
    const { trackPath, lang, translations } = req.body;
    if (!trackPath || !lang || !Array.isArray(translations)) {
      return res.status(400).json({ error: 'Missing trackPath, lang, or translations' });
    }
    // Use resolveTrackFullPath to handle both local and linked library paths
    const fullPath = resolveTrackFullPath(trackPath);
    if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'Track not found' });

    const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${lang}.json`);
    fs.writeFileSync(translationPath, JSON.stringify(translations, null, 2));
    console.log(`[Lyrics] ✅ Saved ${translations.length} edited translations (${lang}) for ${path.basename(trackPath)}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('[Flow] Translation save error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── RAW WHISPER DATA (for Word Snapper / triple-stream view) ────────────────

/**
 * Create a timestamped backup of a sidecar file.
 * Returns the backup file path.
 */
function createBackup(sidecarPath) {
  if (!fs.existsSync(sidecarPath)) return sidecarPath;
  const dir = path.dirname(sidecarPath);
  const base = path.basename(sidecarPath, '.json');
  const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
  const backupName = `${base}.backup_${ts}.json`;
  const backupPath = path.join(dir, backupName);
  fs.copyFileSync(sidecarPath, backupPath);

  // Prune old backups (keep max 20 per sidecar)
  try {
    const prefix = base.replace(/\.lyrics$/, '.lyrics');
    const allBackups = fs.readdirSync(dir)
      .filter(f => f.startsWith(prefix) && f.includes('.backup_') && f.endsWith('.json'))
      .sort();
    if (allBackups.length > 20) {
      for (const old of allBackups.slice(0, allBackups.length - 20)) {
        fs.unlinkSync(path.join(dir, old));
      }
    }
  } catch (_) {}

  return backupPath;
}

app.post('/api/lyrics/raw-whisper', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    if (!fullPath || !fs.existsSync(fullPath)) return res.status(404).json({ error: 'Track not found' });

    const whisperPath = fullPath.replace(/\.[^/.]+$/, '.whisper.json');
    if (!fs.existsSync(whisperPath)) {
      return res.json({ raw_whisper: null, reference_text: null, message: 'No raw whisper data available. Re-sync lyrics to generate.' });
    }
    const data = JSON.parse(fs.readFileSync(whisperPath, 'utf-8'));

    // ── Dedup: Remove redundant/overlapping whisper tokens ──
    // Raw Whisper sometimes emits hundreds of near-identical "ooh", "aah" tokens
    if (Array.isArray(data.raw_whisper)) {
      for (const seg of data.raw_whisper) {
        if (!Array.isArray(seg.words) || seg.words.length <= 1) continue;
        const deduped = [seg.words[0]];
        for (let i = 1; i < seg.words.length; i++) {
          const prev = deduped[deduped.length - 1];
          const curr = seg.words[i];
          // Skip if same text and timestamps overlap by >90%
          const overlap = Math.min(prev.end, curr.end) - Math.max(prev.start, curr.start);
          const prevDur = (prev.end - prev.start) || 0.01;
          const currDur = (curr.end - curr.start) || 0.01;
          const overlapRatio = overlap / Math.min(prevDur, currDur);
          if (prev.word === curr.word && overlapRatio > 0.9) {
            // Merge: extend prev to cover both
            prev.end = Math.max(prev.end, curr.end);
            continue;
          }
          // Also skip if identical text and gap < 0.05s
          if (prev.word === curr.word && Math.abs(curr.start - prev.end) < 0.05) {
            prev.end = Math.max(prev.end, curr.end);
            continue;
          }
          deduped.push(curr);
        }
        if (deduped.length < seg.words.length) {
          console.log(`[RawWhisper] Deduped segment: ${seg.words.length} → ${deduped.length} words`);
        }
        seg.words = deduped;
      }
    }

    // Also include the aligned lyrics from .lyrics.json sidecar
    const lyricsPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    if (fs.existsSync(lyricsPath)) {
      try {
        const lyricsData = JSON.parse(fs.readFileSync(lyricsPath, 'utf-8'));
        // Extract word-level aligned data
        if (Array.isArray(lyricsData)) {
          const alignedWords = [];
          for (const line of lyricsData) {
            if (line.words && Array.isArray(line.words)) {
              for (const w of line.words) {
                alignedWords.push({ word: w.word || w.text || '', start: w.start, end: w.end });
              }
            }
          }
          data.aligned = alignedWords;
          data.aligned_lines = lyricsData;
        }
      } catch (e) {
        console.warn('[RawWhisper] Could not read .lyrics.json:', e.message);
      }
    }

    res.json(data);
  } catch (err) {
    console.error('[RawWhisper] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── LYRICS BACKUP API (list, restore, create) ─────────────────────────────

app.post('/api/lyrics/backups', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    const dir = path.dirname(fullPath);
    const ext = path.extname(fullPath);
    const base = path.basename(fullPath, ext);
    const sidecarBase = base + '.lyrics';

    if (!fs.existsSync(dir)) return res.json({ backups: [] });

    const files = fs.readdirSync(dir);
    const backups = [];
    const backupRegex = new RegExp(`^${sidecarBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.backup_(\\d{4}-\\d{2}-\\d{2}_\\d{2}-\\d{2}-\\d{2}[^.]*)\\.json$`);

    for (const f of files) {
      const m = f.match(backupRegex);
      if (m) {
        const filePath = path.join(dir, f);
        const stat = fs.statSync(filePath);
        // Parse timestamp from filename
        const tsRaw = m[1].replace(/_/, 'T').replace(/-(\d{2})-(\d{2})-(\d{2})$/, ':$1:$2.$3Z').replace(/-(\d{2})-(\d{2})$/, ':$1:$2Z');
        backups.push({
          fileName: f,
          timestamp: stat.mtime.toISOString(),
          size: stat.size,
          lines: 0,
        });
        // Try to count lines
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          if (Array.isArray(data)) backups[backups.length - 1].lines = data.length;
        } catch {}
      }
    }

    // Sort newest first
    backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json({ backups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lyrics/restore-backup', express.json(), (req, res) => {
  try {
    const { trackPath, backupFileName } = req.body;
    if (!trackPath || !backupFileName) return res.status(400).json({ error: 'Missing trackPath or backupFileName' });

    const fullPath = resolveTrackFullPath(trackPath);
    const dir = path.dirname(fullPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    const backupPath = path.join(dir, backupFileName);

    // Security: ensure backup is in same directory
    if (path.dirname(backupPath) !== dir) {
      return res.status(400).json({ error: 'Invalid backup path' });
    }
    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ error: 'Backup file not found' });
    }

    // Backup current state before restoring
    createBackup(sidecarPath);

    // Copy backup over current sidecar
    fs.copyFileSync(backupPath, sidecarPath);

    // Update SQLite cache
    try {
      const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
      const lyricsJson = JSON.stringify(lyrics);
      const stmtUpdate = tracksDb.prepare('UPDATE tracks SET lyrics = ?, lyrics_type = ?, scanned_at = 0 WHERE path = ?');
      stmtUpdate.run(lyricsJson, 'synced', trackPath);
      // Also try without music/ prefix
      const altPath = trackPath.startsWith('music/') ? trackPath.slice(6) : `music/${trackPath}`;
      stmtUpdate.run(lyricsJson, 'synced', altPath);
    } catch (e) { console.warn('[Backup] DB update failed:', e.message); }

    console.log(`[Backup] 🔄 Restored "${backupFileName}" → ${path.basename(sidecarPath)}`);
    res.json({ ok: true, restoredFrom: backupFileName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/lyrics/create-backup', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    if (!fs.existsSync(sidecarPath)) {
      // Return 200 with ok:false instead of 404 — nothing to back up is not an error
      return res.json({ ok: false, error: 'No lyrics to back up yet' });
    }
    const backupPath = createBackup(sidecarPath);
    console.log(`[Backup] 📸 Manual backup created: ${path.basename(backupPath)}`);
    res.json({ ok: true, backupFile: path.basename(backupPath) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── FLOW MODE: Atomic Word Append (ChromicEditor Flow Mode) ─────────────────
app.post('/api/lyrics/flow-word', express.json(), (req, res) => {
  try {
    const { trackPath, word } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    if (!word || !word.text) return res.status(400).json({ error: 'Missing word data' });

    const fullPath = resolveTrackFullPath(trackPath);
    if (!fullPath || !fs.existsSync(fullPath)) return res.status(404).json({ error: 'Track not found' });

    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');

    // Load or create sidecar
    let lyrics = [];
    if (fs.existsSync(sidecarPath)) {
      try { lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8')); } catch (_) {}
      if (!Array.isArray(lyrics)) lyrics = [];
    }

    // Find or create the right line (group by gap > 1.5s)
    const MAX_WORDS_PER_LINE = 10;
    let lineIndex = -1;
    let wordIndex = -1;

    if (lyrics.length > 0) {
      const lastLine = lyrics[lyrics.length - 1];
      const lastWord = lastLine.words?.[lastLine.words.length - 1];
      const gap = lastWord ? (word.start - (lastWord.end || lastWord.start || 0)) : 999;
      const tooLong = lastLine.words?.length >= MAX_WORDS_PER_LINE;

      if (gap <= 1.5 && !tooLong) {
        lineIndex = lyrics.length - 1;
      }
    }

    if (lineIndex === -1) {
      // Create new line
      lyrics.push({ time: word.start, start: word.start, end: word.end, text: word.text, words: [] });
      lineIndex = lyrics.length - 1;
    }

    // Append word
    const line = lyrics[lineIndex];
    if (!Array.isArray(line.words)) line.words = [];
    line.words.push({ word: word.text, start: word.start, end: word.end });
    wordIndex = line.words.length - 1;

    // Update line metadata
    line.text = line.words.map(w => w.word).join(' ');
    line.start = line.words[0].start;
    line.time = line.start;
    line.end = line.words[line.words.length - 1].end;

    // Write sidecar
    fs.writeFileSync(sidecarPath, JSON.stringify(lyrics, null, 2));

    // Update DB
    try {
      tracksDb.prepare('UPDATE tracks SET lyrics=@lyrics, lyrics_type=@lyrics_type WHERE path=@path')
        .run({ path: trackPath, lyrics: JSON.stringify(lyrics), lyrics_type: 'synced' });
    } catch (e) { /* DB update optional */ }

    console.log(`[FlowWord] ✓ "${word.text}" → line ${lineIndex}, word ${wordIndex} (${path.basename(trackPath)})`);
    res.json({ ok: true, lineIndex, wordIndex, timeline: lyrics });
  } catch (err) {
    console.error('[FlowWord] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── FLOW MODE: Atomic Word Undo ─────────────────────────────────────────────
app.post('/api/lyrics/flow-undo', express.json(), (req, res) => {
  try {
    const { trackPath, lineIndex, wordIndex } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });

    const fullPath = resolveTrackFullPath(trackPath);
    if (!fullPath || !fs.existsSync(fullPath)) return res.status(404).json({ error: 'Track not found' });

    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    if (!fs.existsSync(sidecarPath)) return res.status(404).json({ error: 'No lyrics sidecar' });

    let lyrics;
    try { lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8')); } catch (_) {
      return res.status(400).json({ error: 'Corrupted sidecar' });
    }
    if (!Array.isArray(lyrics)) return res.status(400).json({ error: 'Invalid sidecar format' });

    // Remove the specific word
    if (lineIndex >= 0 && lineIndex < lyrics.length) {
      const line = lyrics[lineIndex];
      if (Array.isArray(line.words) && wordIndex >= 0 && wordIndex < line.words.length) {
        const removed = line.words.splice(wordIndex, 1)[0];

        if (line.words.length === 0) {
          // Remove empty line
          lyrics.splice(lineIndex, 1);
        } else {
          // Update line metadata
          line.text = line.words.map(w => w.word).join(' ');
          line.start = line.words[0].start;
          line.time = line.start;
          line.end = line.words[line.words.length - 1].end;
        }

        fs.writeFileSync(sidecarPath, JSON.stringify(lyrics, null, 2));

        try {
          tracksDb.prepare('UPDATE tracks SET lyrics=@lyrics WHERE path=@path')
            .run({ path: trackPath, lyrics: JSON.stringify(lyrics) });
        } catch (e) { /* optional */ }

        console.log(`[FlowUndo] ↩ Removed "${removed.word}" from line ${lineIndex} (${path.basename(trackPath)})`);
        res.json({ ok: true, removed: removed.word, timeline: lyrics });
      } else {
        res.status(400).json({ error: 'Invalid wordIndex' });
      }
    } else {
      res.status(400).json({ error: 'Invalid lineIndex' });
    }
  } catch (err) {
    console.error('[FlowUndo] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── FLOW MODE: Blackbox Unsaved Changes Backup ──────────────────────────────
app.post('/api/lyrics/blackbox', express.json({ limit: '2mb' }), (req, res) => {
  try {
    const entry = req.body;
    if (!entry || !entry.trackName) return res.status(400).json({ error: 'Missing blackbox entry' });

    // Store in a blackbox directory alongside media
    const blackboxDir = path.join(MEDIA_ROOT, '.chromic-blackbox');
    if (!fs.existsSync(blackboxDir)) fs.mkdirSync(blackboxDir, { recursive: true });

    const safeName = (entry.trackName || 'unknown').replace(/[/\\:*?"<>|]/g, '_');
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `${safeName}_${dateStr}.blackbox.json`;
    const filePath = path.join(blackboxDir, filename);

    fs.writeFileSync(filePath, JSON.stringify(entry, null, 2));

    // Auto-prune: keep only last 50 blackbox files
    try {
      const files = fs.readdirSync(blackboxDir)
        .filter(f => f.endsWith('.blackbox.json'))
        .sort();
      if (files.length > 50) {
        for (let i = 0; i < files.length - 50; i++) {
          fs.unlinkSync(path.join(blackboxDir, files[i]));
        }
      }
    } catch (_) {}

    console.log(`[Blackbox] 📦 Saved: ${filename} (${entry.wordCount || 0} words)`);
    res.json({ ok: true, file: filename });
  } catch (err) {
    console.error('[Blackbox] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── FLOW MODE SAVE (ChromicEditor Flow Mode edits) ──────────────────────────
app.post('/api/lyrics/flow-save', express.json({ limit: '2mb' }), (req, res) => {
  try {
    const { trackPath, timeline, source } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    if (!Array.isArray(timeline) || !timeline.length) return res.status(400).json({ error: 'Missing or empty timeline' });

    const fullPath = resolveTrackFullPath(trackPath);
    if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'Track file not found' });

    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');

    // Backup existing sidecar before overwriting
    if (fs.existsSync(sidecarPath)) {
      try { createBackup(sidecarPath); } catch (_) {}
    }

    // Write as plain array — exact backup-compatible format (no extra metadata)
    fs.writeFileSync(sidecarPath, JSON.stringify(timeline, null, 2));

    // Update DB
    try {
      const lyricsJson = JSON.stringify(timeline);
      tracksDb.prepare('UPDATE tracks SET lyrics=@lyrics, lyrics_type=@lyrics_type WHERE path=@path')
        .run({ path: trackPath, lyrics: lyricsJson, lyrics_type: 'synced' });
    } catch (e) { console.warn('[FlowSave] DB update failed:', e.message); }

    console.log(`[FlowSave] ✅ Saved ${timeline.length} lines for "${path.basename(trackPath)}" (source=${source || 'flow-mode'})`);
    res.json({ ok: true, lines: timeline.length });
  } catch (err) {
    console.error('[FlowSave] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── LRC EDITOR: Load .lrc sidecar content ──────────────────────────────────
app.post('/api/lyrics/lrc-load', express.json(), async (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    const lrcPath = fullPath.replace(/\.[^/.]+$/, '.lrc');
    const lyricsJsonPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');

    // Helper: generate LRC format from .lyrics.json
    const generateLrcFromJson = () => {
      if (!fs.existsSync(lyricsJsonPath)) return null;
      try {
        const data = JSON.parse(fs.readFileSync(lyricsJsonPath, 'utf-8'));
        if (!Array.isArray(data) || data.length === 0) return null;
        const lines = [];
        for (const line of data) {
          const t = line.time ?? line.start ?? 0;
          const mins = Math.floor(t / 60);
          const secs = t - mins * 60;
          const ts = `[${String(mins).padStart(2, '0')}:${secs.toFixed(2).padStart(5, '0')}]`;
          lines.push(`${ts} ${line.text || ''}`);
        }
        return lines.join('\n');
      } catch { return null; }
    };

    // Helper: check if text has LRC timestamps
    const hasTimestamps = (text) => /\[\d{1,2}:\d{2}\.\d{2,3}\]/.test(text || '');

    // Priority 1: .lrc sidecar file (user-created, highest priority)
    if (fs.existsSync(lrcPath)) {
      const content = fs.readFileSync(lrcPath, 'utf-8');
      let embedded = null;
      try { embedded = await _extractEmbeddedLrc(fullPath); } catch (_) {}
      return res.json({ content, path: lrcPath, source: 'sidecar', embedded });
    }

    // Priority 2: Generate LRC from .lyrics.json (has timestamps)
    const generatedLrc = generateLrcFromJson();
    let embedded = null;
    try { embedded = await _extractEmbeddedLrc(fullPath); } catch (_) {}

    if (generatedLrc) {
      // Return generated LRC as content (with timestamps), embedded as reference
      return res.json({ content: generatedLrc, path: lrcPath, source: 'generated', embedded });
    }

    // Priority 3: Embedded lyrics (may or may not have timestamps)
    if (embedded) {
      return res.json({ content: null, path: lrcPath, source: 'none', embedded });
    }

    res.json({ content: null, path: lrcPath, source: 'none', embedded: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Extract embedded synced/unsynced lyrics from audio file metadata */
async function _extractEmbeddedLrc(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const mm = await import('music-metadata');
  const metadata = await mm.parseFile(filePath, { duration: false, skipCovers: true });
  const hasTimestamps = (t) => /\[\d{1,2}:\d{2}[.\d]*\]/.test(t || '');

  // Check native tags first — they often have the synced (timestamped) version
  if (metadata.native) {
    for (const [format, tags] of Object.entries(metadata.native)) {
      for (const t of tags) {
        if (/^(LYRICS|UNSYNCEDLYRICS|UNSYNCED LYRICS|USLT|TEXT)$/i.test(t.id)) {
          const val = typeof t.value === 'string' ? t.value : (t.value?.text || t.value?.lyrics || null);
          if (val && val.trim() && hasTimestamps(val)) return val.trim();
        }
      }
    }
  }

  // Fallback: common.lyrics (may or may not have timestamps)
  if (metadata.common.lyrics && metadata.common.lyrics.length > 0) {
    const raw = metadata.common.lyrics[0];
    const text = typeof raw === 'string' ? raw : (raw?.text || raw?.lyrics || null);
    if (text && text.trim()) return text.trim();
  }

  // Fallback: native tags without timestamps
  if (metadata.native) {
    for (const [format, tags] of Object.entries(metadata.native)) {
      for (const t of tags) {
        if (/^(LYRICS|UNSYNCEDLYRICS|UNSYNCED LYRICS|USLT|TEXT)$/i.test(t.id)) {
          const val = typeof t.value === 'string' ? t.value : (t.value?.text || t.value?.lyrics || null);
          if (val && val.trim()) return val.trim();
        }
      }
    }
  }
  return null;
}

// ─── LRC EDITOR: Save .lrc sidecar (with backup) ───────────────────────────
app.post('/api/lyrics/lrc-save', express.json({ limit: '1mb' }), (req, res) => {
  try {
    const { trackPath, content } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    if (typeof content !== 'string') return res.status(400).json({ error: 'Missing content' });

    const fullPath = resolveTrackFullPath(trackPath);
    const lrcPath = fullPath.replace(/\.[^/.]+$/, '.lrc');

    // Backup existing .lrc before overwriting
    if (fs.existsSync(lrcPath)) {
      const dir = path.dirname(lrcPath);
      const backupDir = path.join(dir, '.chromic-backups');
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
      const base = path.basename(lrcPath);
      const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
      const backupName = `${base}.backup_${ts}`;
      const backupPath = path.join(backupDir, backupName);
      fs.copyFileSync(lrcPath, backupPath);
      // Prune old .lrc backups (keep max 10)
      try {
        const allBackups = fs.readdirSync(backupDir)
          .filter(f => f.startsWith(base + '.backup_'))
          .sort();
        if (allBackups.length > 10) {
          for (const old of allBackups.slice(0, allBackups.length - 10)) {
            fs.unlinkSync(path.join(backupDir, old));
          }
        }
      } catch (_) {}
    }

    fs.writeFileSync(lrcPath, content, 'utf-8');
    console.log(`[LRC-Save] ✅ Saved ${lrcPath} (${content.split('\n').length} lines)`);

    // Also regenerate .lyrics.json from the saved LRC so the app doesn't show stale data
    // (lyrics.json has higher priority than .lrc when loading tracks)
    try {
      const parsed = parseLrc(content);
      if (parsed && parsed.length > 0) {
        const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
        fs.writeFileSync(sidecarPath, JSON.stringify(parsed, null, 2), 'utf-8');
        console.log(`[LRC-Save] ✅ Regenerated .lyrics.json (${parsed.length} lines) from saved LRC`);
      }
    } catch (lrcErr) {
      console.warn(`[LRC-Save] Could not regenerate .lyrics.json: ${lrcErr.message}`);
    }

    res.json({ ok: true, path: lrcPath });
  } catch (err) {
    console.error('[LRC-Save] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── LRC BACKUPS — List .lrc backup files ────────────────────────────────────
app.post('/api/lyrics/lrc-backups', express.json(), (req, res) => {
  try {
    const { trackPath } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = resolveTrackFullPath(trackPath);
    const lrcPath = fullPath.replace(/\.[^/.]+$/, '.lrc');
    const dir = path.dirname(lrcPath);
    const lrcBase = path.basename(lrcPath);

    if (!fs.existsSync(dir)) return res.json({ backups: [] });

    // Look in both old location (alongside music) and new location (.chromic-backups)
    const backupDir = path.join(dir, '.chromic-backups');
    const dirsToCheck = [dir];
    if (fs.existsSync(backupDir)) dirsToCheck.push(backupDir);

    const backups = [];
    const backupRegex = new RegExp(`^${lrcBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.backup_(\\d{4}-\\d{2}-\\d{2}_\\d{2}-\\d{2}-\\d{2}[^.]*)$`);

    for (const searchDir of dirsToCheck) {
      const files = fs.readdirSync(searchDir);
      for (const f of files) {
        const m = f.match(backupRegex);
        if (m) {
          const filePath2 = path.join(searchDir, f);
          const stat = fs.statSync(filePath2);
          const content = fs.readFileSync(filePath2, 'utf-8');
          const lines = content.split('\n').filter(l => l.trim()).length;
          backups.push({
            fileName: f,
            timestamp: stat.mtime.toISOString(),
            size: stat.size,
            lines,
          });
        }
      }
    }
    backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json({ backups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── LRC BACKUP RESTORE — Restore a .lrc backup file ────────────────────────
app.post('/api/lyrics/lrc-restore-backup', express.json(), (req, res) => {
  try {
    const { trackPath, backupFileName } = req.body;
    if (!trackPath || !backupFileName) return res.status(400).json({ error: 'Missing params' });
    const fullPath = resolveTrackFullPath(trackPath);
    const lrcPath = fullPath.replace(/\.[^/.]+$/, '.lrc');
    const dir = path.dirname(lrcPath);
    const backupDir = path.join(dir, '.chromic-backups');
    // Look in both old and new backup locations
    let backupPath = path.join(backupDir, backupFileName);
    if (!fs.existsSync(backupPath)) backupPath = path.join(dir, backupFileName);

    if (!fs.existsSync(backupPath)) return res.status(404).json({ error: 'Backup not found' });

    // Backup current before restoring (into new location)
    if (fs.existsSync(lrcPath)) {
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
      const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
      const preRestoreBackup = path.join(backupDir, `${path.basename(lrcPath)}.backup_${ts}`);
      fs.copyFileSync(lrcPath, preRestoreBackup);
    }

    const content = fs.readFileSync(backupPath, 'utf-8');
    fs.writeFileSync(lrcPath, content, 'utf-8');
    res.json({ ok: true, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── LOAD TRANSLATION (for Flow Mode Studio editing) ────────────────────────
app.post('/api/lyrics/translation-load', express.json(), (req, res) => {
  try {
    const { trackPath, targetLang = 'uk' } = req.body;
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    // Use resolveTrackFullPath to handle both local and linked library paths
    const fullPath = resolveTrackFullPath(trackPath);
    const translationPath = fullPath.replace(/\.[^/.]+$/, `.lyrics.${targetLang}.json`);
    if (!fs.existsSync(translationPath)) {
      return res.json({ translations: null });
    }
    const translations = JSON.parse(fs.readFileSync(translationPath, 'utf-8'));
    res.json({ translations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TRACK INFO API ─────────────────────────────────────────────────────────

app.get('/api/track-info/*', async (req, res) => {
  try {
    // Use req.originalUrl to handle %2F in paths (Express doesn't pass encoded slashes via params)
    const prefix = '/api/track-info/';
    const idx = req.originalUrl.indexOf(prefix);
    if (idx === -1) return res.status(400).json({ error: 'Missing path' });
    const encodedPath = req.originalUrl.slice(idx + prefix.length);
    const relativePath = decodeURIComponent(encodedPath);
    if (!relativePath) return res.status(400).json({ error: 'Missing path' });

    let fullPath = path.join(MEDIA_ROOT, relativePath);
    // For linked library tracks, resolve from absolute_path in DB
    if (!fs.existsSync(fullPath)) {
      try {
        const row = tracksDb.prepare('SELECT absolute_path FROM tracks WHERE path = ? AND source = ?').get(relativePath, 'linked');
        if (row?.absolute_path && fs.existsSync(row.absolute_path)) {
          fullPath = row.absolute_path;
        }
      } catch (_) {}
    }
    if (!fs.existsSync(fullPath)) {
      console.warn('[track-info] File not found:', fullPath);
      return res.status(404).json({ error: 'File not found' });
    }

    // Check cache first
    const cached = stmtGetTrack.get(relativePath);
    if (cached && cached.scanned_at) {
      const stat = fs.statSync(fullPath);
      const fileModified = Math.floor(stat.mtimeMs);
      // Also check LRC sidecar mtime
      const lrcSidecar = fullPath.replace(/\.[^/.]+$/, '.lrc');
      let lrcNewer = false;
      try {
        if (fs.existsSync(lrcSidecar)) {
          const lrcMtime = Math.floor(fs.statSync(lrcSidecar).mtimeMs);
          if (lrcMtime > cached.scanned_at) lrcNewer = true;
        }
      } catch {}
      // Bypass cache if .lyrics.json sidecar exists but cached lyrics don't have word-level data
      // OR if the sidecar was modified after the cache was built
      // OR if the sidecar has different content than the cached lyrics (e.g., backup restored)
      const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      const sidecarExists = fs.existsSync(sidecarPath);
      const cachedHasWords = cached.lyrics && cached.lyrics.includes('"words"') && cached.lyrics.trimStart().startsWith('[');
      let sidecarNewer = false;
      let sidecarMismatch = false;
      if (sidecarExists) {
        try {
          const sidecarMtime = Math.floor(fs.statSync(sidecarPath).mtimeMs);
          sidecarNewer = sidecarMtime > cached.scanned_at;
          // Also check if sidecar content differs from DB (catches backup restores where mtime < scanned_at)
          if (!sidecarNewer && cachedHasWords) {
            const sidecarRaw = fs.readFileSync(sidecarPath, 'utf-8');
            const sidecarParsed = JSON.parse(sidecarRaw);
            const sidecarCount = Array.isArray(sidecarParsed) ? sidecarParsed.length : 0;
            const cachedParsed = JSON.parse(cached.lyrics);
            const cachedCount = Array.isArray(cachedParsed) ? cachedParsed.length : 0;
            if (sidecarCount !== cachedCount) {
              sidecarMismatch = true;
              console.log(`[track-info] Sidecar/DB mismatch: sidecar=${sidecarCount} entries vs DB=${cachedCount} entries — forcing rescan`);
            }
          }
        } catch (e) { /* ignore */ }
      }
      if (cached.scanned_at >= fileModified && !lrcNewer && (!sidecarExists || (cachedHasWords && !sidecarNewer && !sidecarMismatch))) {
        // Extract album cover from cache if folder still has no cover file
        if (cached.cover_data && cached.cover_format) {
          const albumDir = path.dirname(fullPath);
          const dirFiles = fs.readdirSync(albumDir).map(f => f.toLowerCase());
          const hasCover = ALBUM_COVER_BASENAMES.some(base =>
            PREVIEW_SIDECAR_EXTENSIONS.some(ext => dirFiles.includes(`${base}${ext}`))
          );
          if (!hasCover) {
            const coverExt = cached.cover_format.includes('png') ? '.png' : '.jpg';
            const coverPath = path.join(albumDir, `cover${coverExt}`);
            try {
              fs.writeFileSync(coverPath, Buffer.from(cached.cover_data, 'base64'));
              console.log(`[track-info] Extracted cover art from cache → ${coverPath}`);
            } catch (e) { /* ignore */ }
          }
        }

        const cachedLyricsType = cached.lyrics_type || (cached.lyrics ? (cached.lyrics.startsWith('[') ? 'synced' : 'unsynced') : null);

        // Background: enqueue fetch if no synced lyrics.
        // Retry `not_found` too, so stale DB state doesn't permanently block aligner recovery.
        if (!cachedLyricsType || cachedLyricsType === 'unsynced' || cachedLyricsType === 'not_found') {
          enqueueLyricsFetch(relativePath, cached.artist, cached.title, cached.album);
        }

        return res.json({
          title: cached.title,
          artist: cached.artist,
          album: cached.album,
          year: cached.year,
          disc: cached.disc || null,
          duration: cached.duration,
          lyrics: cached.lyrics,
          lyricsType: cachedLyricsType,
          lyricsStatus: (!cached.lyrics && (!cachedLyricsType || cachedLyricsType !== 'not_found')) ? (getLyricsStatus(relativePath) || 'queued') : (cachedLyricsType === 'not_found' ? 'not_found' : null),
          picture: cached.cover_data ? true : null,
        });
      }
    }

    // Parse fresh
    const meta = await extractTrackMetadata(fullPath);

    // Extract album cover from embedded metadata if folder has no cover file
    if (meta.coverData && meta.coverFormat) {
      const albumDir = path.dirname(fullPath);
      const dirFiles = fs.readdirSync(albumDir).map(f => f.toLowerCase());
      const hasCover = ALBUM_COVER_BASENAMES.some(base =>
        PREVIEW_SIDECAR_EXTENSIONS.some(ext => fs.existsSync(path.join(albumDir, `${base}${ext}`)))
      );
      if (!hasCover) {
        const coverExt = meta.coverFormat.includes('png') ? '.png' : '.jpg';
        const coverPath = path.join(albumDir, `cover${coverExt}`);
        try {
          fs.writeFileSync(coverPath, Buffer.from(meta.coverData, 'base64'));
          console.log(`[track-info] Extracted cover art → ${coverPath}`);
        } catch (writeErr) {
          console.warn(`[track-info] Failed to write cover: ${writeErr.message}`);
        }
      }
    }

    // Cache to SQLite
    stmtUpsertTrack.run({
      path: relativePath,
      title: meta.title,
      artist: meta.artist,
      album: meta.album,
      year: meta.year,
      disc: meta.disc,
      track_number: meta.trackNumber,
      duration: meta.duration,
      lyrics: meta.lyrics,
      lyrics_type: meta.lyricsType,
      cover_format: meta.coverFormat,
      cover_data: meta.coverData,
      scanned_at: Date.now(),
    });

    res.json({
      title: meta.title,
      artist: meta.artist,
      album: meta.album,
      year: meta.year,
      disc: meta.disc,
      duration: meta.duration,
      lyrics: meta.lyrics,
      lyricsType: meta.lyricsType,
      lyricsStatus: (!meta.lyrics) ? 'queued' : null,
      picture: meta.coverData ? true : null,
    });

    // Background: if no synced lyrics, enqueue for LRCLIB/syncedlyrics fetch
    if (!meta.lyricsType || meta.lyricsType === 'unsynced' || meta.lyricsType === 'not_found') {
      enqueueLyricsFetch(relativePath, meta.artist, meta.title, meta.album);
    }
  } catch (err) {
    console.error('[track-info] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Lyrics status polling endpoint ──
app.get('/api/lyrics-status/*', (req, res) => {
  try {
    // Match track-info behavior: derive from originalUrl to avoid wildcard decoding edge-cases.
    const prefix = '/api/lyrics-status/';
    const idx = req.originalUrl.indexOf(prefix);
    if (idx === -1) return res.status(400).json({ error: 'Missing path' });
    const encodedPath = req.originalUrl.slice(idx + prefix.length);
    const relativePath = decodeURIComponent(encodedPath);
    if (!relativePath) return res.status(400).json({ error: 'Missing path' });
    const status = getLyricsStatus(relativePath);
    const queueInfo = getLyricsQueueInfo(relativePath);
    // Get aligner progress info if available
    const whisperInfo = _whisperEnhancing.get(relativePath);
    const progressInfo = whisperInfo ? { step: whisperInfo.step, stepLabel: whisperInfo.stepLabel, startedAt: whisperInfo.startedAt } : {};
    const failedInfo = whisperInfo && whisperInfo.status === 'failed'
      ? { reason: whisperInfo.reason || null, errorMessage: whisperInfo.errorMessage || null }
      : {};

    console.log(`[lyrics-status] path="${relativePath}" status=${status} lyricsCurrentPath="${lyricsCurrentPath}" queueLen=${LYRICS_QUEUE.length} processing=${lyricsProcessing} step=${progressInfo.step || 'none'}`);
    // If status is 'ready' or 'done', check DB for fresh lyrics
    if (status === 'ready' || status === 'done' || !status) {
      const stmt = tracksDb.prepare('SELECT lyrics, lyrics_type FROM tracks WHERE path = ?');
      const row = stmt.get(relativePath);
      if (row?.lyrics && row.lyrics_type === 'synced') {
        return res.json({ status: 'ready', lyrics: row.lyrics, lyricsType: 'synced' });
      }
      if (row?.lyrics_type === 'not_found') {
        return res.json({ status: 'not_found', ...failedInfo });
      }
    }
    // If status is generating but DB already has line-level lyrics, include them
    if (status === 'generating' || status === 'queued') {
      const stmt2 = tracksDb.prepare('SELECT lyrics, lyrics_type FROM tracks WHERE path = ?');
      const row2 = stmt2.get(relativePath);
      if (row2?.lyrics && row2.lyrics_type === 'synced') {
        return res.json({ status, lyrics: row2.lyrics, lyricsType: 'synced', partial: true, ...queueInfo, ...progressInfo });
      }
    }
    // If status is unknown but lyrics pipeline is active, the track may be waiting
    const fallbackStatus = (!status && (lyricsProcessing || LYRICS_QUEUE.length > 0)) ? 'queued' : (status || 'not_found');
    res.json({ status: fallbackStatus, ...queueInfo, ...progressInfo, ...failedInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TRACK COVER API (serves binary image, no base64 in JSON) ────────────────
app.get('/api/track-cover/*', async (req, res) => {
  try {
    const prefix = '/api/track-cover/';
    const idx = req.originalUrl.indexOf(prefix);
    if (idx === -1) return res.status(400).end();
    let encodedPath = req.originalUrl.slice(idx + prefix.length);
    // Strip query string before decoding
    const qIdx = encodedPath.indexOf('?');
    if (qIdx !== -1) encodedPath = encodedPath.slice(0, qIdx);
    const relativePath = decodeURIComponent(encodedPath);
    if (!relativePath) return res.status(400).end();

    // Check cache first
    const cached = stmtGetTrack.get(relativePath);
    if (cached && cached.cover_data && cached.cover_format) {
      const rawBuf = Buffer.from(cached.cover_data, 'base64');
      const targetWidth = parseInt(req.query.w) || 600;
      const accept = req.headers.accept || '';
      let buf, contentType;
      try {
        if (accept.includes('image/webp')) {
          buf = await sharp(rawBuf).resize(targetWidth).webp({ quality: 80 }).toBuffer();
          contentType = 'image/webp';
        } else {
          buf = await sharp(rawBuf).resize(targetWidth).jpeg({ quality: 82 }).toBuffer();
          contentType = 'image/jpeg';
        }
      } catch (_) {
        buf = rawBuf;
        contentType = cached.cover_format;
      }
      res.set('Content-Type', contentType);
      res.set('Cache-Control', 'public, max-age=604800');
      res.set('Vary', 'Accept');
      return res.send(buf);
    }

    // Parse fresh — resolve actual file path (linked tracks use absolute_path)
    let fullPath = path.join(MEDIA_ROOT, relativePath);
    if (!fs.existsSync(fullPath) && cached && cached.absolute_path) {
      fullPath = cached.absolute_path;
    }
    // Also try DB lookup if stmtGetTrack didn't return absolute_path
    if (!fs.existsSync(fullPath)) {
      try {
        const row2 = tracksDb.prepare('SELECT absolute_path FROM tracks WHERE path = ?').get(relativePath);
        if (row2 && row2.absolute_path && fs.existsSync(row2.absolute_path)) {
          fullPath = row2.absolute_path;
        }
      } catch (_) {}
    }
    if (!fs.existsSync(fullPath)) return res.status(404).end();

    const mm = await import('music-metadata');
    const metadata = await mm.parseFile(fullPath);
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const pic = metadata.common.picture[0];
      // Resize to max 600px width and serve as WebP for bandwidth savings
      const targetWidth = parseInt(req.query.w) || 600;
      const accept = req.headers.accept || '';
      let processed;
      let contentType;
      try {
        if (accept.includes('image/webp')) {
          processed = await sharp(Buffer.from(pic.data)).resize(targetWidth).webp({ quality: 80 }).toBuffer();
          contentType = 'image/webp';
        } else {
          processed = await sharp(Buffer.from(pic.data)).resize(targetWidth).jpeg({ quality: 82 }).toBuffer();
          contentType = 'image/jpeg';
        }
      } catch (_) {
        processed = Buffer.from(pic.data);
        contentType = pic.format;
      }
      res.set('Content-Type', contentType);
      res.set('Cache-Control', 'public, max-age=604800');
      res.set('Vary', 'Accept');
      return res.send(processed);
    }

    // Fallback: look for sidecar cover image in the same folder
    const trackDir = path.dirname(fullPath);
    const coverNames = ['cover', 'folder', 'front', 'albumart', 'album', 'artwork'];
    const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
    try {
      const dirFiles = fs.readdirSync(trackDir);
      let coverFile = null;
      for (const f of dirFiles) {
        const base = path.basename(f, path.extname(f)).toLowerCase();
        const ext = path.extname(f).toLowerCase();
        if (imageExts.includes(ext) && coverNames.some(n => base.includes(n))) {
          coverFile = path.join(trackDir, f);
          break;
        }
      }
      if (!coverFile) {
        for (const f of dirFiles) {
          if (imageExts.includes(path.extname(f).toLowerCase())) {
            coverFile = path.join(trackDir, f);
            break;
          }
        }
      }
      if (coverFile) {
        const imgBuf = fs.readFileSync(coverFile);
        const targetWidth = parseInt(req.query.w) || 600;
        const accept = req.headers.accept || '';
        let buf, contentType;
        try {
          if (accept.includes('image/webp')) {
            buf = await sharp(imgBuf).resize(targetWidth).webp({ quality: 80 }).toBuffer();
            contentType = 'image/webp';
          } else {
            buf = await sharp(imgBuf).resize(targetWidth).jpeg({ quality: 82 }).toBuffer();
            contentType = 'image/jpeg';
          }
        } catch (_) {
          buf = imgBuf;
          contentType = 'image/' + path.extname(coverFile).slice(1);
        }
        res.set('Content-Type', contentType);
        res.set('Cache-Control', 'public, max-age=604800');
        res.set('Vary', 'Accept');
        return res.send(buf);
      }
    } catch (_) {}

    res.status(404).end();
  } catch (err) {
    res.status(500).end();
  }
});

// ─── BACKGROUND LIBRARY SCAN ────────────────────────────────────────────────

let scanInProgress = false;

async function backgroundScanMusicLibrary() {
  if (scanInProgress) return;
  scanInProgress = true;
  console.log('[scan] Starting background music metadata scan...');

  const musicDir = path.join(MEDIA_ROOT, 'music');
  if (!fs.existsSync(musicDir)) { scanInProgress = false; return; }

  const musicExts = new Set(MUSIC_EXTENSIONS);

  function* walkDir(dir, prefix = 'music') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const fullPath = path.join(dir, entry.name);
      const relPath = prefix + '/' + entry.name;
      if (entry.isDirectory()) {
        yield* walkDir(fullPath, relPath);
      } else if (musicExts.has(path.extname(entry.name).toLowerCase())) {
        yield { fullPath, relPath };
      }
    }
  }

  let scanned = 0;
  for (const { fullPath, relPath } of walkDir(musicDir)) {
    const cached = stmtGetTrack.get(relPath);
    if (cached && cached.scanned_at) {
      try {
        const stat = fs.statSync(fullPath);
        let stale = cached.scanned_at < Math.floor(stat.mtimeMs);
        // Also check LRC sidecar mtime
        const lrcSidecar = fullPath.replace(/\.[^/.]+$/, '.lrc');
        let lrcNewer = false;
        try {
          if (fs.existsSync(lrcSidecar)) {
            const lrcMtime = Math.floor(fs.statSync(lrcSidecar).mtimeMs);
            if (lrcMtime > cached.scanned_at) lrcNewer = true;
          }
        } catch {}
        if (!stale && !lrcNewer) continue;
      } catch { continue; }
    }

    try {
      const meta = await extractTrackMetadata(fullPath);
      stmtUpsertTrack.run({
        path: relPath,
        title: meta.title,
        artist: meta.artist,
        album: meta.album,
        year: meta.year,
        disc: meta.disc,
        duration: meta.duration,
        lyrics: meta.lyrics,
        lyrics_type: meta.lyricsType,
        cover_format: meta.coverFormat,
        cover_data: meta.coverData,
        scanned_at: Date.now(),
      });

      // Extract album cover.jpg from embedded metadata if folder has no cover file
      if (meta.coverData && meta.coverFormat) {
        const albumDir = path.dirname(fullPath);
        const dirFiles = fs.readdirSync(albumDir).map(f => f.toLowerCase());
        const hasCover = ALBUM_COVER_BASENAMES.some(base =>
          PREVIEW_SIDECAR_EXTENSIONS.some(ext => fs.existsSync(path.join(albumDir, `${base}${ext}`)))
        );
        if (!hasCover) {
          const coverExt = meta.coverFormat.includes('png') ? '.png' : '.jpg';
          const coverPath = path.join(albumDir, `cover${coverExt}`);
          try {
            fs.writeFileSync(coverPath, Buffer.from(meta.coverData, 'base64'));
            console.log(`[scan] Extracted cover art → ${coverPath}`);
          } catch (writeErr) {
            console.warn(`[scan] Failed to write cover: ${writeErr.message}`);
          }
        }
      }

      scanned++;
    } catch (err) {
      console.warn(`[scan] Failed: ${relPath} — ${err.message}`);
    }

    // Yield to event loop every 5 files to avoid blocking
    if (scanned % 5 === 0) await new Promise(r => setTimeout(r, 10));
  }

  console.log(`[scan] Complete. Scanned ${scanned} new/updated tracks.`);
  scanInProgress = false;
}

// ─── COOP/COEP HEADERS (SharedArrayBuffer support) ──────────────────────────

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve dist/ (minified) in production, public/ (source) in development
const STATIC_DIR = fs.existsSync(path.join(__dirname, 'dist', 'app.js'))
  ? path.join(__dirname, 'dist')
  : path.join(__dirname, 'public');
const IS_PRODUCTION = STATIC_DIR.endsWith('dist');

app.use(express.static(STATIC_DIR, {
  index: false,
  maxAge: IS_PRODUCTION ? '7d' : 0,
  immutable: false,
  setHeaders(res, filePath) {
    if (!IS_PRODUCTION || filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=604800');
    } else if (/\.(woff2?|ttf|otf|eot)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    } else if (/\.(png|jpg|jpeg|webp|avif|gif|svg|ico)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  },
}));

// Image proxy: resize and convert to WebP on-the-fly for optimised delivery
app.get('/proxy/image', async (req, res) => {
  try {
    const { src, width, format } = req.query;
    if (!src) return res.status(400).json({ error: 'Missing src parameter' });

    const targetWidth = parseInt(width) || 400;
    const imagePath = path.join(__dirname, 'public', decodeURIComponent(src));

    // Only allow proxying local files within public/media paths
    if (!imagePath.startsWith(path.join(__dirname, 'media')) && !imagePath.startsWith(path.join(__dirname, 'public'))) {
      return res.status(403).json({ error: 'Forbidden path' });
    }

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Content negotiation: prefer AVIF > WebP based on Accept header or format param
    const acceptHeader = req.headers.accept || '';
    const useAvif = format === 'avif' || (!format && acceptHeader.includes('image/avif'));
    const useWebp = !useAvif;

    let pipeline = sharp(imagePath).resize(targetWidth);
    let contentType;

    if (useAvif) {
      pipeline = pipeline.avif({ quality: 65 });
      contentType = 'image/avif';
    } else {
      pipeline = pipeline.webp({ quality: 80 });
      contentType = 'image/webp';
    }

    const resized = await pipeline.toBuffer();
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=2592000');
    res.set('Vary', 'Accept');
    res.send(resized);
  } catch (err) {
    console.error('[proxy/image]', err.message);
    res.status(500).json({ error: 'Image processing failed' });
  }
});

// ─── GOLD STATUS & AI TRAINING ───────────────────────────────────────────────

const readWordText = (word) => String(word?.text ?? word?.word ?? '').trim();

/**
 * Validate lyrics data for Gold status. Returns { valid, errors[], warnings[], score: 0-100 }.
 * @param {Array} lyricsJson - The parsed .lyrics.json array
 * @param {{ duration?: number }} audioMeta - Audio metadata (duration in seconds)
 */
function computePartialGoldStats(lyricsJson, audioMeta = {}, chunkSizeSec = 30) {
  const safeChunk = Number.isFinite(chunkSizeSec) && chunkSizeSec > 0 ? chunkSizeSec : 30;
  if (!Array.isArray(lyricsJson) || !lyricsJson.length) {
    return { validChunks: 0, totalChunks: 0, equivalent: 0 };
  }

  const words = [];
  for (const line of lyricsJson) {
    if (line?.type === 'vocal_cue' || !Array.isArray(line?.words)) continue;
    for (const w of line.words) {
      const start = Number(w?.start);
      const end = Number(w?.end);
      const text = readWordText(w);
      words.push({ start, end, text });
    }
  }
  if (!words.length) {
    return { validChunks: 0, totalChunks: 0, equivalent: 0 };
  }

  words.sort((a, b) => a.start - b.start);
  const maxWordEnd = Math.max(0, ...words.map((w) => Number.isFinite(w.end) ? w.end : 0));
  const duration = Number(audioMeta?.duration);
  const timelineEnd = Math.max(maxWordEnd, Number.isFinite(duration) && duration > 0 ? duration : 0);
  const totalChunks = Math.max(1, Math.ceil(timelineEnd / safeChunk));

  let validChunks = 0;
  for (let i = 0; i < totalChunks; i += 1) {
    const chunkStart = i * safeChunk;
    const chunkEnd = chunkStart + safeChunk;
    const chunkWords = words.filter((w) => Number.isFinite(w.start) && Number.isFinite(w.end) && w.start < chunkEnd && w.end > chunkStart);
    if (!chunkWords.length) continue;

    const usableWords = chunkWords
      .filter((w) => w.text && w.end > w.start)
      .sort((a, b) => a.start - b.start);

    if (usableWords.length < 6) continue;

    // Keep chunk if enough non-empty words survived cleanup.
    const usableRatio = usableWords.length / chunkWords.length;
    if (usableRatio < 0.45) continue;

    let hasHeavyOverlap = false;
    for (let j = 1; j < usableWords.length; j += 1) {
      if (usableWords[j].start < usableWords[j - 1].end - 0.08) {
        hasHeavyOverlap = true;
        break;
      }
    }
    if (!hasHeavyOverlap) validChunks += 1;
  }

  const equivalent = Number((validChunks / totalChunks).toFixed(2));
  return { validChunks, totalChunks, equivalent };
}

function validateGoldData(lyricsJson, audioMeta = {}) {
  const errors = [];   // Critical — block gold
  const warnings = []; // Non-critical — allow gold but flag
  const partialGold = computePartialGoldStats(lyricsJson, audioMeta);

  if (!Array.isArray(lyricsJson) || lyricsJson.length === 0) {
    return { valid: false, errors: [{ type: 'empty', message: 'No lyrics data found' }], warnings: [], score: 0, partialGold };
  }

  // Collect all words from all lines
  const allWords = [];
  for (let li = 0; li < lyricsJson.length; li++) {
    const line = lyricsJson[li];
    if (line.type === 'vocal_cue') continue;
    if (!Array.isArray(line.words)) continue;
    for (let wi = 0; wi < line.words.length; wi++) {
      const w = line.words[wi];
      allWords.push({ ...w, _lineIdx: li, _wordIdx: wi, _lane: w.lane ?? line.lane ?? 0 });
    }
  }

  if (allWords.length === 0) {
    return { valid: false, errors: [{ type: 'no_words', message: 'No word-level timing data found' }], warnings: [], score: 0, partialGold };
  }

  // Group words by lane for per-lane overlap checking
  const wordsByLane = new Map();
  for (const w of allWords) {
    const lane = w._lane;
    if (!wordsByLane.has(lane)) wordsByLane.set(lane, []);
    wordsByLane.get(lane).push(w);
  }
  // Sort each lane by start time
  for (const words of wordsByLane.values()) {
    words.sort((a, b) => a.start - b.start);
  }

  let overlapCount = 0;
  let emptyCount = 0;
  let tooShortCount = 0;
  let tooLongCount = 0;
  let negativeDurCount = 0;
  let silenceGaps = 0;

  // Per-word checks (lane-independent)
  for (let i = 0; i < allWords.length; i++) {
    const w = allWords[i];
    const s = parseFloat(w.start);
    const e = parseFloat(w.end);
    const text = readWordText(w);

    // Empty word check
    if (!text || text === 'null' || text === 'undefined') {
      emptyCount++;
      errors.push({ type: 'empty_word', message: `Empty word at ${s.toFixed(2)}s (lane ${w._lane})`, time: s, lineIdx: w._lineIdx, wordIdx: w._wordIdx });
    }

    // Negative or zero duration
    if (e <= s) {
      negativeDurCount++;
      errors.push({ type: 'negative_duration', message: `Word "${text}" has end (${e.toFixed(2)}) ≤ start (${s.toFixed(2)})`, time: s, lineIdx: w._lineIdx, wordIdx: w._wordIdx });
    }

    // Too short (< 0.05s)
    const dur = e - s;
    if (dur > 0 && dur < 0.05) {
      tooShortCount++;
      warnings.push({ type: 'too_short', message: `Word "${text}" is only ${(dur * 1000).toFixed(0)}ms at ${s.toFixed(2)}s`, time: s, lineIdx: w._lineIdx, wordIdx: w._wordIdx, autoFixable: false });
    }

    // Too long (> 10s)
    if (dur > 10) {
      tooLongCount++;
      warnings.push({ type: 'too_long', message: `Word "${text}" spans ${dur.toFixed(1)}s at ${s.toFixed(2)}s`, time: s, lineIdx: w._lineIdx, wordIdx: w._wordIdx });
    }
  }

  // Per-LANE overlap and gap checks (polyphony-aware)
  for (const [lane, laneWords] of wordsByLane) {
    for (let i = 1; i < laneWords.length; i++) {
      const prev = laneWords[i - 1];
      const curr = laneWords[i];
      const prevEnd = parseFloat(prev.end);
      const currStart = parseFloat(curr.start);
      const overlap = prevEnd - currStart;

      if (overlap > 0.001) { // > 1ms overlap within same lane
        overlapCount++;
        const prevText = readWordText(prev) || '(empty)';
        const currText = readWordText(curr) || '(empty)';
        if (overlap <= 0.02) {
          warnings.push({ type: 'micro_overlap', message: `${(overlap * 1000).toFixed(0)}ms overlap (lane ${lane}): "${prevText}" → "${currText}" at ${currStart.toFixed(2)}s`, time: currStart, lineIdx: curr._lineIdx, wordIdx: curr._wordIdx, prevLineIdx: prev._lineIdx, prevWordIdx: prev._wordIdx, autoFixable: true, overlapMs: overlap * 1000 });
        } else {
          errors.push({ type: 'overlap', message: `${(overlap * 1000).toFixed(0)}ms overlap (lane ${lane}): "${prevText}" (ends ${prevEnd.toFixed(2)}) → "${currText}" (starts ${currStart.toFixed(2)})`, time: currStart, lineIdx: curr._lineIdx, wordIdx: curr._wordIdx });
        }
      }

      // Large gap (> 5s without vocal_cue) — only check on lane 0 (main vocal)
      if (lane === 0) {
        const gap = currStart - prevEnd;
        if (gap > 5) {
          silenceGaps++;
          const currText = readWordText(curr) || '(empty)';
          warnings.push({ type: 'large_gap', message: `${gap.toFixed(1)}s gap before "${currText}" at ${currStart.toFixed(2)}s (consider adding a vocal cue)`, time: prevEnd });
        }
      }
    }
  }

  // Audio duration mismatch check
  if (audioMeta.duration && audioMeta.duration > 0) {
    const lastWord = allWords[allWords.length - 1];
    const lastEnd = parseFloat(lastWord.end);
    const diff = lastEnd - audioMeta.duration;
    if (diff > 2) {
      errors.push({ type: 'duration_mismatch', message: `Last word ends at ${lastEnd.toFixed(1)}s but audio is only ${audioMeta.duration.toFixed(1)}s (${diff.toFixed(1)}s over)` });
    }
    // Silence ratio
    let totalWordDuration = 0;
    for (const w of allWords) totalWordDuration += parseFloat(w.end) - parseFloat(w.start);
    const silenceRatio = 1 - (totalWordDuration / Math.min(lastEnd, audioMeta.duration));
    if (silenceRatio > 0.6) {
      warnings.push({ type: 'high_silence', message: `High silence ratio: ${(silenceRatio * 100).toFixed(0)}% of track is unmarked` });
    }
  }

  // Score calculation (100 = perfect)
  const criticalPenalty = errors.length * 20;
  const warningPenalty = warnings.filter(w => !w.autoFixable).length * 3;
  const autoFixPenalty = warnings.filter(w => w.autoFixable).length * 1;
  const score = Math.max(0, 100 - criticalPenalty - warningPenalty - autoFixPenalty);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    score,
    partialGold,
    stats: { totalWords: allWords.length, overlaps: overlapCount, emptyWords: emptyCount, tooShort: tooShortCount, tooLong: tooLongCount, negativeDuration: negativeDurCount, silenceGaps },
  };
}

const stmtMarkGold = tracksDb.prepare('UPDATE tracks SET status = ?, validation_score = ?, last_error_log = ?, checksum_sha256 = ? WHERE path = ?');
const stmtGetGoldCount = tracksDb.prepare("SELECT COUNT(*) as count FROM tracks WHERE status = 'gold' AND deleted_at IS NULL");
const stmtGetGoldTracks = tracksDb.prepare("SELECT path FROM tracks WHERE status = 'gold' AND deleted_at IS NULL");

function normalizeTrackPathInput(value) {
  let trackPath = String(value || '').trim();
  if (!trackPath) return '';
  trackPath = trackPath.replace(/^https?:\/\/[^/]+/i, '');
  trackPath = trackPath.replace(/^\/?media\//i, '');
  trackPath = trackPath.replace(/^\/+/, '');
  try {
    trackPath = decodeURIComponent(trackPath);
  } catch {}
  return toForwardSlashes(trackPath);
}

app.post('/api/tracks/mark-gold', express.json(), (req, res) => {
  try {
    const { gold, relaxed = false, minScore = 65 } = req.body;
    const trackPath = normalizeTrackPathInput(req.body?.trackPath);
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });

    const fullPath = resolveTrackFullPath(trackPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');

    // If unmarking gold, skip validation
    if (gold === false) {
      const relativePath = trackPath.startsWith('music/') ? trackPath : `music/${trackPath}`;
      stmtMarkGold.run(null, 0, null, null, relativePath);
      stmtMarkGold.run(null, 0, null, null, trackPath);

      // Update sidecar
      if (fs.existsSync(sidecarPath)) {
        try {
          const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
          if (Array.isArray(lyrics) && lyrics.length > 0) {
            delete lyrics[0]._goldStatus;
            delete lyrics[0]._goldVerifiedAt;
            delete lyrics[0]._validationScore;
            delete lyrics[0]._checksum;
            delete lyrics[0]._goldMode;
            delete lyrics[0]._goldRelaxed;
            delete lyrics[0]._goldRelaxedMinScore;
            fs.writeFileSync(sidecarPath, JSON.stringify(lyrics, null, 2));
          }
        } catch (e) { console.warn('[Gold] Failed to update sidecar:', e.message); }
      }

      console.log(`[Gold] ✕ Unmarked gold: ${path.basename(trackPath)}`);
      return res.json({ ok: true, status: null });
    }

    // ── VALIDATION GATE ──────────────────────────────────────
    if (!fs.existsSync(sidecarPath)) {
      return res.status(400).json({ error: 'No .lyrics.json sidecar file found. Save lyrics first.', validation: { valid: false, errors: [{ type: 'no_sidecar', message: 'No lyrics sidecar file found' }], warnings: [], score: 0 } });
    }

    let lyrics;
    try {
      lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
    } catch (e) {
      return res.status(400).json({ error: `Corrupted .lyrics.json: ${e.message}`, validation: { valid: false, errors: [{ type: 'parse_error', message: e.message }], warnings: [], score: 0 } });
    }

    // Unwrap legacy flow-save format: { lines: [...] } → [...]
    if (lyrics && !Array.isArray(lyrics) && Array.isArray(lyrics.lines)) {
      lyrics = lyrics.lines;
    }

    // Get audio duration for validation
    let audioDuration = 0;
    if (fs.existsSync(fullPath) && isFfprobeAvailable()) {
      audioDuration = probeMovieDurationSeconds(fullPath);
    }

    const validation = validateGoldData(lyrics, { duration: audioDuration });

    const safeMinScore = Number.isFinite(Number(minScore)) ? Math.max(0, Math.min(100, Number(minScore))) : 65;
    const safeMinEquivalent = Math.max(0.2, Number((safeMinScore / 200).toFixed(2)));
    const blockingErrorTypes = new Set(['empty', 'no_words', 'negative_duration', 'duration_mismatch']);
    const blockingErrors = (validation.errors || []).filter((e) => blockingErrorTypes.has(e?.type));
    const partialRelaxedAccepted = !validation.valid
      && Boolean(relaxed)
      && blockingErrors.length === 0
      && (validation.partialGold?.validChunks || 0) > 0
      && (validation.partialGold?.equivalent || 0) >= safeMinEquivalent;
    const scoreRelaxedAccepted = !validation.valid && Boolean(relaxed) && blockingErrors.length === 0 && validation.score >= safeMinScore;
    const relaxedAccepted = scoreRelaxedAccepted || partialRelaxedAccepted;

    if (!validation.valid && !relaxedAccepted) {
      console.log(`[Gold] ❌ Validation FAILED for ${path.basename(trackPath)}: ${validation.errors.length} errors, score=${validation.score}`);
      // Save error log to DB even on failure
      const relativePath = trackPath.startsWith('music/') ? trackPath : `music/${trackPath}`;
      stmtMarkGold.run(null, validation.score, JSON.stringify({ errors: validation.errors, warnings: validation.warnings }), null, relativePath);
      stmtMarkGold.run(null, validation.score, JSON.stringify({ errors: validation.errors, warnings: validation.warnings }), null, trackPath);

      return res.status(400).json({
        error: `Validation failed: ${validation.errors.length} critical error(s) found`,
        validation,
      });
    }

    if (relaxedAccepted) {
      console.log(`[Gold] ⚠️ Relaxed gold accepted for ${path.basename(trackPath)}: score=${validation.score}, minScore=${safeMinScore}, chunks=${validation.partialGold?.validChunks || 0}/${validation.partialGold?.totalChunks || 0}, eq=${validation.partialGold?.equivalent || 0}`);
    }

    // ── CHECKSUM ─────────────────────────────────────────────
    const crypto = require('crypto');
    const lyricsContent = fs.readFileSync(sidecarPath, 'utf-8');
    let checksum = crypto.createHash('sha256').update(lyricsContent).digest('hex');
    // Mix in audio file hash (first 64KB for speed)
    if (fs.existsSync(fullPath)) {
      try {
        const fd = fs.openSync(fullPath, 'r');
        const buf = Buffer.alloc(65536);
        fs.readSync(fd, buf, 0, buf.length, 0);
        fs.closeSync(fd);
        checksum = crypto.createHash('sha256').update(checksum + buf.toString('hex')).digest('hex');
      } catch {}
    }

    // ── PERSIST GOLD STATUS ──────────────────────────────────
    const relativePath = trackPath.startsWith('music/') ? trackPath : `music/${trackPath}`;
    const errorLog = validation.warnings.length > 0 ? JSON.stringify({ errors: [], warnings: validation.warnings }) : null;
    stmtMarkGold.run('gold', validation.score, errorLog, checksum, relativePath);
    stmtMarkGold.run('gold', validation.score, errorLog, checksum, trackPath);

    // Update sidecar metadata
    if (Array.isArray(lyrics) && lyrics.length > 0) {
      lyrics[0]._goldStatus = 'gold';
      lyrics[0]._goldVerifiedAt = new Date().toISOString();
      lyrics[0]._validationScore = validation.score;
      lyrics[0]._checksum = checksum;
      if (relaxedAccepted) {
        lyrics[0]._goldMode = 'relaxed';
        lyrics[0]._goldRelaxed = true;
        lyrics[0]._goldRelaxedMinScore = safeMinScore;
        if (partialRelaxedAccepted) {
          lyrics[0]._goldRelaxedReason = 'partial-chunks';
          lyrics[0]._goldRelaxedEquivalent = validation.partialGold?.equivalent || 0;
        } else {
          delete lyrics[0]._goldRelaxedReason;
          delete lyrics[0]._goldRelaxedEquivalent;
        }
      } else {
        delete lyrics[0]._goldMode;
        delete lyrics[0]._goldRelaxed;
        delete lyrics[0]._goldRelaxedMinScore;
        delete lyrics[0]._goldRelaxedReason;
        delete lyrics[0]._goldRelaxedEquivalent;
      }
      fs.writeFileSync(sidecarPath, JSON.stringify(lyrics, null, 2));
    }

    console.log(`[Gold] ⭐ Verified gold: ${path.basename(trackPath)} — score=${validation.score}, warnings=${validation.warnings.length}${relaxedAccepted ? ' (relaxed)' : ''}`);
    res.json({ ok: true, status: 'gold', validation, relaxedAccepted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tracks/gold-count', (_req, res) => {
  try {
    const row = stmtGetGoldCount.get();
    const count = row?.count || 0;
    const goldTracks = stmtGetGoldTracks.all();
    let totalChunks = 0;
    let validChunks = 0;
    let equivalentCount = 0;
    let relaxedTracks = 0;
    for (const t of goldTracks) {
      const relPath = String(t?.path || '');
      if (!relPath) continue;
      const fullPath = path.join(MEDIA_ROOT, relPath);
      const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
      if (!fs.existsSync(sidecarPath)) {
        equivalentCount += 1;
        continue;
      }
      try {
        const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
        const meta = Array.isArray(lyrics) ? lyrics[0] : null;
        if (meta && (meta._goldMode === 'relaxed' || meta._goldRelaxed === true)) relaxedTracks += 1;
        const partial = computePartialGoldStats(lyrics, {});
        totalChunks += partial.totalChunks;
        validChunks += partial.validChunks;
        equivalentCount += partial.equivalent;
      } catch {
        equivalentCount += 1;
      }
    }
    equivalentCount = Number(equivalentCount.toFixed(2));
    res.json({ count, equivalentCount, validChunks, totalChunks, relaxedTracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tracks/gold-status', (req, res) => {
  try {
    const trackPath = normalizeTrackPathInput(req.query.path || req.query.trackPath);
    if (!trackPath) return res.status(400).json({ error: 'Missing path' });
    const row = tracksDb.prepare('SELECT status, validation_score FROM tracks WHERE path = ? OR path = ?').get(
      trackPath, trackPath.startsWith('music/') ? trackPath : `music/${trackPath}`
    );
    if (row && row.status === 'gold') {
      let mode = 'strict';
      try {
        const normalizedPath = trackPath.startsWith('music/') ? trackPath : `music/${trackPath}`;
        const fullPath = path.join(MEDIA_ROOT, normalizedPath);
        const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
        if (fs.existsSync(sidecarPath)) {
          const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
          const meta = Array.isArray(lyrics) ? lyrics[0] : null;
          if (meta && (meta._goldMode === 'relaxed' || meta._goldRelaxed === true)) {
            mode = 'relaxed';
          }
        }
      } catch {}
      res.json({ status: 'gold', score: row.validation_score || 100, mode });
    } else {
      res.json({ status: null, score: 0, mode: null });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pre-flight validation (without marking gold)
app.post('/api/tracks/validate', express.json(), (req, res) => {
  try {
    const trackPath = normalizeTrackPathInput(req.body?.trackPath);
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = path.join(MEDIA_ROOT, trackPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    if (!fs.existsSync(sidecarPath)) {
      return res.json({ valid: false, errors: [{ type: 'no_sidecar', message: 'No lyrics file found. Save lyrics first.' }], warnings: [], score: 0 });
    }
    const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
    let audioDuration = 0;
    if (fs.existsSync(fullPath) && isFfprobeAvailable()) {
      audioDuration = probeMovieDurationSeconds(fullPath);
    }
    const validation = validateGoldData(lyrics, { duration: audioDuration });
    res.json(validation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auto-fix micro-overlaps (trims previous word's end to match next word's start)
app.post('/api/tracks/auto-fix', express.json(), (req, res) => {
  try {
    const trackPath = normalizeTrackPathInput(req.body?.trackPath);
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = path.join(MEDIA_ROOT, trackPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    if (!fs.existsSync(sidecarPath)) return res.status(404).json({ error: 'No lyrics file' });

    const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
    let fixCount = 0;

    // Collect all words ordered by start time
    const wordRefs = [];
    for (const line of lyrics) {
      if (!Array.isArray(line.words)) continue;
      for (const w of line.words) wordRefs.push(w);
    }
    wordRefs.sort((a, b) => a.start - b.start);

    for (let i = 1; i < wordRefs.length; i++) {
      const prev = wordRefs[i - 1];
      const curr = wordRefs[i];
      const prevEnd = parseFloat(prev.end);
      const currStart = parseFloat(curr.start);
      const overlap = prevEnd - currStart;
      if (overlap > 0 && overlap <= 0.02) {
        // Trim previous word to end at current word's start
        prev.end = curr.start;
        fixCount++;
      }
      // Fix negative/zero duration
      if (curr.end <= curr.start) {
        curr.end = curr.start + 0.05;
        fixCount++;
      }
    }

    // Remove empty words
    for (const line of lyrics) {
      if (!Array.isArray(line.words)) continue;
      const before = line.words.length;
      line.words = line.words.filter(w => {
        const text = readWordText(w);
        return text && text !== 'null' && text !== 'undefined';
      });
      fixCount += before - line.words.length;
      if (line.words.length > 0) {
        line.text = line.words.map((w) => readWordText(w)).filter(Boolean).join(' ');
        line.time = line.words[0].start;
        line.end = line.words[line.words.length - 1].end;
      }
    }

    // Backup + write
    createBackup(sidecarPath);
    fs.writeFileSync(sidecarPath, JSON.stringify(lyrics, null, 2));
    console.log(`[AutoFix] 🔧 Fixed ${fixCount} issues in ${path.basename(trackPath)}`);
    res.json({ ok: true, fixCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tracks/gold-status', (req, res) => {
  try {
    const trackPath = normalizeTrackPathInput(req.query.trackPath || req.query.path);
    if (!trackPath) return res.status(400).json({ error: 'Missing trackPath' });
    const fullPath = path.join(MEDIA_ROOT, trackPath);
    const sidecarPath = fullPath.replace(/\.[^/.]+$/, '.lyrics.json');
    let isGold = false;
    if (fs.existsSync(sidecarPath)) {
      try {
        const lyrics = JSON.parse(fs.readFileSync(sidecarPath, 'utf-8'));
        isGold = Array.isArray(lyrics) && lyrics[0]?._goldStatus === 'gold';
      } catch {}
    }
    res.json({ gold: isGold });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/ai/active-tasks', (_req, res) => {
  const tasks = [];

  // Whisper/lyrics enhance jobs
  for (const [trackPath, info] of _whisperEnhancing) {
    if (info.status === 'running') {
      // Skip stale tasks (running for >10 minutes — likely orphaned)
      const elapsed = Date.now() - (info.startedAt || 0);
      if (elapsed > 600000) {
        _whisperEnhancing.delete(trackPath);
        continue;
      }
      tasks.push({
        id: `whisper_${trackPath}`,
        type: 'lyrics',
        label: `${info.artist || ''} - ${info.title || path.basename(trackPath)}`.trim().replace(/^- /, ''),
        status: 'running',
        trackPath,
        step: info.step,
        stepLabel: info.stepLabel || info.step || 'Processing…',
        progress: 0,
        total: 1,
        startedAt: info.startedAt,
      });
    }
  }

  // Translation jobs
  for (const [jobKey, job] of _translationJobs) {
    if (job.status === 'running') {
      const [trackPath] = jobKey.split(':');
      tasks.push({
        id: `translate_${jobKey}`,
        type: 'translate',
        label: `Translating ${path.basename(trackPath)}`,
        status: 'running',
        trackPath,
        progress: job.progress || 0,
        total: job.total || 1,
        startedAt: job.startedAt,
      });
    }
  }

  res.json({ tasks });
});

app.use('/api', (_req, res) => {
  return res.status(404).json({ error: 'API route not found' });
});

app.get('*', (req, res) => {
  // SSR: Pre-render the page with initial library data embedded
  try {
    const movies = listCategoryFiles('movies').filter((item) => !item.isShowEpisode);
    const ssrData = {
      movies: { items: movies.slice(0, 50) },
    };
    // Read tab/theme from cookie for flicker-free SSR
    const cookies = {};
    (req.headers.cookie || '').split(';').forEach(c => {
      const [k, ...v] = c.trim().split('=');
      if (k) cookies[k] = decodeURIComponent(v.join('='));
    });
    const activeTab = cookies.chromic_tab || 'movies';
    const activeTheme = cookies.chromic_theme || '';
    res.render('index', { ssrData, debugLogs: DEBUG_LOGS, activeTab, activeTheme });
  } catch (err) {
    console.warn('[SSR] Falling back to static file:', err.message);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

if (require.main === module) {
  const HOST = process.env.HOST || '0.0.0.0';
  const server = app.listen(PORT, HOST, () => {
    console.log(`Media server running at http://localhost:${PORT}`);
    const localUrls = getLocalNetworkAddresses().map((address) => `http://${address}:${PORT}`);
    if (localUrls.length) {
      console.log(`Open from phone on local network: ${localUrls.join(' | ')}`);
    }
    // Start background metadata scan (non-blocking)
    backgroundScanMusicLibrary().catch(err => console.warn('[scan] Error:', err.message));
    // Warmup whisper model cache on first packaged launch (non-blocking).
    startWhisperWarmupIfNeeded();
  });
  // Allow long-running requests (translation with slow local AI models)
  server.timeout = 60 * 60 * 1000; // first-run AI installs/model downloads can be long
  server.keepAliveTimeout = 60 * 60 * 1000;
}

module.exports = {
  app,
  MOVIE_EXTENSIONS,
  getCategoryFromExt,
  isMovieExtension,
  isSidecarPreviewFile,
  findSidecarPreview,
  listMusicFiles,
  listCategoryFiles,
  needsMovieTranscoding,
  buildDisplayName,
  buildDisplayTitle,
  buildUniqueUploadFilename,
  resolveMediaPath,
  isHiddenSystemEntry,
  PREVIEW_SIDECAR_EXTENSIONS,
  parseAlbumMetadata,
  TRANSCODE_MOVFLAGS,
  parseRangeHeader,
  estimateSeekSecondsFromRange,
  buildMovieTranscodeArgs,
  buildMovieDirectStreamArgs,
  startWhisperWarmupIfNeeded,
};
