import { uiButton } from '../../ui/controls.js';
import { albumImagePool } from '../../core/ImagePool.js';

// SVG badge icons (inline, 11×11)
// Word-level synced: captions/subtitles icon (CC badge)
const _badgeSynced = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h4"/><path d="M13 15h4"/><path d="M7 11h10"/></svg>';
// Line-level synced: aligned text lines icon
const _badgeNote = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>';
const _badgeGlobe = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>';

// SVG inline icons for buttons (14×14)
const _icoCheck = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><polyline points="20 6 9 17 4 12"/></svg>';
const _icoX = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.9)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const _icoSpinner = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px;animation:lyrics-spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
const _icoGlobe = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>';
const _icoBot = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:4px"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>';

const _menuIconByKey = {
  playNext: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0 6"/><path d="M10 8l8 4-8 4V8z"/></svg>',
  addQueue: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  shuffle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
  rename: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  renameArtist: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  trackNum: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
  waveform: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M2 12h2"/><path d="M6 8v8"/><path d="M10 4v16"/><path d="M14 6v12"/><path d="M18 8v8"/><path d="M22 12h-2"/></svg>',
  translate: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>',
  cover: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  sync: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M12 2l10 10-10 10L2 12z"/></svg>',
  delete: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
};

const withImageParams = (url, width = 400) => {
  if (!url || url.startsWith('data:')) return url;
  const joiner = url.includes('?') ? '&' : '?';
  return `${url}${joiner}w=${width}&fmt=webp`;
};

function ensureMediaMoreMenuIcons(menuEl) {
  if (!menuEl) return;
  menuEl.querySelectorAll('button').forEach((btn) => {
    if (btn.querySelector('svg')) return;
    let key = null;
    if (btn.dataset.trackQueue === 'next' || btn.dataset.albumQueue === 'next') key = 'playNext';
    else if (btn.dataset.trackQueue === 'later' || btn.dataset.albumQueue === 'later') key = 'addQueue';
    else if (btn.dataset.playFromShuffle !== undefined) key = 'shuffle';
    else if (btn.dataset.renameTrack !== undefined || btn.dataset.renameAlbum !== undefined) {
      if (btn.dataset.field === 'artist') key = 'renameArtist';
      else if (btn.dataset.field === 'trackNum') key = 'trackNum';
      else key = 'rename';
    } else if (btn.dataset.regenTimestamps !== undefined || btn.dataset.regenAlbumTimestamps !== undefined) key = 'waveform';
    else if (btn.dataset.regenTranslation !== undefined || btn.dataset.regenAlbumTranslation !== undefined) key = 'translate';
    else if (btn.dataset.syncAlbumKey !== undefined) key = 'sync';
    else if (btn.dataset.translateAlbumKey !== undefined) key = 'translate';
    else if (btn.dataset.coverAlbumKey !== undefined) key = 'cover';
    else if (btn.dataset.deleteTrackId !== undefined || btn.dataset.deleteAlbumKey !== undefined) key = 'delete';
    if (key && _menuIconByKey[key]) btn.insertAdjacentHTML('afterbegin', _menuIconByKey[key]);
  });
}


/** Open AI Settings modal dialog — also exposed globally for header button */
async function _openAiSettingsModal() {
  // Remove existing modal if any
  document.getElementById('chromic-ai-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'chromic-ai-modal';
  modal.innerHTML = `
    <div class="ai-modal-backdrop"></div>
    <div class="ai-modal-content">
      <h3>${_icoBot}AI &amp; Pro Settings</h3>
      <p class="ai-settings-desc">Configure AI provider for lyrics sync, transcription, and translation.</p>
      <form id="aiModalForm" class="ai-settings-form">
        <label class="ai-field"><span>LLM Provider</span>
          <select name="llmProvider">
            <option value="openai">OpenAI</option>
            <option value="ollama">Ollama (local)</option>
            <option value="anthropic">Anthropic</option>
            <option value="custom">Custom OpenAI-compatible</option>
          </select>
        </label>
        <label class="ai-field"><span>API Key</span><input type="password" name="openaiApiKey" placeholder="sk-... (not needed for Ollama)" autocomplete="off" /></label>
        <label class="ai-field"><span>Base URL</span><input type="text" name="openaiBaseUrl" placeholder="https://api.openai.com/v1 or http://localhost:11434/v1" /></label>
        <label class="ai-field"><span>Model</span><input type="text" name="openaiModel" placeholder="gpt-4o-mini / llama3 / claude-sonnet" /></label>
        <label class="ai-field"><span>Whisper Engine</span>
          <select name="whisperEngine">
            <option value="faster">faster-whisper (fast)</option>
            <option value="whisperx">WhisperX (best quality)</option>
            <option value="mlx">MLX (Apple Silicon)</option>
          </select>
        </label>
        <label class="ai-field"><span>Whisper Model</span>
          <select name="whisperModel">
            <option value="tiny">tiny</option>
            <option value="base">base</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </label>
        <label class="ai-field"><span>Lyrics Provider</span>
          <select name="lyricsProvider">
            <option value="lrclib">LRCLIB (free, instant)</option>
            <option value="whisper">Local Whisper</option>
            <option value="openai">OpenAI Whisper API</option>
          </select>
        </label>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Enable smooth scroll on modal content
  const modalContent = modal.querySelector('.ai-modal-content');
  if (window.initChromicScroll) window.initChromicScroll(modalContent);

  // Load current settings
  try {
    const res = await fetch('/api/settings/ai');
    const config = await res.json();
    const form = modal.querySelector('#aiModalForm');
    for (const [key, val] of Object.entries(config)) {
      const input = form.querySelector('[name="' + key + '"]');
      if (input) {
        if (input.type === 'checkbox') input.checked = !!val;
        else input.value = val || '';
      }
    }
  } catch (e) { /* ignore */ }

  // Close on backdrop click, cancel, or ESC
  modal.querySelector('.ai-modal-backdrop').addEventListener('click', () => modal.remove());
  modal.querySelector('#aiModalClose').addEventListener('click', () => modal.remove());
  const _escHandler = (e) => {
    if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', _escHandler); }
  };
  document.addEventListener('keydown', _escHandler);

  // Save
  modal.querySelector('#aiModalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {};
    form.querySelectorAll('input, select').forEach(el => {
      if (el.name) data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
    });
    const status = modal.querySelector('#aiModalStatus');
    try {
      await fetch('/api/settings/ai', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (status) status.innerHTML = `${_icoCheck}Saved!`;
      setTimeout(() => modal.remove(), 1000);
    } catch (err) {
      if (status) status.innerHTML = `${_icoX}Error`;
    }
  });
}

// Expose globally so header & overlay can use it
window._openAiSettingsModal = _openAiSettingsModal;

const formatTrackDuration = (track) => {
  const seconds = Number(track?.durationSeconds);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return null;
  }
  const mins = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${mins}:${secs}`;
};

/** Format album title: clean folder name, optionally strip artist prefix */
const formatAlbumTitle = (name, artist) => {
  let title = cleanNavTitle(name || '');
  if (artist && title.toLowerCase().startsWith(artist.toLowerCase() + ' ')) {
    title = title.slice(artist.length + 1).trim();
  }
  if (artist && title.toLowerCase().startsWith(artist.toLowerCase() + ' - ')) {
    title = title.slice(artist.length + 3).trim();
  }
  return title || name || 'Untitled';
};

/** Infer the album year from tracks (highest year found) */
const inferAlbumYear = (tracks) => {
  if (!tracks || !tracks.length) return '';
  const years = tracks.map(t => Number(t.year)).filter(y => y > 1900 && y < 2100);
  return years.length ? String(Math.max(...years)) : '';
};

/** Infer the most common artist from an album's track list */
const inferAlbumArtist = (tracks) => {
  if (!tracks || !tracks.length) return '';
  const counts = {};
  for (const t of tracks) {
    const a = (t.artist || '').trim();
    if (a) counts[a] = (counts[a] || 0) + 1;
  }
  let best = '', max = 0;
  for (const [name, c] of Object.entries(counts)) {
    if (c > max) { max = c; best = name; }
  }
  return best;
};

const cleanNavTitle = (rawName) => {
  if (!rawName) return 'Untitled';
  return rawName
    .replace(/\{[^}]*\}/g, '')           // Remove {anything}
    .replace(/\[[^\]]*\]/g, '')           // Remove [anything]
    .replace(/\(\d{4}\)/g, '')            // Remove (year) like (2021)
    .replace(/\((?:CD-?)?(?:FLAC|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD|PERFECT|OUTERSPACE|C4|seedpool|Deluxe)[^)]*\)/gi, '') // Remove codec/tag parens
    .replace(/[-_]/g, ' ')               // Replace hyphens/underscores with spaces
    .replace(/\b(CD|FLAC|MP3|AAC|OGG|WAV|DSD|ALAC|OPUS|WMA|SACD|PERFECT|OUTERSPACE|CDEP|C4|seedpool|kHz|Bits?)\b/gi, '') // Remove standalone codec words
    .replace(/\b\d{1,2}\.\d{1,2}kHz\b/gi, '') // Remove sample rates like 44.1kHz
    .replace(/\b\d{2}Bits?\b/gi, '')     // Remove bit depths like 24Bits
    .replace(/\b(Limited.Edition|Deluxe.Edition)\b/gi, '') // Remove edition labels
    .replace(/\b\d{4}\b/g, '')           // Remove standalone years
    .replace(/\s\s+/g, ' ')
    .trim() || 'Untitled';
};

/**
 * Strip codec/technical info from track names (e.g. "Song (FLAC 16_44.1 kHz)" → "Song")
 */
const cleanCodecFromName = (name) => {
  if (!name) return '';
  return name
    .replace(/\s*[\(\[][^)\]]*(FLAC|MP3|kHz|bit|Hz|ch|kbps|AAC|OGG|ALAC|WAV|DSD|SACD|WMA|OPUS)[^)\]]*[\)\]]/gi, '')
    .trim();
};

/**
 * Strip artist prefix, album name, track number, and (Explicit) tags from title.
 * Returns { cleanTitle, isExplicit, secondaryArtist, extractedTrackNumber }
 */
const parseTrackTitle = (rawTitle, albumArtist, albumName) => {
  let title = cleanCodecFromName(rawTitle);
  // Replace underscores with spaces early — filenames use underscores as word separators
  title = title.replace(/_/g, ' ');
  let isExplicit = false;
  let secondaryArtist = null;
  let extractedTrackNumber = null;

  // Strip leading artist name + separator (e.g. "Melanie Martinez - Song")
  // If albumArtist is null, try to infer from albumName pattern "Artist - Album"
  let effectiveArtist = albumArtist;
  if (!effectiveArtist && albumName) {
    const artistFromName = albumName.match(/^(.+?)\s*[-–—]\s*.+/);
    if (artistFromName) {
      effectiveArtist = artistFromName[1].trim();
    }
  }
  if (effectiveArtist) {
    const escaped = effectiveArtist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const artistPrefixRe = new RegExp(`^${escaped}\\s*[-–—]\\s*`, 'i');
    title = title.replace(artistPrefixRe, '');
    // Also try underscore/hyphen variant (filename pattern: "lana_del_rey-song")
    const underscoreArtist = effectiveArtist.replace(/\s+/g, '[_ ]');
    const artistUnderscoreRe = new RegExp(`^${underscoreArtist}\\s*[-–—]\\s*`, 'i');
    title = title.replace(artistUnderscoreRe, '');
  }

  // Strip album name if it appears next (e.g. "THEY COULD NEVER... - 08 - Song")
  if (albumName) {
    // Try with full album name first, then without trailing year like "(2024)"
    const albumVariants = [albumName, albumName.replace(/\s*\(\d{4}\)\s*$/, '').trim()];
    for (const variant of albumVariants) {
      if (!variant) continue;
      const escapedAlbum = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const albumPrefixRe = new RegExp(`^${escapedAlbum}\\s*[-–—]\\s*`, 'i');
      if (albumPrefixRe.test(title)) {
        title = title.replace(albumPrefixRe, '');
        break;
      }
    }
  }

  // Extract track number if title starts with digits + separator (e.g. "08 - Song", "0112 - Song")
  const trackNumMatch = title.match(/^(\d{1,4})\s*[-–—.]\s*/);
  if (trackNumMatch) {
    const raw = trackNumMatch[1];
    // 4-digit DDTT format (e.g. "0112" → disc 01, track 12): extract track part
    // 3-digit DTT format (e.g. "112" → disc 1, track 12): extract track part
    if (raw.length === 4) {
      extractedTrackNumber = Number(raw.slice(2));
    } else if (raw.length === 3) {
      extractedTrackNumber = Number(raw.slice(1));
    } else {
      extractedTrackNumber = Number(raw);
    }
    title = title.slice(trackNumMatch[0].length);
  }

  // Fallback: if title still looks like "Artist - Album - ## - Song", try aggressive strip
  if (!extractedTrackNumber) {
    const aggressiveMatch = title.match(/^.+?\s*[-–—]\s*\d{1,4}\s*[-–—]\s*/);
    if (aggressiveMatch) {
      const numInMatch = aggressiveMatch[0].match(/(\d{1,4})\s*[-–—]\s*$/);
      if (numInMatch) {
        extractedTrackNumber = Number(numInMatch[1]);
      }
      title = title.slice(aggressiveMatch[0].length);
    }
  }

  // Fallback 2: "AlbumName - ## Title" (number followed by space, no trailing separator)
  if (!extractedTrackNumber) {
    const midNumMatch = title.match(/^(.+?)\s*[-–—]\s*(\d{1,4})\s+(.+)$/);
    if (midNumMatch) {
      const raw = midNumMatch[2];
      if (raw.length === 4) {
        extractedTrackNumber = Number(raw.slice(2));
      } else if (raw.length === 3) {
        extractedTrackNumber = Number(raw.slice(1));
      } else {
        extractedTrackNumber = Number(raw);
      }
      title = midNumMatch[3];
    }
  }

  // If title still looks like "Artist1, Artist2 AlbumName (junk)", try to extract using album name
  if (albumName && albumName.length >= 2) {
    const normAlbum = albumName.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const normTitle = title.replace(/[^a-z0-9]/gi, '').toLowerCase();
    if (normAlbum.length >= 2 && normTitle !== normAlbum && (normTitle.endsWith(normAlbum) || (normAlbum.length >= 3 && normTitle.includes(normAlbum)))) {
      // The raw title contains the album name embedded — use album name as clean title
      title = albumName;
    }
  }

  // Extract (Explicit) / [Explicit] badge
  if (/[\(\[]Explicit[\)\]]/i.test(title)) {
    isExplicit = true;
    title = title.replace(/\s*[\(\[]Explicit[\)\]]\s*/gi, '').trim();
  }
  // Also detect "explicit" as a standalone word at end of title
  if (/\bexplicit\s*$/i.test(title)) {
    isExplicit = true;
    title = title.replace(/\s*\bexplicit\s*$/i, '').trim();
  }

  // Extract feat./ft. as secondary artist
  const featMatch = title.match(/\s*[\(\[](feat\.?|ft\.?)\s*(.+?)[\)\]]\s*/i);
  if (featMatch) {
    secondaryArtist = featMatch[2].trim();
    title = title.replace(featMatch[0], '').trim();
  }

  return { cleanTitle: title, isExplicit, secondaryArtist, extractedTrackNumber };
};

/**
 * Render a single track row (reused by disc grouping)
 */
const renderTrackRow = (track, activeTrackId, albumArtist, albumTitle, escapeHtml, assetStatus, fallbackIndex) => {
  const { cleanTitle, isExplicit, secondaryArtist, extractedTrackNumber } = parseTrackTitle(track.title || track.name, albumArtist, albumTitle);
  const trackNum = track.trackNumber || extractedTrackNumber || fallbackIndex || '—';
  const duration = formatTrackDuration(track);
  const displayArtist = secondaryArtist
    ? `feat. ${secondaryArtist}`
    : (track.artist || albumArtist || '');
  const syncLabel = assetStatus?.hasSynced ? 'Re-Sync Word Timestamps' : 'Regenerate Word Timestamps';
  const translateLabel = assetStatus?.hasTranslation ? 'Re-Translate' : 'Regenerate Translation';
  const statusBadges = [];
  if (assetStatus?.syncedWords) statusBadges.push(`<span class="track-status-badge synced" title="Word-synced lyrics — each word timed individually for karaoke-style display">${_badgeSynced}</span>`);
  else if (assetStatus?.hasSynced) statusBadges.push(`<span class="track-status-badge synced-plain" title="Line-synced lyrics — lines timed to music playback">${_badgeNote}</span>`);
  if (assetStatus?.hasTranslation) statusBadges.push(`<span class="track-status-badge translated" title="Translation available — lyrics translated to another language">${_badgeGlobe}</span>`);
  const badgesHtml = statusBadges.length ? statusBadges.join('') : '';
  return `
    <tr class="album-track-row focusable ${track.id === activeTrackId ? 'active' : ''}" data-track-id="${track.id}" tabindex="0">
      <td class="col-select" hidden><label class="track-select-checkbox"><input type="checkbox" data-select-track="${track.id}" /><span class="track-checkbox-visual"></span></label></td>
      <td class="col-num">${trackNum}</td>
      <td class="col-title">
        <span class="track-title-main">${escapeHtml(cleanTitle)}</span>${isExplicit ? '<span class="explicit-badge" aria-label="Explicit">E</span>' : ''}${badgesHtml}${displayArtist ? `<span class="track-artist-secondary">${escapeHtml(displayArtist)}</span>` : ''}
      </td>
      <td class="col-duration">${duration || '—'}</td>
      <td class="col-actions">
        <div class="album-track-actions">
          <button type="button" class="track-action-icon focusable" data-track-queue="next" data-track-id="${track.id}" aria-label="Play Next" title="Play Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h8M2 7h6M2 11h4M12 5v8M10 9l2-2 2 2"/></svg>
          </button>
          <button type="button" class="track-action-icon focusable" data-track-queue="later" data-track-id="${track.id}" aria-label="Play Later" title="Play Later">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h8M2 7h6M2 11h4M12 7v6M10 11l2 2 2-2"/></svg>
          </button>
          <div class="media-more-wrap">
             <button type="button" class="track-action-icon track-more-btn focusable" data-more-toggle aria-label="More options for ${escapeHtml(cleanTitle)}">⋯</button>
             <div class="media-more-menu" data-more-menu hidden>
               <button type="button" data-track-queue="next" data-track-id="${track.id}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0 6"/><path d="M10 8l8 4-8 4V8z"/></svg>Play Next</button>
               <button type="button" data-track-queue="later" data-track-id="${track.id}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add to Queue</button>
               <button type="button" data-play-from-shuffle data-track-id="${track.id}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>Play from Here (Shuffle)</button>
               <hr class="menu-divider" />
               <button type="button" data-rename-track data-track-id="${track.id}" data-field="title"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Rename Track</button>
               <button type="button" data-rename-track data-track-id="${track.id}" data-field="artist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Rename Artist</button>
               <button type="button" data-rename-track data-track-id="${track.id}" data-field="trackNum"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>Change Track #</button>
               <hr class="menu-divider" />
               <button type="button" data-regen-timestamps data-track-id="${track.id}"${assetStatus?.hasSynced ? '' : ' hidden'}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M2 12h2"/><path d="M6 8v8"/><path d="M10 4v16"/><path d="M14 6v12"/><path d="M18 8v8"/><path d="M22 12h-2"/></svg>${syncLabel}</button>
               <button type="button" data-regen-translation data-track-id="${track.id}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>${translateLabel}</button>
               <hr class="menu-divider" />
               <button type="button" class="menu-action-danger" data-delete-track-id="${track.id}" aria-label="Delete ${escapeHtml(cleanTitle)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete</button>
               <hr class="menu-divider" />
               <button type="button" data-select-mode-toggle><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Select Tracks</button>
             </div>
           </div>
        </div>
      </td>
    </tr>`;
};

/**
 * Build track table(s), grouping by disc number if multi-disc album.
 */
const buildDiscGroupedTracks = (tracks, activeTrackId, albumArtist, albumTitle, escapeHtml, assetStatuses) => {
  // Group by disc
  const discs = {};
  tracks.forEach(track => {
    const d = track.disc || 1;
    if (!discs[d]) discs[d] = [];
    discs[d].push(track);
  });

  // Sort tracks within each disc by track number
  Object.values(discs).forEach(discTracks => {
    discTracks.sort((a, b) => (a.trackNumber || 0) - (b.trackNumber || 0));
  });

  const discNumbers = Object.keys(discs).map(Number).sort((a, b) => a - b);
  const isMultiDisc = discNumbers.length > 1;

  const tableHead = `
    <thead>
      <tr>
        <th class="col-select" hidden><label class="track-select-checkbox track-select-all-checkbox"><input type="checkbox" data-select-all /><span class="track-checkbox-visual"></span></label></th>
        <th class="col-num">#</th>
        <th class="col-title">Title</th>
        <th class="col-duration">Time</th>
        <th class="col-actions"></th>
      </tr>
    </thead>`;

  return discNumbers.map(discNum => {
    const discTracks = discs[discNum];
    const discTitle = isMultiDisc ? `<h4 class="disc-section-title">Disc ${discNum}</h4>` : '';
    return `
      ${discTitle}
      <table class="album-track-table" aria-label="${isMultiDisc ? `Disc ${discNum} tracks` : 'Album tracks'}">
        ${tableHead}
        <tbody>
          ${discTracks.map((track, idx) => renderTrackRow(track, activeTrackId, albumArtist, albumTitle, escapeHtml, assetStatuses?.[decodeURIComponent(track.path || track.id)], idx + 1)).join('')}
        </tbody>
      </table>`;
  }).join('');
};

/**
 * Dynamically update album view DOM with real metadata from /api/track-info.
 * Call this after fetchAndDisplayLyrics resolves.
 */
export const updateAlbumViewMetadata = (grid, { trackId, title, artist, album, year, duration }) => {
  if (!grid) return;
  const albumView = grid.querySelector('.music-album-view');
  if (!albumView) return;

  // Update album title if we got a real album name
  if (album) {
    const titleEl = albumView.querySelector('.album-view-meta h3');
    if (titleEl) titleEl.textContent = album;
  }

  // Update/show album year
  if (year) {
    let metaLine = albumView.querySelector('[data-album-year]');
    if (metaLine) {
      metaLine.textContent = metaLine.textContent.replace(/•\s*\d{4}/, `• ${year}`);
      if (!metaLine.textContent.includes(year)) {
        metaLine.textContent += ` • ${year}`;
      }
    } else {
      // Find the artist/year paragraph and inject year
      const metaPs = albumView.querySelectorAll('.album-view-meta p');
      for (const p of metaPs) {
        if (p.classList.contains('album-view-kicker')) continue;
        if (!p.hasAttribute('data-album-year')) {
          p.setAttribute('data-album-year', '');
          if (p.textContent && !p.textContent.includes(year)) {
            p.textContent = p.textContent ? `${p.textContent} • ${year}` : year;
          }
          break;
        }
      }
    }
  }

  // Update artist in header if we get a real one
  if (artist) {
    const artistEl = albumView.querySelector('[data-album-artist]');
    if (artistEl) {
      artistEl.textContent = artist;
    } else {
      // Insert artist element if it was hidden
      const metaDiv = albumView.querySelector('.album-view-meta');
      const kicker = metaDiv?.querySelector('.album-view-kicker');
      if (metaDiv && kicker) {
        const existingInfo = metaDiv.querySelector('[data-album-info]');
        if (existingInfo) {
          const parts = [];
          parts.push(artist);
          if (year) parts.push(year);
          existingInfo.innerHTML = parts.join(' • ');
        }
      }
    }
  }

  // Update specific track row title/artist/duration
  if (trackId) {
    const row = albumView.querySelector(`tr[data-track-id="${CSS.escape(trackId)}"]`);
    if (row) {
      if (title) {
        const titleCell = row.querySelector('.col-title .track-title-main');
        if (titleCell) titleCell.textContent = title;
      }
      if (duration) {
        const durationCell = row.querySelector('.col-duration');
        if (durationCell) {
          const secs = Number(duration);
          if (Number.isFinite(secs) && secs > 0) {
            const mins = Math.floor(secs / 60);
            const s = String(Math.floor(secs % 60)).padStart(2, '0');
            durationCell.textContent = `${mins}:${s}`;
          }
        }
      }
    }
  }
};

export const renderMusicAlbumView = ({
  albums,
  activeAlbumKey,
  activeTrackId,
  grid,
  escapeHtml,
  resolvePreviewUrl,
  onAlbumSelect,
  onTrackSelect,
  onQueueAction,
  onExpand,
  onBackToAlbums,
  onDeleteTrack,
  onDeleteAlbum,
}) => {
  grid.onclick = null;
  if (grid._trackAssetsListener) {
    document.removeEventListener('chromic:track-assets-updated', grid._trackAssetsListener);
    grid._trackAssetsListener = null;
  }

  if (!albums.length) {
    grid.innerHTML = '';
    return;
  }

  // Helper: animate mosaic tile refresh with staggered 3D flip (runs immediately)
  const animateMosaicRefresh = (tile, newCovers) => {
    tile.dataset.mosaicKeys = newCovers.map(a => encodeURIComponent(a.key)).join(',');
    tile.dataset.mosaicIndex = '0';
    const mosaic = tile.querySelector('.shuffle-all-mosaic');
    if (!mosaic) return;
    const cells = mosaic.querySelectorAll('.mosaic-cell');
    newCovers.forEach((a, i) => {
      const cell = cells[i];
      const img = cell?.querySelector('img');
      if (!img || !cell) return;
      const url = a.previewUrl || resolvePreviewUrl(a.tracks[0]);
      const newSrc = withImageParams(url, 200) || '';
      setTimeout(() => {
        // Set the NEW cover as blurred backface (visible during flip)
        cell.style.setProperty('--mosaic-blur-bg', `url('${newSrc}')`);
        cell.classList.add('flipping');
        img.classList.remove('mosaic-flip');
        void img.offsetWidth;
        img.classList.add('mosaic-flip');
        // Swap src at midpoint when image is invisible (rotated 90°)
        setTimeout(() => { img.src = newSrc; }, 250);
        img.addEventListener('animationend', () => {
          img.classList.remove('mosaic-flip');
          cell.classList.remove('flipping');
        }, { once: true });
      }, i * 150);
    });
  };

  const activeAlbum = albums.find((album) => album.key === activeAlbumKey) || null;

  if (!activeAlbum) {
    // Build a stable fingerprint to detect if albums actually changed
    const albumFingerprint = albums.map((a) => a.key + ':' + a.tracks.length).join('|');
    const cachedGrid = grid._cachedAlbumsGrid;

    if (cachedGrid && grid._cachedAlbumsFingerprint === albumFingerprint) {
      // Reuse cached DOM — just restore it without rebuilding
      if (cachedGrid.parentNode !== grid) {
        // Remove album detail view if present, then re-attach cached grid
        grid.innerHTML = '';
        grid.appendChild(cachedGrid);
      }
      cachedGrid.style.display = '';
      // Ensure all cards are visible (no stagger reset)
      cachedGrid.querySelectorAll('.stagger-item').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = '';
        el.style.willChange = '';
        el.dataset.staggerDone = '1';
      });
      // Re-activate ImagePool for restored grid — only if images need loading
      const hasUnloadedImages = cachedGrid.querySelector('img[data-src]:not([src*="/api/"])');
      if (hasUnloadedImages) {
        albumImagePool.observeAll(cachedGrid);
        albumImagePool.revealAll();
      }

      // Re-attach click handler (since we null it at the top) but skip heavy color extraction
      grid.onclick = async (event) => {
        // Shuffle All tile - allow this even when player is expanded
        const shuffleBtn = event.target.closest?.('[data-shuffle-all-btn]');
        if (shuffleBtn) {
          event.preventDefault();
          event.stopPropagation();
          console.log('[MOSAIC-DEBUG] Shuffle-all clicked (cached grid)');

          const tile = shuffleBtn.closest?.('.shuffle-all-tile');
          if (!tile) {
            console.log('[MOSAIC-DEBUG] No tile found!');
            return;
          }

          // Stop auto-refresh once user interacts with the tile
          tile.dataset.mosaicUserActivated = '1';

          let mosaicKeys = (tile?.dataset?.mosaicKeys || '').split(',').map(k => decodeURIComponent(k)).filter(Boolean);
          let mosaicIdx = parseInt(tile?.dataset?.mosaicIndex || '0', 10) || 0;

          console.log('[MOSAIC-DEBUG] Click! mosaicIdx:', mosaicIdx, 'of', mosaicKeys.length, 'keys:', mosaicKeys);

          // If no mosaic keys (first time or error), initialize with random albums
          if (mosaicKeys.length === 0) {
            console.log('[MOSAIC-DEBUG] No mosaic keys, initializing...');
            const newCovers = albums.length >= 4
              ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
              : albums.slice(0, Math.min(4, albums.length));
            animateMosaicRefresh(tile, newCovers);
            mosaicKeys = newCovers.map(a => a.key);
            tile.dataset.mosaicKeys = newCovers.map(a => encodeURIComponent(a.key)).join(',');
            tile.dataset.mosaicIndex = '0';
            mosaicIdx = 0;
          }

          // Get the current mosaic album to play
          const currentKey = mosaicKeys[mosaicIdx] || '';
          const album = albums.find(a => a.key === currentKey);

          console.log('[MOSAIC-DEBUG] Current album key:', currentKey, 'found:', !!album, 'tracks:', album?.tracks?.length);

          if (!album?.tracks?.length) {
            // Skip to next if album has no tracks
            tile.dataset.mosaicIndex = String(mosaicIdx + 1);
            console.log('[MOSAIC-DEBUG] No tracks, skipping to next');
            return;
          }

          // Get the first track from this album
          const trackToPlay = album.tracks[0];
          console.log('[MOSAIC-DEBUG] Track to play:', trackToPlay?.title || trackToPlay?.name, 'ID:', trackToPlay?.id);

          // Build queue: ALL tracks from ALL 4 mosaic albums (in order), starting from current album
          const queueTracks = [];
          const seenUrls = new Set();

          // First: all tracks from current album onwards
          for (let i = mosaicIdx; i < mosaicKeys.length; i++) {
            const a = albums.find(al => al.key === mosaicKeys[i]);
            if (a?.tracks?.length) {
              for (const t of a.tracks) {
                if (!seenUrls.has(t.url)) {
                  queueTracks.push(t);
                  seenUrls.add(t.url);
                }
              }
            }
          }
          // Then: albums before current (wrap around for continuous play)
          for (let i = 0; i < mosaicIdx; i++) {
            const a = albums.find(al => al.key === mosaicKeys[i]);
            if (a?.tracks?.length) {
              for (const t of a.tracks) {
                if (!seenUrls.has(t.url)) {
                  queueTracks.push(t);
                  seenUrls.add(t.url);
                }
              }
            }
          }

          console.log('[MOSAIC-DEBUG] Queue built with', queueTracks.length, 'tracks from mosaic albums only');

          // Advance mosaic index for next click
          const nextIdx = mosaicIdx + 1;
          tile.dataset.mosaicIndex = String(nextIdx);
          console.log('[MOSAIC-DEBUG] Advanced mosaicIndex to', nextIdx);

          // If this was the 4th (last) mosaic album, queue the flip to happen after close animation
          if (nextIdx >= mosaicKeys.length) {
            console.log('[MOSAIC-DEBUG] This is the last mosaic track - queuing flip for after close');
            const newCovers = albums.length >= 4
              ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
              : albums.slice(0, Math.min(4, albums.length));
            // Queue the mosaic flip to happen after overlay close animation completes
            grid._afterFlipCallbacks = grid._afterFlipCallbacks || [];
            grid._afterFlipCallbacks.push(() => {
              console.log('[MOSAIC-DEBUG] Executing queued mosaic flip');
              animateMosaicRefresh(tile, newCovers);
              // Reset index for the NEW mosaic set
              tile.dataset.mosaicKeys = newCovers.map(a => encodeURIComponent(a.key)).join(',');
              tile.dataset.mosaicIndex = '0';
            });
          }

          const fakeAlbum = { key: '__shuffle_mosaic__', name: 'Shuffle All', tracks: queueTracks };
          const sourceElement = tile || shuffleBtn;
          // Pass startTrackId so player knows which track to start (not just first in queue)
          onExpand(fakeAlbum, { sourceElement, shuffle: false, preOrdered: true, startTrackId: trackToPlay.id });
          return;
        }
        const moreToggle = event.target.closest?.('[data-more-toggle]');
        if (moreToggle) {
          event.preventDefault();
          event.stopPropagation();
          const existing = document.getElementById('chromic-floating-menu');
          if (existing) { existing.remove(); return; }
          const menu = moreToggle.parentElement?.querySelector?.('[data-more-menu]');
          if (!menu) return;
          const shouldOpen = menu.hidden;
          grid.querySelectorAll('[data-more-menu]').forEach((m) => { m.hidden = true; });
          menu.hidden = !shouldOpen;
          return;
        }
        const deleteButton = event.target.closest?.('[data-delete-album-key]');
        if (deleteButton) {
          event.preventDefault();
          event.stopPropagation();
          const albumKey = deleteButton.dataset.deleteAlbumKey;
          if (albumKey) await onDeleteAlbum?.(albumKey);
          return;
        }
        const playButton = event.target.closest?.('[data-play-album-key]');
        if (playButton) {
          event.preventDefault();
          event.stopPropagation();
          const albumKey = playButton.dataset.playAlbumKey;
          const album = albums.find(a => a.key === albumKey);
          if (album) {
            const sourceElement = playButton.closest?.('[data-album-card]') || playButton;
            onExpand(album, { sourceElement });
          }
          return;
        }
        const albumButton = event.target.closest?.('[data-album-key]');
        if (albumButton) {
          event.preventDefault();
          const sourceElement = albumButton.closest?.('[data-album-card]') || albumButton;
          onAlbumSelect(albumButton.dataset.albumKey, { sourceElement });
        }
      };

      // Auto-refresh mosaic tile every 30s if user hasn't clicked Shuffle All yet
      if (grid._mosaicAutoInterval) clearInterval(grid._mosaicAutoInterval);
      grid._mosaicAutoInterval = setInterval(() => {
        const tile = grid.querySelector('.shuffle-all-tile');
        if (!tile || tile.dataset.mosaicUserActivated) return;
        if (document.body.classList.contains('music-overlay-open')) return;
        const newCovers = albums.length >= 4
          ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
          : albums.slice(0, Math.min(4, albums.length));
        animateMosaicRefresh(tile, newCovers);
      }, 30000);

      return;
    } else {
      // Build "Shuffle All" tile with 2x2 mosaic of random album covers
      const shuffleCovers = albums.length >= 4
        ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
        : albums.slice(0, Math.min(4, albums.length));
      const shuffleMosaic = shuffleCovers.map(a => {
        const url = a.previewUrl || resolvePreviewUrl(a.tracks[0]);
        return withImageParams(url, 200);
      });
      const totalTracks = albums.reduce((sum, a) => sum + a.tracks.length, 0);

      grid.innerHTML = `
      <section class="music-albums-grid" aria-label="Albums">
        <article class="music-album-grid-item stagger-item shuffle-all-tile" data-shuffle-all data-mosaic-keys="${shuffleCovers.map(a => encodeURIComponent(a.key)).join(',')}" style="--stagger-delay: 0ms;">
          <button type="button" class="music-album-grid-open shuffle-all-btn focusable" data-shuffle-all-btn>
            <div class="shuffle-all-mosaic">
              ${shuffleMosaic.map(url => `<div class="mosaic-cell" style="--mosaic-blur-bg: url('${url}')"><img src="${url}" alt="" decoding="async" loading="lazy" /></div>`).join('')}
            </div>
            <div class="shuffle-all-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
              <span>Shuffle All</span>
              <span class="music-album-grid-meta">${totalTracks} tracks</span>
            </div>
          </button>
        </article>
        ${albums
          .map(
            (album, index) => `
            <article class="music-album-grid-item stagger-item img-loading" data-album-card="${escapeHtml(album.key)}" style="--stagger-delay: ${Math.min((index + 1) * 50, 1500)}ms;">
              <button type="button" class="music-album-grid-open focusable" data-album-key="${escapeHtml(album.key)}">
                <img data-src="${withImageParams(album.previewUrl || resolvePreviewUrl(album.tracks[0]), 400)}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E" alt="${escapeHtml(album.name)} cover" decoding="async" loading="lazy" />
                <span class="music-album-grid-title">${escapeHtml(cleanNavTitle(album.name))}</span>
                <span class="music-album-grid-meta">${album.tracks.length} tracks</span>
              </button>
              <button type="button" class="album-grid-play-btn focusable" data-play-album-key="${escapeHtml(album.key)}" aria-label="Play ${escapeHtml(album.name)}"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg></button>
             </article>
          `,
          )
          .join('')}
        <article class="music-album-grid-item stagger-item graveyard-tile" style="--stagger-delay: ${Math.min((albums.length + 1) * 50, 1500)}ms;">
          <button type="button" class="music-album-grid-open graveyard-btn focusable" data-graveyard-btn>
            <div class="graveyard-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </div>
            <span class="music-album-grid-title">Trash</span>
            <span class="music-album-grid-meta graveyard-count"></span>
          </button>
        </article>
      </section>
    `;

      // ── Graveyard/Trash view ──
      // Add trash tile click handler
      const trashTile = grid.querySelector('[data-graveyard-btn]');
      if (trashTile) {
        trashTile.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Save scroll position so ESC/back can restore it
          if (window.musicRuntime) {
            window.musicRuntime._albumsScrollTop = window.scrollY || 0;
          }
          await showGraveyardView(grid, escapeHtml);
          window.scrollTo(0, 0);
        });
      }

      // Fetch trash count
      const graveyardCountEl = grid.querySelector('.graveyard-count');
      if (graveyardCountEl) {
        fetch('/api/media/deleted').then(r => r.json()).then(data => {
          const count = data?.tracks?.length || 0;
          graveyardCountEl.textContent = count > 0 ? `${count} deleted` : 'empty';
          // Hide the graveyard tile if no deleted tracks
          const graveyardTile = graveyardCountEl.closest('.graveyard-tile');
          if (graveyardTile && count === 0) graveyardTile.style.display = 'none';
        }).catch(() => {});
      }

      // Cache the grid section for reuse
      grid._cachedAlbumsGrid = grid.querySelector('.music-albums-grid');
      grid._cachedAlbumsFingerprint = albumFingerprint;

      // Activate ImagePool — observes images and loads them as they scroll into view
      albumImagePool.destroy(); // Clear previous observers
      albumImagePool.observeAll(grid._cachedAlbumsGrid);


      // Scroll-freeze: disable expensive effects while scrolling, except the hovered card
      if (!grid._scrollFreezeAttached) {
        grid._scrollFreezeAttached = true;
        let scrollFreezeTimer = 0;
        let hoveredCard = null;
        const HOVER_RESTORE_MS = 420;
        const albumsGrid = () => grid._cachedAlbumsGrid || grid.querySelector('.music-albums-grid');

        const armHoverRestore = (card) => {
          if (!card) return;
          card.classList.add('scroll-frozen-card');
          if (card._hoverRestoreTimer) clearTimeout(card._hoverRestoreTimer);
          card._hoverRestoreTimer = setTimeout(() => {
            card.classList.remove('scroll-frozen-card');
            card._hoverRestoreTimer = 0;
          }, HOVER_RESTORE_MS);
        };

        // Track which card is hovered
        grid.addEventListener('pointerenter', (e) => {
          const card = e.target.closest?.('.music-album-grid-item');
          if (card) {
            hoveredCard = card;
            if (card._hoverRestoreTimer) {
              clearTimeout(card._hoverRestoreTimer);
              card._hoverRestoreTimer = 0;
            }
            card.classList.add('scroll-frozen-card');
          }
        }, true);
        grid.addEventListener('pointerleave', (e) => {
          const card = e.target.closest?.('.music-album-grid-item');
          if (card) {
            if (card === hoveredCard) hoveredCard = null;
            // Ignore child-level leave events while pointer is still inside the card.
            if (card.matches(':hover')) return;
            armHoverRestore(card);
          }
        }, true);

        window.addEventListener('scroll', () => {
          const ag = albumsGrid();
          if (!ag || ag.closest('.library-view.view-hidden')) return;
          if (!ag.classList.contains('scroll-perf-freeze')) {
            ag.classList.add('scroll-perf-freeze');
            // Keep hovered card transitions active while grid is temporarily frozen.
            if (hoveredCard) hoveredCard.classList.add('scroll-frozen-card');
          }
          clearTimeout(scrollFreezeTimer);
          scrollFreezeTimer = setTimeout(() => {
            ag?.classList.remove('scroll-perf-freeze');
          }, 200);
        }, { passive: true });

        // Smooth scroll dampener — slower, buttery scroll for the music grid
        let _smoothScrollTarget = window.scrollY;
        let _smoothScrollRaf = 0;
        let _smoothScrollActive = false;
        const SCROLL_DAMPING = 0.55; // 0-1: lower = slower scroll
        const SCROLL_LERP_BASE = 0.38;    // interpolation speed (higher = faster convergence, fewer frames)
        let _scrollLerp = SCROLL_LERP_BASE;
        let _appThrottled = false;

        // When app loses/gains focus, adapt scroll behavior
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            // App backgrounded — snap any active scroll immediately
            if (_smoothScrollActive) {
              window.scrollTo(0, _smoothScrollTarget);
              _smoothScrollActive = false;
              window._chromicSmoothScrollActive = false;
              cancelAnimationFrame(_smoothScrollRaf);
            }
            // Pause visualizer warm idle to free GPU
            if (window.musicRuntime?.mathVisualizer && !document.body.classList.contains('music-overlay-open')) {
              window.musicRuntime.mathVisualizer.setMaxFps(0);
            }
          } else {
            // App foregrounded — use faster LERP for 4s to compensate for GPU recovery
            _appThrottled = true;
            _scrollLerp = 0.45;
            setTimeout(() => { _appThrottled = false; _scrollLerp = SCROLL_LERP_BASE; }, 4000);
            // Resume visualizer warm idle
            if (window.musicRuntime?.mathVisualizer && !document.body.classList.contains('music-overlay-open')) {
              window.musicRuntime.mathVisualizer.setMaxFps(1);
            }
          }
        });
        window.addEventListener('focus', () => {
          _appThrottled = true;
          _scrollLerp = 0.45;
          setTimeout(() => { _appThrottled = false; _scrollLerp = SCROLL_LERP_BASE; }, 4000);
        });

        let _scrollFrameLast = 0;

        const _smoothStep = () => {
          const now = performance.now();
          let delta = 0;
          if (_scrollFrameLast > 0) {
            delta = now - _scrollFrameLast;
            // If rAF was blocked for >500ms (app backgrounded, overlay animation), snap to target
            if (delta > 500) {
              window.scrollTo(0, _smoothScrollTarget);
              _smoothScrollActive = false;
              window._chromicSmoothScrollActive = false;
              _scrollFrameLast = 0;
              return;
            }
            // Adaptive LERP: if frames are slow (>18ms), increase lerp to converge faster
            if (delta > 18) {
              _scrollLerp = Math.min(0.5, _scrollLerp + 0.05);
            } else if (!_appThrottled) {
              _scrollLerp = Math.max(SCROLL_LERP_BASE, _scrollLerp - 0.02);
            }
          }
          _scrollFrameLast = now;

          const current = window.scrollY;
          const diff = _smoothScrollTarget - current;
          // Bail: already at target, overlay open, or at page bounds with no movement
          if (Math.abs(diff) < 2 || document.body.classList.contains('music-overlay-open')) {
            _smoothScrollActive = false;
            window._chromicSmoothScrollActive = false;
            _scrollFrameLast = 0;
            return;
          }
          // For large jumps (programmatic scrollTo or page change), snap instantly
          if (Math.abs(diff) > 2000) {
            window.scrollTo(0, _smoothScrollTarget);
            _smoothScrollActive = false;
            window._chromicSmoothScrollActive = false;
            _scrollFrameLast = 0;
            return;
          }
          window.scrollTo(0, current + diff * _scrollLerp);
          _smoothScrollRaf = requestAnimationFrame(_smoothStep);
        };

        // Only attach to the music view container
        const musicView = grid.closest('.library-view') || grid.parentElement;
        if (musicView && !window._chromicSmoothScrollBound) {
          window._chromicSmoothScrollBound = true;

          window.addEventListener('wheel', (e) => {
            // Only dampen when music view is active (not hidden)
            if (musicView.classList.contains('view-hidden')) return;
            // Don't dampen if inside a scrollable sub-container
            if (e.target.closest?.('.music-queue, .music-player-settings, .chromic-search-overlay, .music-immersive-lyrics-panel, .chromic-search-results, .ui-modal, .header-search-results, .up-next-list, .music-settings-groups, .music-album-nav-list, .chromic-shortcuts-panel')) return;
            // Don't dampen if music overlay is open (fullscreen player)
            if (document.body.classList.contains('music-overlay-open')) return;


            e.preventDefault();
            _smoothScrollTarget += e.deltaY * SCROLL_DAMPING;
            // Clamp to document bounds
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            _smoothScrollTarget = Math.max(0, Math.min(maxScroll, _smoothScrollTarget));

            if (!_smoothScrollActive) {
              _smoothScrollActive = true;
              window._chromicSmoothScrollActive = true;
              // Trigger scroll guardian freeze once (not per-frame)
              if (window._chromicScrollGuardian && !window._chromicScrollGuardian.isScrolling) {
                window._chromicScrollGuardian.isScrolling = true;
                window._chromicScrollGuardianScrolling = true;
                window._chromicScrollGuardian._promoteLayer?.(true);
                window._chromicScrollGuardian._notifyListeners?.(true);
              }
              // Sync target with current position to avoid jumps
              _smoothScrollTarget = window.scrollY + e.deltaY * SCROLL_DAMPING;
              _smoothScrollTarget = Math.max(0, Math.min(maxScroll, _smoothScrollTarget));
              _smoothScrollRaf = requestAnimationFrame(_smoothStep);
            }
          }, { passive: false });

          // Sync smooth target when user scrolls by other means (keyboard, programmatic, trackpad)
          window.addEventListener('scroll', () => {
            if (!_smoothScrollActive && !document.body.classList.contains('music-overlay-open')) {
              _smoothScrollTarget = window.scrollY;
            }
          }, { passive: true });

          // Expose a way for programmatic scrollTo to reset the dampener target
          window._chromicResetSmoothScroll = (y) => {
            _smoothScrollTarget = y;
            _smoothScrollActive = false;
            cancelAnimationFrame(_smoothScrollRaf);
          };
        }
      }

    }

    // Extract dominant color from album art — triggered by ImagePool load events
    const applyColorToCard = (img, source) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 8; canvas.height = 8;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, 8, 8);
        const { data } = ctx.getImageData(0, 0, 8, 8);
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const lum = data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114;
          if (lum > 30 && lum < 220) {
            r += data[i]; g += data[i+1]; b += data[i+2]; count++;
          }
        }
        if (count > 0) {
          r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
          const card = img.closest('.music-album-grid-item');
          if (card) {
            card.style.setProperty('--album-color', `${r}, ${g}, ${b}`);
            if (!card._albumColorHover) {
              card._albumColorHover = true;
              const br = Math.min(255, Math.round(r * 2.2 + 80));
              const bg = Math.min(255, Math.round(g * 2.2 + 80));
              const bb = Math.min(255, Math.round(b * 2.2 + 80));
              card.dataset.hoverColor = `${br},${bg},${bb}`;
              card.addEventListener('pointerenter', () => {
                card.classList.add('album-color-hover');
                card.style.setProperty('--hover-glow', `${card.dataset.hoverColor}`);
              });
              card.addEventListener('pointerleave', () => {
                card.classList.remove('album-color-hover');
              });
            }
          }
        }
      } catch (e) {
        // CORS or tainted canvas — skip silently
      }
    };

    // Hook color extraction into ImagePool load callback
    albumImagePool._onLoad = (img, card) => {
      if (img.naturalWidth > 0) {
        applyColorToCard(img, 'image-pool');
      }
    };

    // Eagerly preload first 40 images (2-3 screens) — instant src set, no flash
    const eagerImgs = grid._cachedAlbumsGrid.querySelectorAll('img[data-src]');
    const eagerCount = Math.min(eagerImgs.length, 40);
    for (let i = 0; i < eagerCount; i++) {
      const img = eagerImgs[i];
      if (img.dataset.src && !img._ipLoaded) {
        img.src = img.dataset.src;
        img._ipLoaded = true;
        const card = img.closest('.music-album-grid-item');
        if (card) { card.classList.remove('img-loading'); card.classList.add('img-loaded-instant'); }
        const _applyEager = () => {
          if (img.naturalWidth > 0) applyColorToCard(img, 'eager');
        };
        if (img.complete && img.naturalWidth > 0) _applyEager();
        else img.addEventListener('load', _applyEager, { once: true });
      }
    }

    // Compute shuffle-all tile per-corner colors from mosaic images
    const shuffleTile = grid._cachedAlbumsGrid?.querySelector('.shuffle-all-tile');
    if (shuffleTile) {
      const _extractDominant = (img) => {
        try {
          const c = document.createElement('canvas');
          c.width = 4; c.height = 4;
          const cx = c.getContext('2d', { willReadFrequently: true });
          cx.drawImage(img, 0, 0, 4, 4);
          const d = cx.getImageData(0, 0, 4, 4).data;
          let r = 0, g = 0, b = 0, n = 0;
          for (let i = 0; i < d.length; i += 4) {
            const lum = d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114;
            if (lum > 30 && lum < 220) { r += d[i]; g += d[i+1]; b += d[i+2]; n++; }
          }
          if (n > 0) return `${Math.round(r/n)}, ${Math.round(g/n)}, ${Math.round(b/n)}`;
        } catch (_) {}
        return null;
      };

      const _computeShuffleMix = () => {
        const mosaicImgs = shuffleTile.querySelectorAll('.mosaic-cell img');
        const colors = [];
        let tr = 0, tg = 0, tb = 0, tc = 0;
        for (const mi of mosaicImgs) {
          if (!mi.complete || mi.naturalWidth === 0) { colors.push(null); continue; }
          const c = _extractDominant(mi);
          colors.push(c);
          if (c) {
            const [r, g, b] = c.split(',').map(Number);
            tr += r; tg += g; tb += b; tc++;
          }
        }
        // Set per-corner colors on both overlay AND tile (for border gradient)
        const overlay = shuffleTile.querySelector('.shuffle-all-overlay') || shuffleTile;
        const targets = [overlay, shuffleTile];
        for (const t of targets) {
          if (colors[0]) t.style.setProperty('--mosaic-c1', colors[0]);
          if (colors[1]) t.style.setProperty('--mosaic-c2', colors[1]);
          if (colors[2]) t.style.setProperty('--mosaic-c3', colors[2]);
          if (colors[3]) t.style.setProperty('--mosaic-c4', colors[3]);
        }
        // Also set the mixed color for the glow border
        if (tc > 0) {
          shuffleTile.style.setProperty('--shuffle-mix-color', `${Math.round(tr/tc)}, ${Math.round(tg/tc)}, ${Math.round(tb/tc)}`);
        }
      };
      const mImgs = shuffleTile.querySelectorAll('.mosaic-cell img');
      let loaded = 0;
      for (const mi of mImgs) {
        const check = () => { loaded++; if (loaded >= mImgs.length) _computeShuffleMix(); };
        if (mi.complete && mi.naturalWidth > 0) check();
        else mi.addEventListener('load', check, { once: true });
      }
    }

    grid.onclick = async (event) => {
      // Shuffle All tile - allow this even when player is expanded (user can click overlay visible behind mini-player)
      const shuffleBtn = event.target.closest?.('[data-shuffle-all-btn]');
      if (shuffleBtn) {
        event.preventDefault();
        event.stopPropagation();
        console.log('[MOSAIC-DEBUG] Shuffle-all clicked');

        const tile = shuffleBtn.closest?.('.shuffle-all-tile');
        if (!tile) {
          console.log('[MOSAIC-DEBUG] No tile found!');
          return;
        }

        // Stop auto-refresh once user interacts with the tile
        tile.dataset.mosaicUserActivated = '1';

        let mosaicKeys = (tile?.dataset?.mosaicKeys || '').split(',').map(k => decodeURIComponent(k)).filter(Boolean);
        let mosaicIdx = parseInt(tile?.dataset?.mosaicIndex || '0', 10) || 0;

        console.log('[MOSAIC-DEBUG] Click! mosaicIdx:', mosaicIdx, 'of', mosaicKeys.length, 'keys:', mosaicKeys);

        // If no mosaic keys (first time or error), initialize with random albums
        if (mosaicKeys.length === 0) {
          console.log('[MOSAIC-DEBUG] No mosaic keys, initializing...');
          const newCovers = albums.length >= 4
            ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
            : albums.slice(0, Math.min(4, albums.length));
          animateMosaicRefresh(tile, newCovers);
          mosaicKeys = newCovers.map(a => a.key);
          tile.dataset.mosaicKeys = newCovers.map(a => encodeURIComponent(a.key)).join(',');
          tile.dataset.mosaicIndex = '0';
          mosaicIdx = 0;
        }

        // Get the current mosaic album to play
        const currentKey = mosaicKeys[mosaicIdx] || '';
        const album = albums.find(a => a.key === currentKey);

        console.log('[MOSAIC-DEBUG] Current album key:', currentKey, 'found:', !!album, 'tracks:', album?.tracks?.length);

        if (!album?.tracks?.length) {
          // Skip to next if album has no tracks
          tile.dataset.mosaicIndex = String(mosaicIdx + 1);
          console.log('[MOSAIC-DEBUG] No tracks, skipping to next');
          return;
        }

        // Get the first track from this album
        const trackToPlay = album.tracks[0];
        console.log('[MOSAIC-DEBUG] Track to play:', trackToPlay?.title || trackToPlay?.name, 'ID:', trackToPlay?.id);

        // Build queue: ALL tracks from ALL 4 mosaic albums (in order), starting from current album
        const queueTracks = [];
        const seenUrls = new Set();

        // First: all tracks from current album onwards
        for (let i = mosaicIdx; i < mosaicKeys.length; i++) {
          const a = albums.find(al => al.key === mosaicKeys[i]);
          if (a?.tracks?.length) {
            for (const t of a.tracks) {
              if (!seenUrls.has(t.url)) {
                queueTracks.push(t);
                seenUrls.add(t.url);
              }
            }
          }
        }
        // Then: albums before current (wrap around for continuous play)
        for (let i = 0; i < mosaicIdx; i++) {
          const a = albums.find(al => al.key === mosaicKeys[i]);
          if (a?.tracks?.length) {
            for (const t of a.tracks) {
              if (!seenUrls.has(t.url)) {
                queueTracks.push(t);
                seenUrls.add(t.url);
              }
            }
          }
        }

        console.log('[MOSAIC-DEBUG] Queue built with', queueTracks.length, 'tracks from mosaic albums only');

        // Advance mosaic index for next click
        const nextIdx = mosaicIdx + 1;
        tile.dataset.mosaicIndex = String(nextIdx);
        console.log('[MOSAIC-DEBUG] Advanced mosaicIndex to', nextIdx);

        // If this was the 4th (last) mosaic album, queue the flip to happen after close animation
        if (nextIdx >= mosaicKeys.length) {
          console.log('[MOSAIC-DEBUG] This is the last mosaic track - queuing flip for after close');
          const newCovers = albums.length >= 4
            ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
            : albums.slice(0, Math.min(4, albums.length));
          // Queue the mosaic flip to happen after overlay close animation completes
          grid._afterFlipCallbacks = grid._afterFlipCallbacks || [];
          grid._afterFlipCallbacks.push(() => {
            console.log('[MOSAIC-DEBUG] Executing queued mosaic flip');
            animateMosaicRefresh(tile, newCovers);
            // Reset index for the NEW mosaic set
            tile.dataset.mosaicKeys = newCovers.map(a => encodeURIComponent(a.key)).join(',');
            tile.dataset.mosaicIndex = '0';
          });
        }

        const fakeAlbum = { key: '__shuffle_mosaic__', name: 'Shuffle All', tracks: queueTracks };
        const sourceElement = tile || shuffleBtn;
        // Pass startTrackId so player knows which track to start (not just first in queue)
        onExpand(fakeAlbum, { sourceElement, shuffle: false, preOrdered: true, startTrackId: trackToPlay.id });
        return;
      }

      // For other grid interactions, block if player is expanded
      if (document.querySelector('.music-track-page.music-player-layer.is-expanded')) return;

      const moreToggle = event.target.closest?.('[data-more-toggle]');
      if (moreToggle) {
        event.preventDefault();
        event.stopPropagation();
        const existing = document.getElementById('chromic-floating-menu');
        if (existing) { existing.remove(); return; }
        const menu = moreToggle.parentElement?.querySelector?.('[data-more-menu]');
        if (!menu) return;
        const shouldOpen = menu.hidden;
        grid.querySelectorAll('[data-more-menu]').forEach((m) => { m.hidden = true; });
        menu.hidden = !shouldOpen;
        return;
      }

      const deleteButton = event.target.closest?.('[data-delete-album-key]');
      if (deleteButton) {
        event.preventDefault();
        event.stopPropagation();
        const albumKey = deleteButton.dataset.deleteAlbumKey;
        if (albumKey) {
          await onDeleteAlbum?.(albumKey);
        }
        return;
      }

      const playButton = event.target.closest?.('[data-play-album-key]');
      if (playButton) {
        event.preventDefault();
        event.stopPropagation();
        const albumKey = playButton.dataset.playAlbumKey;
        const album = albums.find(a => a.key === albumKey);
        if (album) {
          const sourceElement = playButton.closest?.('[data-album-card]') || playButton;
          onExpand(album, { sourceElement });
        }
        return;
      }

      const albumButton = event.target.closest?.('[data-album-key]');
      if (albumButton) {
        event.preventDefault();
        const sourceElement = albumButton.closest?.('[data-album-card]') || albumButton;
        onAlbumSelect(albumButton.dataset.albumKey, { sourceElement });
      }
    };

    // Right-click context menu on album grid items
    grid.addEventListener('contextmenu', (e) => {
      if (document.querySelector('.music-track-page.music-player-layer.is-expanded')) return;
      const card = e.target.closest?.('.music-album-grid-item:not(.shuffle-all-tile)');
      if (!card) return;
      e.preventDefault();
      e.stopPropagation();
      const albumKey = card.dataset.albumCard;
      const album = albums.find(a => a.key === albumKey);
      if (!album) return;

      // Remove any existing context menu
      document.querySelector('.album-grid-context-menu')?.remove();

      const menu = document.createElement('div');
      menu.className = 'album-grid-context-menu media-more-menu';
      menu.style.cssText = `position:fixed;z-index:999999;left:${e.clientX}px;top:${e.clientY}px;`;
      menu.innerHTML = `
        <button type="button" data-ctx-action="play"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="vertical-align:-2px;margin-right:6px"><polygon points="5 3 19 12 5 21 5 3"/></svg>Play</button>
        <button type="button" data-ctx-action="play-next"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0 6"/><path d="M10 8l8 4-8 4V8z"/></svg>Play Next</button>
        <button type="button" data-ctx-action="add-queue"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add to Queue</button>
        <hr class="menu-divider" />
        <button type="button" data-ctx-action="sync-lyrics"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M12 2l10 10-10 10L2 12z"/></svg>Sync Lyrics</button>
        <button type="button" data-ctx-action="translate"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>Translate</button>
        <button type="button" data-ctx-action="set-cover"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>Set Cover</button>
        <hr class="menu-divider" />
        <button type="button" data-ctx-action="rename"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Rename Album</button>
        <button type="button" data-ctx-action="delete" class="menu-action-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete Album</button>
        <hr class="menu-divider" />
        <button type="button" data-ctx-action="select-albums"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Select Albums</button>
        <button type="button" data-ctx-action="select"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Select Tracks</button>
      `;
      document.body.appendChild(menu);

      // Position adjustment to keep in viewport
      requestAnimationFrame(() => {
        const rect = menu.getBoundingClientRect();
        if (rect.right > window.innerWidth) menu.style.left = `${window.innerWidth - rect.width - 8}px`;
        if (rect.bottom > window.innerHeight) menu.style.top = `${window.innerHeight - rect.height - 8}px`;
      });

      const closeMenu = () => { menu.remove(); document.removeEventListener('click', closeMenu); document.removeEventListener('contextmenu', closeMenu); };
      setTimeout(() => { document.addEventListener('click', closeMenu); document.addEventListener('contextmenu', closeMenu); }, 10);

      menu.addEventListener('click', async (me) => {
        const action = me.target.closest('[data-ctx-action]')?.dataset.ctxAction;
        if (!action) return;
        closeMenu();
        switch (action) {
          case 'play': {
            const sourceElement = card;
            onExpand(album, { sourceElement });
            break;
          }
          case 'play-next':
            for (const track of album.tracks) onQueueAction?.(track.id, 'next');
            break;
          case 'add-queue':
            for (const track of album.tracks) onQueueAction?.(track.id, 'later');
            break;
          case 'sync-lyrics':
            document.dispatchEvent(new CustomEvent('chromic:sync-album-lyrics', { detail: { albumKey } }));
            break;
          case 'translate':
            document.dispatchEvent(new CustomEvent('chromic:translate-album', { detail: { albumKey } }));
            break;
          case 'set-cover':
            document.dispatchEvent(new CustomEvent('chromic:set-album-cover', { detail: { albumKey } }));
            break;
          case 'rename':
            // Navigate to album first, then rename from there
            onAlbumSelect(albumKey, { sourceElement: card });
            break;
          case 'delete':
            onDeleteAlbum?.(albumKey);
            break;
          case 'select':
            onAlbumSelect(albumKey, { sourceElement: card, activateSelectMode: true });
            break;
          case 'select-albums':
            _activateAlbumSelectMode(grid, albumKey);
            break;
        }
      });
    });

    // ── Album Selection Mode ──────────────────────────────────────────────────
    function _activateAlbumSelectMode(gridEl, preSelectKey) {
      const section = gridEl.querySelector('.music-albums-grid');
      if (!section) return;

      // Already in album select mode?
      if (section.classList.contains('album-select-mode')) {
        // Just toggle the pre-selected album
        if (preSelectKey) {
          const card = section.querySelector(`.music-album-grid-item[data-album-card="${CSS.escape(preSelectKey)}"]`);
          card?.classList.toggle('album-selected');
        }
        _updateAlbumBulkBar(section);
        return;
      }

      section.classList.add('album-select-mode');

      // Add checkboxes to all album cards
      section.querySelectorAll('.music-album-grid-item[data-album-card]').forEach(card => {
        if (!card.querySelector('.album-select-check')) {
          const check = document.createElement('div');
          check.className = 'album-select-check';
          check.innerHTML = '<span class="album-check-visual"></span>';
          card.appendChild(check);
        }
      });

      // Pre-select the triggering album
      if (preSelectKey) {
        const card = section.querySelector(`.music-album-grid-item[data-album-card="${CSS.escape(preSelectKey)}"]`);
        card?.classList.add('album-selected');
      }

      // Add bulk action bar
      let bulkBar = gridEl.querySelector('.album-bulk-bar');
      if (!bulkBar) {
        bulkBar = document.createElement('div');
        bulkBar.className = 'album-bulk-bar';
        bulkBar.innerHTML = `
          <div class="album-bulk-left">
            <button type="button" class="album-bulk-btn" data-album-bulk="select-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Select All
            </button>
            <span class="album-bulk-count">0 selected</span>
          </div>
          <div class="album-bulk-actions">
            <button type="button" class="album-bulk-btn" data-album-bulk="sync-lyrics" title="Generate word timestamps for selected albums">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l10 10-10 10L2 12z"/></svg>
              Sync Lyrics
            </button>
            <button type="button" class="album-bulk-btn" data-album-bulk="translate" title="Translate lyrics for selected albums">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
              Translate
            </button>
            <button type="button" class="album-bulk-btn album-bulk-danger" data-album-bulk="delete" title="Delete selected albums">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Delete
            </button>
          </div>
          <button type="button" class="album-bulk-btn album-bulk-cancel" data-album-bulk="cancel">✕ Cancel</button>
        `;
        section.insertAdjacentElement('beforebegin', bulkBar);

        // Bulk bar click handler
        bulkBar.addEventListener('click', async (e) => {
          const action = e.target.closest('[data-album-bulk]')?.dataset.albumBulk;
          if (!action) return;

          const selectedKeys = _getSelectedAlbumKeys(section);

          switch (action) {
            case 'select-all': {
              const cards = section.querySelectorAll('.music-album-grid-item[data-album-card]');
              const allSelected = selectedKeys.length === cards.length;
              cards.forEach(c => c.classList.toggle('album-selected', !allSelected));
              _updateAlbumBulkBar(section);
              break;
            }
            case 'sync-lyrics': {
              if (!selectedKeys.length) return;
              for (const key of selectedKeys) {
                document.dispatchEvent(new CustomEvent('chromic:sync-album-lyrics', { detail: { albumKey: key } }));
              }
              break;
            }
            case 'translate': {
              if (!selectedKeys.length) return;
              for (const key of selectedKeys) {
                document.dispatchEvent(new CustomEvent('chromic:translate-album', { detail: { albumKey: key } }));
              }
              break;
            }
            case 'delete': {
              if (!selectedKeys.length) return;
              if (!confirm(`Delete ${selectedKeys.length} album(s)? This cannot be undone.`)) return;
              for (const key of selectedKeys) {
                onDeleteAlbum?.(key, { skipConfirm: true });
              }
              _deactivateAlbumSelectMode(gridEl);
              break;
            }
            case 'cancel':
              _deactivateAlbumSelectMode(gridEl);
              break;
          }
        });
      }

      // Click on album cards toggles selection
      section._albumSelectClick = (e) => {
        const card = e.target.closest('.music-album-grid-item[data-album-card]');
        if (!card) return;
        if (!section.classList.contains('album-select-mode')) return;
        e.preventDefault();
        e.stopPropagation();
        card.classList.toggle('album-selected');
        _updateAlbumBulkBar(section);
      };
      section.addEventListener('click', section._albumSelectClick, true);

      _updateAlbumBulkBar(section);
    }

    function _getSelectedAlbumKeys(section) {
      return Array.from(section.querySelectorAll('.music-album-grid-item.album-selected[data-album-card]'))
        .map(c => c.dataset.albumCard);
    }

    function _updateAlbumBulkBar(section) {
      const bar = section.parentElement?.querySelector('.album-bulk-bar');
      if (!bar) return;
      const count = section.querySelectorAll('.music-album-grid-item.album-selected').length;
      const countEl = bar.querySelector('.album-bulk-count');
      if (countEl) countEl.textContent = `${count} selected`;
    }

    function _deactivateAlbumSelectMode(gridEl) {
      const section = gridEl.querySelector('.music-albums-grid');
      if (!section) return;
      section.classList.remove('album-select-mode');
      section.querySelectorAll('.album-selected').forEach(c => c.classList.remove('album-selected'));
      section.querySelectorAll('.album-select-check').forEach(c => c.remove());
      gridEl.querySelector('.album-bulk-bar')?.remove();
      if (section._albumSelectClick) {
        section.removeEventListener('click', section._albumSelectClick, true);
        section._albumSelectClick = null;
      }
    }

    // Auto-refresh mosaic tile every 30s if user hasn't clicked Shuffle All yet
    if (grid._mosaicAutoInterval) clearInterval(grid._mosaicAutoInterval);
    grid._mosaicAutoInterval = setInterval(() => {
      const tile = grid.querySelector('.shuffle-all-tile');
      if (!tile || tile.dataset.mosaicUserActivated) return;
      // Don't refresh while overlay is open
      if (document.body.classList.contains('music-overlay-open')) return;
      const newCovers = albums.length >= 4
        ? [...albums].sort(() => Math.random() - 0.5).slice(0, 4)
        : albums.slice(0, Math.min(4, albums.length));
      animateMosaicRefresh(tile, newCovers);
    }, 30000);

    return;
  }

  const rawCover = activeAlbum.previewUrl || resolvePreviewUrl(activeAlbum.tracks[0]);
  const cover = withImageParams(rawCover, 600);
  // Grab the already-loaded grid thumbnail to avoid blink while the larger cover loads
  const gridThumb = grid.querySelector(`[data-album-card="${CSS.escape(activeAlbum.key)}"] img`)?.src;
  const instantCover = (gridThumb && !gridThumb.startsWith('data:')) ? gridThumb : cover;
  const albumArtist = inferAlbumArtist(activeAlbum.tracks);
  const albumYear = inferAlbumYear(activeAlbum.tracks);
  const albumTitle = formatAlbumTitle(activeAlbum.name, albumArtist);
  const targetLang = window.musicRuntime?.settings?.translationLang || 'uk';

  const applyTrackAssetStatusToRow = (row, st) => {
    if (!row || !st) return;
    const titleCell = row.querySelector('.track-title-main');
    if (titleCell) {
      row.querySelectorAll('.track-status-badge').forEach((b) => b.remove());
      if (st.userEdited) titleCell.insertAdjacentHTML('afterend', '<span class="track-status-badge user-edited" title="User edited — lyrics manually modified by you">EDITED</span>');
      if (st.syncedWords) titleCell.insertAdjacentHTML('afterend', `<span class="track-status-badge synced" title="Word-synced lyrics — each word timed individually for karaoke-style display">${_badgeSynced}</span>`);
      else if (st.hasSynced) titleCell.insertAdjacentHTML('afterend', `<span class="track-status-badge synced-plain" title="Line-synced lyrics — lines timed to music playback">${_badgeNote}</span>`);
      if (st.hasTranslation) titleCell.insertAdjacentHTML('afterend', `<span class="track-status-badge translated" title="Translation available — lyrics translated to another language">${_badgeGlobe}</span>`);
    }
    const syncBtn = row.querySelector('[data-regen-timestamps]');
    if (syncBtn) {
      syncBtn.hidden = !st.hasSynced;
      if (!syncBtn.disabled && st.hasSynced) syncBtn.textContent = 'Re-Sync Word Timestamps';
    }
    const transBtn = row.querySelector('[data-regen-translation]');
    if (transBtn && !transBtn.disabled) transBtn.textContent = st.hasTranslation ? 'Re-Translate' : 'Regenerate Translation';
  };

  const findTrackByPath = (rawPath) => {
    const normalized = decodeURIComponent(String(rawPath || ''));
    return activeAlbum.tracks.find((t) => decodeURIComponent(t.path || t.id) === normalized) || null;
  };

  const refreshTrackAssetStatus = async (trackLike) => {
    const trackObj = typeof trackLike === 'object'
      ? trackLike
      : (findTrackByPath(trackLike) || activeAlbum.tracks.find((t) => t.id === trackLike));
    if (!trackObj) return;
    const trackPath = decodeURIComponent(trackObj.path || trackObj.id);
    const row = grid.querySelector(`tr[data-track-id="${CSS.escape(trackObj.id)}"]`);
    if (!row) return;
    try {
      const res = await fetch('/api/lyrics/check-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackPath, targetLang }),
      });
      if (!res.ok) return;
      const st = await res.json();
      applyTrackAssetStatusToRow(row, st);
    } catch {}
  };

  grid._trackAssetsListener = (event) => {
    const trackPath = event?.detail?.trackPath;
    const trackObj = findTrackByPath(trackPath);
    if (trackObj) refreshTrackAssetStatus(trackObj);
  };
  document.addEventListener('chromic:track-assets-updated', grid._trackAssetsListener);

  // Build album info line: only show known data
  const infoParts = [];
  if (albumArtist) infoParts.push(escapeHtml(albumArtist));
  if (albumYear) infoParts.push(escapeHtml(albumYear));
  const infoLine = infoParts.length
    ? `<p data-album-info data-album-artist="${escapeHtml(albumArtist || '')}">${infoParts.join(' • ')}</p>`
    : `<p data-album-info hidden></p>`;

  // Determine if we should show artist column (only for compilations)
  // (isCompilation removed — artist always shown as secondary text in title cell)

  // Detach cached albums grid from DOM (preserve in JS memory for instant restore with GPU textures cached)
  if (grid._cachedAlbumsGrid && grid._cachedAlbumsGrid.parentNode) {
    grid._cachedAlbumsGrid.remove();
  }

  grid.innerHTML = `
    <article class="music-album-view" data-album-key="${escapeHtml(activeAlbum.key)}">
      <nav class="music-album-nav" aria-label="Albums">
        <button type="button" class="music-album-nav-btn focusable" data-back-to-albums>All Albums</button>
        <div class="music-album-nav-dropdown">
          <button type="button" class="music-album-nav-current focusable" aria-expanded="false" aria-haspopup="listbox">
            <span class="nav-current-label">${escapeHtml(cleanNavTitle(activeAlbum.name))}</span>
            <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 4.5L6 7.5L9 4.5"/></svg>
          </button>
          <div class="music-album-nav-list" role="listbox" hidden>
            <div class="album-search-wrapper">
              <input type="text" class="album-search-input focusable" placeholder="Find album..." autocomplete="off" />
            </div>
            <div class="album-results-list">
              ${albums.map((album) => `<button type="button" class="music-album-nav-option focusable ${album.key === activeAlbum.key ? 'active' : ''}" data-album-key="${escapeHtml(album.key)}" data-search-text="${escapeHtml(cleanNavTitle(album.name).toLowerCase())}" role="option" aria-selected="${album.key === activeAlbum.key}">${escapeHtml(cleanNavTitle(album.name))}</button>`).join('')}
            </div>
          </div>
        </div>
      </nav>
      <section class="album-view-header ${activeTrackId ? 'is-playing' : ''}">
        <img class="album-view-cover" src="${instantCover}" data-full-src="${cover}" alt="${escapeHtml(albumTitle)} cover" />
        <div class="album-view-meta">
          <p class="album-view-kicker">Album</p>
          <h3>${escapeHtml(albumTitle)}</h3>
          ${infoLine}
          <p>${activeAlbum.tracks.length} tracks</p>
          <div class="album-view-actions">
              <div class="album-view-actions-primary">
                <button type="button" class="expand-fullscreen-btn focusable" data-shuffle="false"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play</button>
                <button type="button" class="expand-fullscreen-btn album-shuffle-btn focusable" data-shuffle="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg> Shuffle</button>
              </div>
              <div class="album-view-actions-secondary">
                <div class="media-more-wrap">
                   ${uiButton({ text: '⋯', variant: 'ghost', classes: 'album-delete-btn focusable', attrs: 'data-more-toggle aria-label="More album options"' })}
                   <div class="media-more-menu" data-more-menu hidden>
                    <button type="button" data-select-mode-toggle><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Select Tracks</button>
                    <hr class="menu-divider" />
                    <button type="button" data-album-queue="next" data-album-key="${escapeHtml(activeAlbum.key)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0 6"/><path d="M10 8l8 4-8 4V8z"/></svg>Play Next</button>
                    <button type="button" data-album-queue="later" data-album-key="${escapeHtml(activeAlbum.key)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add to Queue</button>
                    <hr class="menu-divider" />
                    <button type="button" class="album-sync-lyrics-btn" data-sync-album-key="${escapeHtml(activeAlbum.key)}" title="Sync premium lyrics for all tracks"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #60CFFF)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M12 2l10 10-10 10L2 12z"/></svg>Sync Lyrics</button>
                    <button type="button" class="album-translate-btn" data-translate-album-key="${escapeHtml(activeAlbum.key)}" title="Translate lyrics for all tracks"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #A78BFA)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>Translate</button>
                    <button type="button" class="album-set-cover-btn" data-cover-album-key="${escapeHtml(activeAlbum.key)}" title="Set album cover image"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #F9A825)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>Set Cover</button>
                    <hr class="menu-divider" />
                    <button type="button" data-rename-album data-album-key="${escapeHtml(activeAlbum.key)}" data-field="album"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Rename Album</button>
                     <button type="button" data-rename-album data-album-key="${escapeHtml(activeAlbum.key)}" data-field="artist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Rename Artist</button>
                     <hr class="menu-divider" />
                     <button type="button" data-regen-album-timestamps data-album-key="${escapeHtml(activeAlbum.key)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M2 12h2"/><path d="M6 8v8"/><path d="M10 4v16"/><path d="M14 6v12"/><path d="M18 8v8"/><path d="M22 12h-2"/></svg>Regenerate All Word Timestamps</button>
                     <button type="button" data-regen-album-translation data-album-key="${escapeHtml(activeAlbum.key)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>Regenerate All Translations</button>
                     <hr class="menu-divider" />
                    <button type="button" class="menu-action-danger" data-delete-album-key="${escapeHtml(activeAlbum.key)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Delete Album</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <section class="album-table-wrap">
        ${buildDiscGroupedTracks(activeAlbum.tracks, activeTrackId, albumArtist, albumTitle, escapeHtml)}
      </section>
    </article>
    <div class="bulk-action-bar" hidden>
      <span class="bulk-action-count">0 selected</span>
      <button type="button" class="bulk-action-btn" data-bulk-action="select-all">Select All</button>
      <button type="button" class="bulk-action-btn" data-bulk-action="queue">Add to Queue</button>
      <button type="button" class="bulk-action-btn bulk-action-danger" data-bulk-action="delete">Delete Selected</button>
      <button type="button" class="bulk-action-btn" data-bulk-action="cancel">Cancel</button>
    </div>
  `;

  // Upgrade cover: if we used the grid thumbnail, load the full-size version in the background
  const coverImg = grid.querySelector('.album-view-cover');
  if (coverImg && coverImg.dataset.fullSrc && coverImg.src !== coverImg.dataset.fullSrc) {
    const fullImg = new Image();
    fullImg.onload = () => { coverImg.src = coverImg.dataset.fullSrc; };
    fullImg.src = coverImg.dataset.fullSrc;
  }

  // ── Multi-select mode ──
  const selectToggleBtn = grid.querySelector('[data-select-mode-toggle]');
  const bulkBar = grid.parentElement?.querySelector('.bulk-action-bar') || grid.querySelector('.bulk-action-bar');
  let selectModeActive = false;

  const toggleSelectMode = (active) => {
    selectModeActive = active;
    selectToggleBtn?.classList.toggle('active', active);
    grid.querySelectorAll('.col-select').forEach(td => td.hidden = !active);
    if (!active) {
      grid.querySelectorAll('[data-select-track]').forEach(cb => cb.checked = false);
    }
    updateBulkBar();
  };

  const getSelectedPaths = () => {
    const selected = [];
    grid.querySelectorAll('[data-select-track]:checked').forEach(cb => {
      const trackId = cb.dataset.selectTrack;
      const track = activeAlbum.tracks.find(t => t.id === trackId);
      if (track) selected.push({ id: trackId, path: track.path || track.name });
    });
    return selected;
  };

  const updateBulkBar = () => {
    if (!bulkBar) return;
    const selected = grid.querySelectorAll('[data-select-track]:checked');
    if (selectModeActive) {
      bulkBar.hidden = false;
      bulkBar.querySelector('.bulk-action-count').textContent = selected.length > 0 ? `${selected.length} selected` : 'Select tracks';
    } else {
      bulkBar.hidden = true;
    }
  };

  grid.querySelectorAll('[data-select-mode-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSelectMode(!selectModeActive);
    });
  });

  // Handle checkbox changes
  grid.addEventListener('change', (e) => {
    if (e.target.matches('[data-select-all]')) {
      const checked = e.target.checked;
      grid.querySelectorAll('[data-select-track]').forEach(cb => cb.checked = checked);
      updateBulkBar();
    } else if (e.target.matches('[data-select-track]')) {
      updateBulkBar();
    }
  });

  // Handle bulk action buttons
  if (bulkBar) {
    bulkBar.addEventListener('click', async (e) => {
      const action = e.target.closest('[data-bulk-action]')?.dataset.bulkAction;
      if (!action) return;
      const selected = getSelectedPaths();

      if (action === 'select-all') {
        const allCheckboxes = grid.querySelectorAll('[data-select-track]');
        const allChecked = [...allCheckboxes].every(cb => cb.checked);
        allCheckboxes.forEach(cb => cb.checked = !allChecked);
        e.target.textContent = allChecked ? 'Select All' : 'Deselect All';
        updateBulkBar();
      } else if (action === 'queue') {
        for (const s of selected) {
          onQueueAction?.(s.id, 'later');
        }
        toggleSelectMode(false);
      } else if (action === 'delete') {
        if (!selected.length) return;
        const confirmed = window.confirm(`Delete ${selected.length} track(s)? They will be moved to Trash.`);
        if (!confirmed) return;
        try {
          await fetch('/api/media/bulk-delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paths: selected.map(s => s.path) }),
          });
          // Remove from local state and re-render
          for (const s of selected) {
            await onDeleteTrack?.(s.id);
          }
        } catch (err) {
          console.error('[bulk-delete]', err);
        }
        toggleSelectMode(false);
      } else if (action === 'cancel') {
        toggleSelectMode(false);
      }
    });
  }

  // Show Sync Lyrics button — always available, force re-sync supported
  const syncBtnEl = grid.querySelector('.album-sync-lyrics-btn');
  if (syncBtnEl) {
    syncBtnEl.style.display = '';
    syncBtnEl._hasExisting = false;
    // ── Whisper readiness gate: disable sync until runtime is ready ──
    syncBtnEl.disabled = true;
    syncBtnEl.title = 'Checking Whisper readiness...';
    fetch('/api/setup/whisper-runtime/health').then(r => r.ok ? r.json() : null).then(health => {
      if (!health || !health.ready) {
        syncBtnEl.disabled = true;
        syncBtnEl.title = `Whisper not ready: ${health?.reason || 'unknown'}`;
        // Poll until ready (max 60s)
        let polls = 0;
        const pollId = setInterval(() => {
          if (++polls > 12) { clearInterval(pollId); return; }
          fetch('/api/setup/whisper-runtime/health').then(r => r.ok ? r.json() : null).then(h => {
            if (h && h.ready) {
              clearInterval(pollId);
              syncBtnEl.disabled = false;
              syncBtnEl.title = 'Sync lyrics for all tracks';
            }
          }).catch(() => {});
        }, 5000);
      } else {
        syncBtnEl.disabled = false;
        syncBtnEl.title = 'Sync lyrics for all tracks';
      }
    }).catch(() => { syncBtnEl.disabled = false; });
    fetch('/api/lyrics/enrich-album-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: activeAlbum.tracks.map(t => t.path || t.id) }),
    }).then(r => {
      if (!r.ok) throw new Error('Status check failed');
      return r.json();
    }).then(data => {
      if (data.ok && data.needsSync === 0) {
        syncBtnEl.innerHTML = `${_icoCheck}Re-Sync Lyrics`;
        syncBtnEl.title = 'All tracks have synced lyrics — click to force re-sync';
        syncBtnEl._hasExisting = true;
      }
    }).catch(() => {});
  }

  // Show Translate button — always available, force re-translate supported
  const translateBtnEl = grid.querySelector('.album-translate-btn');
  if (translateBtnEl) {
    const trackPaths = activeAlbum.tracks.map(t => t.path || t.id);
    translateBtnEl.style.display = '';
    translateBtnEl._hasExisting = false;
    fetch('/api/lyrics/translate-album-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: trackPaths }),
    }).then(r => {
      if (!r.ok) throw new Error('Status check failed');
      return r.json();
    }).then(data => {
      if (data.ok && data.needsTranslation === 0) {
        translateBtnEl.innerHTML = `${_icoCheck}Re-Translate`;
        translateBtnEl.title = 'All tracks have translations — click to force re-translate';
        translateBtnEl._hasExisting = true;
      }
    }).catch(() => {});
  }

  // ── Async-fetch per-track asset statuses and update badges/button labels ──
  {
    const trackPaths = activeAlbum.tracks.map(t => decodeURIComponent(t.path || t.id));
    fetch('/api/lyrics/check-assets-album', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: trackPaths, targetLang }),
    }).then(r => r.ok ? r.json() : null).then(statuses => {
      if (!statuses) return;
      for (const track of activeAlbum.tracks) {
        const tp = decodeURIComponent(track.path || track.id);
        const st = statuses[tp];
        if (!st) continue;
        const row = grid.querySelector(`tr[data-track-id="${CSS.escape(track.id)}"]`);
        if (!row) continue;
        applyTrackAssetStatusToRow(row, st);
      }
    }).catch(() => {});
  }

  // ── Background-fetch missing durations for tracks showing "—" ──
  const missingDurationRows = grid.querySelectorAll('.album-track-row');
  for (const row of missingDurationRows) {
    const durCell = row.querySelector('.col-duration');
    if (!durCell || (durCell.textContent.trim() !== '—' && durCell.textContent.trim() !== '')) continue;
    if (durCell.textContent.trim() !== '—') continue;
    const trackId = row.dataset.trackId;
    if (!trackId) continue;
    // trackId is like "music/Encoded%20Path" — decode to get relative path for API
    const relPath = decodeURIComponent(trackId);
    const encodedRelPath = relPath.split('/').map(s => encodeURIComponent(s)).join('/');
    fetch(`/api/track-info/${encodedRelPath}`)
      .then(r => r.ok ? r.json() : null)
      .then(meta => {
        if (!meta || !meta.duration) return;
        const secs = Number(meta.duration);
        if (!Number.isFinite(secs) || secs <= 0) return;
        const mins = Math.floor(secs / 60);
        const s = String(Math.floor(secs % 60)).padStart(2, '0');
        durCell.textContent = `${mins}:${s}`;
      })
      .catch(() => {});
  }

  grid.onclick = async (event) => {
    // Dropdown nav toggle
    const navCurrent = event.target.closest?.('.music-album-nav-current');
    if (navCurrent) {
      event.preventDefault();
      const list = navCurrent.parentElement?.querySelector('.music-album-nav-list');
      if (list) {
        const isOpen = !list.hidden;
        list.hidden = isOpen;
        navCurrent.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
          // Apply Chromic lerp scroll
          if (window.initChromicScroll) window.initChromicScroll(list);
          // Focus search input when opening
          const input = list.querySelector('.album-search-input');
          if (input) {
            requestAnimationFrame(() => input.focus());
          }
          // Scroll active item into view
          const activeItem = list.querySelector('.music-album-nav-option.active');
          if (activeItem) activeItem.scrollIntoView({ block: 'center' });
          // Close on outside click (blur close)
          const closeOnBlur = (e) => {
            if (!list.contains(e.target) && !navCurrent.contains(e.target)) {
              list.hidden = true;
              navCurrent.setAttribute('aria-expanded', 'false');
              document.removeEventListener('mousedown', closeOnBlur, true);
            }
          };
          requestAnimationFrame(() => {
            document.addEventListener('mousedown', closeOnBlur, true);
          });
        }
      }
      return;
    }
    // Dropdown option click
    const navOption = event.target.closest?.('.music-album-nav-option');
    if (navOption && navOption.dataset.albumKey) {
      event.preventDefault();
      onAlbumSelect(navOption.dataset.albumKey);
      return;
    }

    const moreToggle = event.target.closest?.('[data-more-toggle]');
    if (moreToggle) {
      event.preventDefault();
      event.stopPropagation();
      const wrap = moreToggle.closest('.media-more-wrap');
      const menu = wrap?.querySelector?.('[data-more-menu]');
      if (!menu) return;

      // Toggle: if floating menu was opened by this same button, close it
      const existing = document.getElementById('chromic-floating-menu');
      if (existing && existing._sourceToggle === moreToggle) {
        existing.remove();
        return;
      }
      // Close any other existing floating menu
      if (existing) existing.remove();

      // Close all inline menus
      grid.querySelectorAll('[data-more-menu]').forEach((c) => { c.hidden = true; });

      {
        // Clone menu and append to body as a floating overlay
        const floatingMenu = menu.cloneNode(true);
        ensureMediaMoreMenuIcons(floatingMenu);
        floatingMenu.id = 'chromic-floating-menu';
        floatingMenu._sourceToggle = moreToggle;
        floatingMenu.hidden = false;
        floatingMenu.style.cssText = 'position:fixed;z-index:999999;';
        document.body.appendChild(floatingMenu);

        // Position at button
        const rect = moreToggle.getBoundingClientRect();
        const menuWidth = 200;
        let left = rect.right - menuWidth;
        if (left < 8) left = 8;
        if (left + menuWidth > window.innerWidth - 8) left = window.innerWidth - menuWidth - 8;
        floatingMenu.style.left = `${left}px`;
        floatingMenu.style.top = `${rect.bottom + 4}px`;

        // Flip above if too close to bottom
        requestAnimationFrame(() => {
          const fRect = floatingMenu.getBoundingClientRect();
          if (fRect.bottom > window.innerHeight - 8) {
            floatingMenu.style.top = `${rect.top - fRect.height - 4}px`;
          }
        });

        // Handle clicks inside floating menu — delegate to grid onclick
        floatingMenu.addEventListener('click', (e) => {
          const btn = e.target.closest('button');
          if (!btn) return;
          e.preventDefault();
          e.stopPropagation();
          // Copy relevant data attributes to a temp element and fire through grid
          // Or directly handle here by finding the original menu button
          const allAttrs = [...btn.attributes];
          // Find matching button in original menu
          const origBtn = menu.querySelector(`[${allAttrs.filter(a => a.name.startsWith('data-')).map(a => `${a.name}="${a.value}"`).join('][')}]`);
          floatingMenu.remove();
          if (origBtn) origBtn.click();
        });

        // Close on outside mousedown
        const closeFloating = (e) => {
          if (!floatingMenu.contains(e.target) && !moreToggle.contains(e.target)) {
            floatingMenu.remove();
            document.removeEventListener('mousedown', closeFloating, true);
          }
        };
        requestAnimationFrame(() => {
          document.addEventListener('mousedown', closeFloating, true);
        });
      }
      return;
    }

    const queueButton = event.target.closest?.('[data-track-queue]');
    if (queueButton) {
      event.preventDefault();
      event.stopPropagation();
      onQueueAction?.(queueButton.dataset.trackId, queueButton.dataset.trackQueue);
      // Close menu after action
      queueButton.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      return;
    }

    // Play from here (shuffle)
    const playFromShuffle = event.target.closest?.('[data-play-from-shuffle]');
    if (playFromShuffle) {
      event.preventDefault();
      event.stopPropagation();
      const trackId = playFromShuffle.dataset.trackId;
      playFromShuffle.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      if (trackId) {
        // Enable shuffle then play the track
        onTrackSelect(trackId);
        // Signal shuffle via custom event
        grid.dispatchEvent(new CustomEvent('chromic:shuffle-from', { detail: { trackId } }));
      }
      return;
    }

    // Rename track metadata
    const renameBtn = event.target.closest?.('[data-rename-track]');
    if (renameBtn) {
      event.preventDefault();
      event.stopPropagation();
      const trackId = renameBtn.dataset.trackId;
      const field = renameBtn.dataset.field;
      renameBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      const track = activeAlbum.tracks.find(t => t.id === trackId);
      if (!track) return;

      const labels = { title: 'Track Title', artist: 'Artist', trackNum: 'Track Number' };
      const currentVal = field === 'trackNum' ? (track.trackNumber || '') : (track[field] || track.title || '');

      // Use custom modal instead of prompt() (not supported in Electron)
      const newVal = await new Promise(resolve => {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6)';
        modal.innerHTML = `<div style="background:#1a1a2e;border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:24px;min-width:320px">
          <h4 style="margin:0 0 12px;color:#fff;font-size:15px">${labels[field] || field}</h4>
          <input type="text" value="${(currentVal+'').replace(/"/g,'&quot;')}" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:#fff;font-size:14px;outline:none;box-sizing:border-box" autofocus>
          <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end">
            <button data-cancel style="padding:6px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:#fff;cursor:pointer">Cancel</button>
            <button data-ok style="padding:6px 16px;border-radius:8px;border:none;background:#2a8ef2;color:#fff;cursor:pointer">Save</button>
          </div></div>`;
        document.body.appendChild(modal);
        const input = modal.querySelector('input');
        input.focus();
        input.select();
        const close = val => { modal.remove(); resolve(val); };
        modal.querySelector('[data-cancel]').onclick = () => close(null);
        modal.querySelector('[data-ok]').onclick = () => close(input.value);
        input.onkeydown = e => { if (e.key === 'Enter') close(input.value); if (e.key === 'Escape') close(null); };
        modal.onclick = e => { if (e.target === modal) close(null); };
      });
      if (newVal !== null && newVal !== currentVal) {
        try {
          await fetch('/api/metadata/rename', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath: decodeURIComponent(track.path || trackId), field, value: newVal }),
          });
          // Immediately update the row UI
          const row = grid.querySelector(`tr[data-track-id="${CSS.escape(trackId)}"]`);
          if (row) {
            if (field === 'title') {
              const titleEl = row.querySelector('.track-title-main');
              if (titleEl) titleEl.textContent = newVal;
            } else if (field === 'artist') {
              const artistEl = row.querySelector('.track-artist-secondary');
              if (artistEl) artistEl.textContent = newVal;
            } else if (field === 'trackNum') {
              const numEl = row.querySelector('.col-num');
              if (numEl) numEl.textContent = newVal;
            }
          }
          // Refresh library after rename
          grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
        } catch (e) { console.error('[Rename] Failed:', e); }
      }
      return;
    }

    // ── Regenerate word timestamps (single track) ──
    const regenTimestampsBtn = event.target.closest?.('[data-regen-timestamps]');
    if (regenTimestampsBtn) {
      event.preventDefault();
      event.stopPropagation();
      regenTimestampsBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      const trackId = regenTimestampsBtn.dataset.trackId;
      const track = activeAlbum.tracks.find(t => t.id === trackId);
      if (track) {
        const trackPath = decodeURIComponent(track.path || track.id);
        // Check if synced data already exists
        try {
          const statusRes = await fetch('/api/lyrics/check-assets', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath }),
          });
          const status = await statusRes.json();
          if (status.hasSynced && !confirm('Existing synced lyrics found. Running this will override current data.\nA backup of the old file will be created automatically.\n\nProceed?')) return;
        } catch {}
        regenTimestampsBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px;animation:lyrics-spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Regenerating…';
        regenTimestampsBtn.disabled = true;
        // Register in AI Activity Hub
        const hub = window.aiHub;
        const taskId = `whisper-single-${trackPath}-${Date.now()}`;
        const trackName = track.title || track.name || trackPath.split('/').pop();
        hub?.addTask({ id: taskId, type: 'whisper', label: `Word stamps: ${trackName}`, total: 1, trackPath, trackIndex: -1 });
        try {
          await fetch('/api/lyrics/enrich-track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath, force: true }),
          });
          // enrich-track returns after storing line-level lyrics; Whisper runs async.
          // Poll enhance-status until done/failed.
          let pollCount = 0;
          const pollTimer = setInterval(async () => {
            pollCount++;
            if (pollCount > 120) { // 10 min max
              clearInterval(pollTimer);
              hub?.failTask(taskId);
              regenTimestampsBtn.innerHTML = 'Timeout';
              regenTimestampsBtn.disabled = false;
              return;
            }
            // If task was cancelled via hub, stop polling
            const hubTask = hub?.tasks.get(taskId);
            if (hubTask && hubTask.status !== 'running') {
              clearInterval(pollTimer);
              regenTimestampsBtn.innerHTML = '✓ Cancelled';
              regenTimestampsBtn.disabled = false;
              return;
            }
            try {
              const statusRes = await fetch('/api/lyrics/enhance-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackPath }),
              });
              const info = await statusRes.json();
              if (info.stepLabel || info.step) hub?.updateTask(taskId, 0, 1, info.stepLabel, info.step);
              if (info.status === 'done' || info.status === 'none') {
                clearInterval(pollTimer);
                hub?.completeTask(taskId);
                regenTimestampsBtn.innerHTML = 'Done';
                refreshTrackAssetStatus(track);
                document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath } }));
                grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
                setTimeout(() => { regenTimestampsBtn.disabled = false; regenTimestampsBtn.textContent = 'Regenerate timestamps'; }, 3000);
              } else if (info.status === 'failed' || info.status === 'error') {
                clearInterval(pollTimer);
                hub?.failTask(taskId);
                regenTimestampsBtn.innerHTML = 'Failed';
                regenTimestampsBtn.disabled = false;
              }
            } catch {}
          }, 5000);
        } catch {
          hub?.failTask(taskId);
        }
      }
      return;
    }

    // ── Regenerate translation (single track) ──
    const regenTranslationBtn = event.target.closest?.('[data-regen-translation]');
    if (regenTranslationBtn) {
      event.preventDefault();
      event.stopPropagation();
      regenTranslationBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      const trackId = regenTranslationBtn.dataset.trackId;
      const track = activeAlbum.tracks.find(t => t.id === trackId);
      if (track) {
        const trackPath = decodeURIComponent(track.path || track.id);
        const targetLang = window.musicRuntime?.settings?.translationLang || 'uk';
        // Check if translation already exists
        try {
          const statusRes = await fetch('/api/lyrics/check-assets', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath, targetLang }),
          });
          const status = await statusRes.json();
          if (status.hasTranslation && !confirm('Existing translation found. Running this will override current data.\nA backup of the old file will be created automatically.\n\nProceed?')) return;
        } catch {}
        try {
          const resp = await fetch('/api/lyrics/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              trackPath,
              targetLang,
              lines: [{ text: 'placeholder' }],
              force: true,
            }),
          });
          if (resp.ok) {
            refreshTrackAssetStatus(track);
            document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath } }));
          }
        } catch {}
      }
      return;
    }

    // ── Regenerate all word timestamps (album) ──
    const regenAlbumTimestampsBtn = event.target.closest?.('[data-regen-album-timestamps]');
    if (regenAlbumTimestampsBtn) {
      event.preventDefault();
      event.stopPropagation();
      regenAlbumTimestampsBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      // Check how many tracks already have synced data
      let existingCount = 0;
      const trackPaths = activeAlbum.tracks.map(t => decodeURIComponent(t.path || t.id));
      try {
        const res = await fetch('/api/lyrics/check-assets-album', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tracks: trackPaths }),
        });
        const statuses = await res.json();
        existingCount = Object.values(statuses).filter(s => s.hasSynced).length;
      } catch {}
      const warnMsg = existingCount > 0
        ? `${existingCount}/${trackPaths.length} tracks already have synced lyrics.\nExisting files will be backed up automatically before overwriting.\n\nRe-run Whisper AI for all tracks?`
        : 'Regenerate word timestamps for all tracks in this album? This will run Whisper AI.';
      if (!confirm(warnMsg)) return;
      const hub = window.aiHub;
      for (let i = 0; i < activeAlbum.tracks.length; i++) {
        const track = activeAlbum.tracks[i];
        const trackPath = decodeURIComponent(track.path || track.id);
        const trackName = track.title || track.name || trackPath.split('/').pop();
        const taskId = `whisper-album-${trackPath}-${Date.now()}`;
        const abort = new AbortController();
        hub?.addTask({ id: taskId, type: 'enhance', label: `Whisper: ${trackName}`, total: 1, trackPath, trackIndex: i });
        // Store abort controller on the task for cancellation
        const task = hub?.tasks.get(taskId);
        if (task) task._abort = abort;
        if (task?.status === 'cancelled') continue;
        try {
          await fetch('/api/lyrics/enrich-track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackPath, force: true }),
            signal: abort.signal,
          });
          // Poll for whisper completion (enrich returns after line-level, whisper is async)
          let done = false;
          for (let poll = 0; poll < 120 && !done; poll++) {
            const hubTask = hub?.tasks.get(taskId);
            if (hubTask && hubTask.status !== 'running') break;
            await new Promise(r => setTimeout(r, 5000));
            try {
              const sr = await fetch('/api/lyrics/enhance-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackPath }),
                signal: abort.signal,
              });
              const info = await sr.json();
              if (info.stepLabel || info.step) hub?.updateTask(taskId, 0, 1, info.stepLabel, info.step);
              if (info.status === 'done' || info.status === 'none') {
                hub?.completeTask(taskId);
                refreshTrackAssetStatus(track);
                document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath } }));
                done = true;
              }
              else if (info.status === 'failed' || info.status === 'error') { hub?.failTask(taskId); done = true; }
            } catch (e) {
              if (e.name === 'AbortError') { done = true; break; }
            }
          }
          if (!done) hub?.failTask(taskId);
        } catch (e) {
          if (e.name === 'AbortError') continue;
          hub?.failTask(taskId);
        }
      }
      grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
      return;
    }

    // ── Regenerate all translations (album) ──
    const regenAlbumTranslationBtn = event.target.closest?.('[data-regen-album-translation]');
    if (regenAlbumTranslationBtn) {
      event.preventDefault();
      event.stopPropagation();
      regenAlbumTranslationBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      const targetLang = window.musicRuntime?.settings?.translationLang || 'uk';
      // Check how many tracks already have translations
      let existingCount = 0;
      const trackPaths = activeAlbum.tracks.map(t => decodeURIComponent(t.path || t.id));
      try {
        const res = await fetch('/api/lyrics/check-assets-album', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tracks: trackPaths, targetLang }),
        });
        const statuses = await res.json();
        existingCount = Object.values(statuses).filter(s => s.hasTranslation).length;
      } catch {}
      const warnMsg = existingCount > 0
        ? `${existingCount}/${trackPaths.length} tracks already have translations.\nExisting files will be backed up automatically before overwriting.\n\nRe-translate all tracks?`
        : 'Translate all tracks in this album?';
      if (!confirm(warnMsg)) return;
      const hub = window.aiHub;
      for (let i = 0; i < activeAlbum.tracks.length; i++) {
        const track = activeAlbum.tracks[i];
        const trackPath = decodeURIComponent(track.path || track.id);
        const trackName = track.title || track.name || trackPath.split('/').pop();
        const taskId = `translate-album-${trackPath}-${Date.now()}`;
        const abort = new AbortController();
        hub?.addTask({ id: taskId, type: 'translate', label: `Translate: ${trackName}`, total: 1, trackPath, trackIndex: i });
        const task = hub?.tasks.get(taskId);
        if (task) task._abort = abort;
        if (task?.status === 'cancelled') continue;
        try {
          const resp = await fetch('/api/lyrics/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              trackPath,
              targetLang,
              lines: [{ text: 'placeholder' }],
              force: true,
            }),
            signal: abort.signal,
          });
          if (resp.ok) {
            hub?.completeTask(taskId);
            refreshTrackAssetStatus(track);
            document.dispatchEvent(new CustomEvent('chromic:track-assets-updated', { detail: { trackPath } }));
          } else {
            hub?.failTask(taskId);
          }
        } catch (e) {
          if (e.name === 'AbortError') continue;
          hub?.failTask(taskId);
        }
      }
      return;
    }

    const deleteTrackButton = event.target.closest?.('[data-delete-track-id]');
    if (deleteTrackButton) {
      event.preventDefault();
      event.stopPropagation();
      const trackId = deleteTrackButton.dataset.deleteTrackId;
      deleteTrackButton.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      if (trackId) {
        await onDeleteTrack?.(trackId);
      }
      return;
    }

    // Album-level queue (add all tracks)
    const albumQueueBtn = event.target.closest?.('[data-album-queue]');
    if (albumQueueBtn) {
      event.preventDefault();
      event.stopPropagation();
      const mode = albumQueueBtn.dataset.albumQueue;
      albumQueueBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      for (const track of activeAlbum.tracks) {
        onQueueAction?.(track.id, mode);
      }
      return;
    }

    // Rename album metadata (album name or artist for all tracks)
    const renameAlbumBtn = event.target.closest?.('[data-rename-album]');
    if (renameAlbumBtn) {
      event.preventDefault();
      event.stopPropagation();
      const field = renameAlbumBtn.dataset.field;
      renameAlbumBtn.closest?.('[data-more-menu]')?.setAttribute('hidden', '');
      const labels = { album: 'Album Name', artist: 'Album Artist' };
      const currentVal = field === 'artist'
        ? (inferAlbumArtist(activeAlbum.tracks) || '')
        : (activeAlbum.name || '');
      const newVal = await new Promise(resolve => {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6)';
        modal.innerHTML = `<div style="background:#1a1a2e;border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:24px;min-width:320px">
          <h4 style="margin:0 0 12px;color:#fff;font-size:15px">${labels[field] || field}</h4>
          <input type="text" value="${(currentVal+'').replace(/"/g,'&quot;')}" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:#fff;font-size:14px;outline:none;box-sizing:border-box" autofocus>
          <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end">
            <button data-cancel style="padding:6px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:#fff;cursor:pointer">Cancel</button>
            <button data-ok style="padding:6px 16px;border-radius:8px;border:none;background:#2a8ef2;color:#fff;cursor:pointer">Save</button>
          </div></div>`;
        document.body.appendChild(modal);
        const input = modal.querySelector('input');
        input.focus();
        input.select();
        const close = val => { modal.remove(); resolve(val); };
        modal.querySelector('[data-cancel]').onclick = () => close(null);
        modal.querySelector('[data-ok]').onclick = () => close(input.value);
        input.onkeydown = e => { if (e.key === 'Enter') close(input.value); if (e.key === 'Escape') close(null); };
        modal.onclick = e => { if (e.target === modal) close(null); };
      });
      if (newVal !== null && newVal !== currentVal) {
        try {
          // Rename field on all tracks in the album
          await Promise.all(activeAlbum.tracks.map(track => {
            const tp = decodeURIComponent(track.path || track.id);
            console.log('[Rename Album] track:', tp, 'field:', field, 'value:', newVal);
            return fetch('/api/metadata/rename', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ trackPath: tp, field, value: newVal }),
            });
          }));
          // Immediately update header with new value
          if (field === 'album') {
            const h3 = grid.querySelector('.album-view-meta h3');
            if (h3) h3.textContent = newVal;
            const navLabel = grid.querySelector('.nav-current-label');
            if (navLabel) navLabel.textContent = newVal;
          } else if (field === 'artist') {
            const artistEl = grid.querySelector('[data-album-artist]');
            if (artistEl) {
              const year = artistEl.textContent.match(/•\s*(\d{4})/)?.[1];
              artistEl.textContent = year ? `${newVal} • ${year}` : newVal;
              artistEl.dataset.albumArtist = newVal;
            }
          }
          grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
        } catch (e) { console.error('[Rename Album] Failed:', e); }
      }
      return;
    }

    const deleteAlbumButton = event.target.closest?.('[data-delete-album-key]');
    if (deleteAlbumButton) {
      event.preventDefault();
      event.stopPropagation();
      const albumKey = deleteAlbumButton.dataset.deleteAlbumKey;
      if (albumKey) {
        await onDeleteAlbum?.(albumKey);
      }
      return;
    }

    const navButton = event.target.closest?.('.music-album-nav-btn');
    if (navButton && !event.target.closest?.('.album-track-row')) {
      event.preventDefault();
      if (navButton.hasAttribute('data-back-to-albums')) {
        onBackToAlbums?.();
        return;
      }
      onAlbumSelect(navButton.dataset.albumKey);
      return;
    }

    const expandButton = event.target.closest?.('.expand-fullscreen-btn');
    if (expandButton && !event.target.closest?.('.album-track-row')) {
      event.preventDefault();
      const shuffle = expandButton.dataset.shuffle === 'true';
      const sourceElement = grid.querySelector('.album-view-cover') || expandButton;
      onExpand(activeAlbum, { sourceElement, shuffle });
      return;
    }

    // Sync Lyrics button — trigger premium enrichment for all album tracks
    const syncBtn = event.target.closest?.('[data-sync-album-key]');
    if (syncBtn) {
      event.preventDefault();
      // If data exists, confirm force re-sync
      if (syncBtn._hasExisting) {
        if (!confirm('All tracks already have synced lyrics. Re-sync will overwrite existing data. Continue?')) return;
      }
      syncBtn.disabled = true;
      syncBtn.innerHTML = `${_icoSpinner}Syncing...`;
      syncBtn.dataset.syncing = '1';
      try {
        const trackPaths = activeAlbum.tracks.map(t => t.path || t.id);
        const res = await fetch('/api/lyrics/enrich-album', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tracks: trackPaths, force: true }),
        });
        const data = await res.json();
        if (data.ok && (data.queued || 0) === 0) {
          syncBtn.innerHTML = `${_icoCheck}Re-Sync Lyrics`;
          syncBtn._hasExisting = true;
          syncBtn.disabled = false;
          delete syncBtn.dataset.syncing;
        } else {
          syncBtn.innerHTML = data.ok ? `${_icoSpinner}${data.queued} syncing...` : `${_icoX}Failed`;
        }
      } catch (e) {
        syncBtn.innerHTML = `${_icoX}Error`;
      }
      setTimeout(() => {
        if (syncBtn.dataset.syncing) {
          syncBtn.innerHTML = `${_icoCheck}Re-Sync Lyrics`;
          syncBtn._hasExisting = true;
          syncBtn.disabled = false;
          delete syncBtn.dataset.syncing;
        }
      }, 3000);
      return;
    }

    // Translate album button — translate lyrics for all tracks
    const translateBtn = event.target.closest?.('[data-translate-album-key]');
    if (translateBtn) {
      event.preventDefault();
      // If data exists, confirm force re-translate
      if (translateBtn._hasExisting) {
        if (!confirm('All tracks already have translations. Re-translate will overwrite existing data. Continue?')) return;
      }
      translateBtn.disabled = true;
      translateBtn.innerHTML = `${_icoSpinner}Translating...`;
      try {
        const trackPaths = activeAlbum.tracks.map(t => t.path || t.id);
        const res = await fetch('/api/lyrics/translate-album', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tracks: trackPaths, force: true }),
        });
        const data = await res.json();
        if (data.ok && (data.remaining || 0) === 0) {
          translateBtn.innerHTML = `${_icoCheck}Re-Translate`;
          translateBtn._hasExisting = true;
          translateBtn.disabled = false;
        } else {
          translateBtn.innerHTML = data.ok ? `${_icoSpinner}${data.translated}/${data.total} done` : `${_icoX}Failed`;
          if (!data.ok) {
            setTimeout(() => { translateBtn.innerHTML = `${_icoGlobe}Translate`; translateBtn.disabled = false; }, 3000);
          } else {
            translateBtn.disabled = false;
          }
        }
      } catch (e) {
        translateBtn.innerHTML = `${_icoX}Error`;
        setTimeout(() => { translateBtn.innerHTML = `${_icoGlobe}Translate`; translateBtn.disabled = false; }, 3000);
      }
      return;
    }

    // Set Cover button — native dialog or file input
    const coverBtn = event.target.closest?.('[data-cover-album-key]');
    if (coverBtn) {
      event.preventDefault();
      const albumKey = coverBtn.dataset.coverAlbumKey;
      let imagePath = null;

      if (window.chromicElectron?.openImageDialog) {
        imagePath = await window.chromicElectron.openImageDialog();
        if (imagePath) {
          const res = await fetch('/api/album/set-cover', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ albumKey, imagePath }),
          });
          const data = await res.json();
          if (data.ok) {
            const coverImg = grid.querySelector('.album-view-cover');
            if (coverImg) coverImg.src = coverImg.src + '?t=' + Date.now();
          }
        }
      } else {
        // Browser fallback: file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          const formData = new FormData();
          formData.append('coverImage', file);
          formData.append('albumKey', albumKey);
          const res = await fetch('/api/album/set-cover-upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.ok) {
            const coverImg = grid.querySelector('.album-view-cover');
            if (coverImg) coverImg.src = coverImg.src + '?t=' + Date.now();
          }
        };
        input.click();
      }
      return;
    }

    const trackRow = event.target.closest?.('.album-track-row[data-track-id]');
    if (trackRow) {
      // Don't play track when clicking checkbox area
      if (event.target.closest('.col-select') || event.target.matches('[data-select-track]')) return;
      event.preventDefault();
      onTrackSelect(trackRow.dataset.trackId);
    }
  };

  // Ensure all album/track "more" menus have icons for every action.
  grid.querySelectorAll('.media-more-menu').forEach((menuEl) => ensureMediaMoreMenuIcons(menuEl));

  // Album search filtering + keyboard nav
  // Fuzzy search: matches if all query words appear in text (in any order), ignoring punctuation
  const fuzzyMatch = (text, query) => {
    if (!query) return true;
    const normalizedText = text.replace(/['']/g, '').replace(/[^\w\s]/g, ' ').toLowerCase();
    const words = query.replace(/['']/g, '').replace(/[^\w\s]/g, ' ').toLowerCase().split(/\s+/).filter(Boolean);
    return words.every(word => normalizedText.includes(word));
  };

  const searchInput = grid.querySelector('.album-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      const options = grid.querySelectorAll('.music-album-nav-option');
      options.forEach((opt) => {
        const text = opt.dataset.searchText || opt.textContent.toLowerCase();
        opt.style.display = fuzzyMatch(text, query) ? '' : 'none';
      });
    });
    searchInput.addEventListener('keydown', (e) => {
      const list = grid.querySelector('.album-results-list');
      if (!list) return;
      const visible = Array.from(list.querySelectorAll('.music-album-nav-option')).filter(o => o.style.display !== 'none');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (visible.length) visible[0].focus();
      } else if (e.key === 'Escape') {
        const navList = grid.querySelector('.music-album-nav-list');
        if (navList) navList.hidden = true;
        const trigger = grid.querySelector('.music-album-nav-current');
        if (trigger) { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (visible.length === 1 && visible[0].dataset.albumKey) {
          onAlbumSelect(visible[0].dataset.albumKey);
        }
      }
    });
    // Arrow key navigation within options
    grid.querySelector('.album-results-list')?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const visible = Array.from(grid.querySelectorAll('.music-album-nav-option')).filter(o => o.style.display !== 'none');
        const idx = visible.indexOf(document.activeElement);
        if (e.key === 'ArrowDown' && idx < visible.length - 1) visible[idx + 1].focus();
        if (e.key === 'ArrowUp' && idx > 0) visible[idx - 1].focus();
        if (e.key === 'ArrowUp' && idx === 0) searchInput.focus();
      } else if (e.key === 'Escape') {
        const navList = grid.querySelector('.music-album-nav-list');
        if (navList) navList.hidden = true;
        const trigger = grid.querySelector('.music-album-nav-current');
        if (trigger) { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); }
      }
    });
  }
};

/**
 * Graveyard (Trash) view — shows soft-deleted tracks with restore/purge actions.
 */
async function showGraveyardView(grid, escapeHtml) {
  // Issue 7: Save scroll position before showing graveyard
  grid._graveyardScrollRestore = window.scrollY;

  let data;
  try {
    const res = await fetch('/api/media/deleted');
    data = await res.json();
  } catch (e) {
    console.error('[graveyard] Failed to fetch deleted tracks:', e);
    return;
  }

  const tracks = data?.tracks || [];

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  grid.innerHTML = `
    <article class="music-album-view graveyard-view">
      <nav class="music-album-nav" aria-label="Trash">
        <button type="button" class="music-album-nav-btn focusable" data-graveyard-back>← All Albums</button>
        <h2 class="graveyard-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:6px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          Trash <span class="graveyard-badge">${tracks.length}</span>
        </h2>
      </nav>
      ${tracks.length === 0
        ? '<div class="graveyard-empty"><p>Trash is empty.</p></div>'
        : `
      <div class="graveyard-search-bar" style="padding:8px 16px;">
        <input type="text" class="graveyard-search-input" placeholder="Search deleted tracks…" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid var(--border-subtle,#333);background:var(--bg-secondary,#1a1a1a);color:inherit;font-size:0.9rem;" />
      </div>
      <div class="graveyard-actions-bar">
        <button type="button" class="bulk-action-btn" data-graveyard-restore-all>Restore All</button>
        <button type="button" class="bulk-action-btn bulk-action-danger" data-graveyard-purge>Empty Trash Permanently</button>
      </div>
      <table class="album-table graveyard-table">
        <thead>
          <tr>
            <th class="col-select"><label class="track-select-checkbox"><input type="checkbox" data-graveyard-select-all /><span class="track-checkbox-visual"></span></label></th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Deleted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${tracks.map(t => `
            <tr class="album-track-row graveyard-row" data-graveyard-path="${escapeHtml(t.path)}">
              <td class="col-select"><label class="track-select-checkbox"><input type="checkbox" data-graveyard-check="${escapeHtml(t.path)}" /><span class="track-checkbox-visual"></span></label></td>
              <td class="col-title">${escapeHtml(t.title || t.path)}</td>
              <td>${escapeHtml(t.artist || '—')}</td>
              <td>${escapeHtml(t.album || '—')}</td>
              <td class="col-duration">${formatDate(t.deleted_at)}</td>
              <td class="col-actions">
                <button type="button" class="track-action-icon graveyard-restore-btn focusable" data-graveyard-restore="${escapeHtml(t.path)}" title="Restore">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>`
      }
    </article>
  `;

  // Search filtering
  const searchInput = grid.querySelector('.graveyard-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      grid.querySelectorAll('.graveyard-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = q && !text.includes(q) ? 'none' : '';
      });
    });
  }

  // Issue 7: Scroll to top when graveyard opens
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Back button
  grid.querySelector('[data-graveyard-back]')?.addEventListener('click', () => {
    // Force re-render of albums grid
    grid._cachedAlbumsGrid = null;
    grid._cachedAlbumsFingerprint = null;
    const savedScroll = grid._graveyardScrollRestore ?? window.musicRuntime?._albumsScrollTop ?? 0;
    grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
    requestAnimationFrame(() => {
      window._chromicResetSmoothScroll?.(savedScroll);
      window.scrollTo({ top: savedScroll, behavior: 'instant' });
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: 'instant' });
      });
    });
  });

  // Select all checkbox
  grid.querySelector('[data-graveyard-select-all]')?.addEventListener('change', (e) => {
    grid.querySelectorAll('[data-graveyard-check]').forEach(cb => cb.checked = e.target.checked);
  });

  // Individual restore
  grid.addEventListener('click', async (e) => {
    const restoreBtn = e.target.closest('[data-graveyard-restore]');
    if (restoreBtn) {
      const trackPath = restoreBtn.dataset.graveyardRestore;
      try {
        const res = await fetch('/api/media/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: trackPath }),
        });
        const result = await res.json();
        if (res.status === 410) {
          alert(result.error || 'Source files missing. Cannot restore.');
          return;
        }
        if (!res.ok) throw new Error(result.error);
        restoreBtn.closest('.graveyard-row')?.remove();
        // Update count
        const badge = grid.querySelector('.graveyard-badge');
        const remaining = grid.querySelectorAll('.graveyard-row').length;
        if (badge) badge.textContent = remaining;
        if (remaining === 0) {
          grid.querySelector('.graveyard-table')?.remove();
          grid.querySelector('.graveyard-actions-bar')?.remove();
          grid.querySelector('.graveyard-search-bar')?.remove();
          const article = grid.querySelector('.graveyard-view');
          if (article) article.insertAdjacentHTML('beforeend', '<div class="graveyard-empty"><p>Trash is empty.</p></div>');
        }
        // Notify library to refresh so restored track appears
        grid._cachedAlbumsGrid = null;
        grid._cachedAlbumsFingerprint = null;
        grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
      } catch (err) {
        alert('Restore failed: ' + err.message);
      }
      return;
    }

    // Restore All
    if (e.target.closest('[data-graveyard-restore-all]')) {
      const checked = grid.querySelectorAll('[data-graveyard-check]:checked');
      const paths = checked.length > 0
        ? [...checked].map(cb => cb.dataset.graveyardCheck)
        : [...grid.querySelectorAll('[data-graveyard-check]')].map(cb => cb.dataset.graveyardCheck);
      if (!paths.length) return;
      const label = checked.length > 0 ? `Restore ${paths.length} selected track(s)?` : `Restore all ${paths.length} track(s)?`;
      if (!window.confirm(label)) return;
      try {
        const res = await fetch('/api/media/bulk-restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths }),
        });
        const result = await res.json();
        const failures = (result.results || []).filter(r => !r.restored);
        if (failures.length > 0) {
          alert(`${failures.length} track(s) could not be restored:\n${failures.map(f => `• ${f.path}: ${f.reason}`).join('\n')}`);
        }
        // Refresh the graveyard view
        await showGraveyardView(grid, escapeHtml);
        // Notify library to refresh so restored tracks appear
        grid._cachedAlbumsGrid = null;
        grid._cachedAlbumsFingerprint = null;
        grid.dispatchEvent(new CustomEvent('chromic:refresh-library'));
      } catch (err) {
        alert('Restore failed: ' + err.message);
      }
      return;
    }

    // Purge (Empty Trash)
    if (e.target.closest('[data-graveyard-purge]')) {
      const count = grid.querySelectorAll('.graveyard-row').length;
      if (!window.confirm(`Permanently delete ${count} track(s) from the database? This cannot be undone.`)) return;
      try {
        await fetch('/api/media/purge-deleted', { method: 'POST' });
        await showGraveyardView(grid, escapeHtml);
      } catch (err) {
        alert('Purge failed: ' + err.message);
      }
    }
  });
}

