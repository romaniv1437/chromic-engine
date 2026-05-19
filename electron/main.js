/**
 * Chromic Engine — Electron Main Process
 * Starts the Express server and opens a GPU-accelerated BrowserWindow.
 */

const { app, BrowserWindow, shell, ipcMain, dialog, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const { buildMenu } = require('./menu.js');

// Do not mutate Electron.app bundle files at runtime on macOS.
// Editing Info.plist invalidates signatures and can trigger SIGKILL on native module load.

// ── Performance Configuration ────────────────────────────────────────────────

const PERF_CONFIG_PATH = path.join(__dirname, '..', 'media', '.chromic-performance.json');

const PERFORMANCE_PROFILES = {
  low:  { maxRam: 2048, gpuMemory: 512,  highPriority: false, label: 'Low (2GB RAM, 512MB VRAM)' },
  high: { maxRam: 4096, gpuMemory: 2048, highPriority: true,  label: 'High (4GB RAM, 2GB VRAM)' },
  god:  { maxRam: 8192, gpuMemory: 4096, highPriority: true,  label: 'God Mode (8GB RAM, 4GB VRAM)' },
};

function loadPerfConfig() {
  const defaults = { profile: 'high', maxRam: 4096, gpuMemory: 2048, highPriority: true };
  try {
    if (fs.existsSync(PERF_CONFIG_PATH)) {
      return { ...defaults, ...JSON.parse(fs.readFileSync(PERF_CONFIG_PATH, 'utf-8')) };
    }
  } catch (_) { /* ignore */ }
  return defaults;
}

function savePerfConfig(config) {
  try {
    fs.writeFileSync(PERF_CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('[Perf] Failed to save config:', e.message);
  }
  return config;
}

const perfConfig = loadPerfConfig();

// ── Chromium Command Line Flags (must be set before app.ready) ───────────────

// JS Heap size
app.commandLine.appendSwitch('js-flags', `--max-old-space-size=${perfConfig.maxRam}`);

// GPU VRAM allocation
app.commandLine.appendSwitch('force-gpu-mem-available-mb', `${perfConfig.gpuMemory}`);

// Hardware acceleration — force enable
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-oop-rasterization');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,VaapiVideoEncoder,SharedArrayBuffer,CanvasOopRasterization');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('enable-high-res-timer');
app.commandLine.appendSwitch('enable-gpu-compositing');
app.commandLine.appendSwitch('force-device-scale-factor', '1');

// Prevent throttling when window loses focus (needed for music playback)
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');

// NOTE: disable-frame-rate-limit removed — it uncaps the compositor and causes
// extreme GPU usage when fpsMax=0 (unlimited). Visualizer already manages its
// own frame budget via setMaxFps(). VSync is the correct default.

// Force discrete GPU on multi-GPU systems
if (perfConfig.highPriority) {
  app.commandLine.appendSwitch('force_high_performance_gpu');
}

console.log(`[Perf] Profile: ${perfConfig.profile} | RAM: ${perfConfig.maxRam}MB | VRAM: ${perfConfig.gpuMemory}MB | Priority: ${perfConfig.highPriority}`);

// ── Process Priority ─────────────────────────────────────────────────────────

function applyProcessPriority(highPriority) {
  if (!highPriority) return;
  try {
    // -10 = high priority on Unix, maps to ABOVE_NORMAL on Windows
    os.setPriority(process.pid, -10);
    console.log('[Perf] Process priority set to HIGH');
  } catch (e) {
    console.warn('[Perf] Could not set process priority:', e.message);
  }
}

// ── Engine Health Monitor ────────────────────────────────────────────────────

function getEngineHealth() {
  const mem = process.memoryUsage();
  const sysMem = {
    totalMB: Math.round(os.totalmem() / 1048576),
    freeMB: Math.round(os.freemem() / 1048576),
  };
  return {
    heap: {
      usedMB: Math.round(mem.heapUsed / 1048576),
      totalMB: Math.round(mem.heapTotal / 1048576),
      limitMB: perfConfig.maxRam,
      rss: Math.round(mem.rss / 1048576),
      external: Math.round(mem.external / 1048576),
    },
    system: sysMem,
    gpu: { allocatedMB: perfConfig.gpuMemory },
    uptime: Math.round(process.uptime()),
    cpus: os.cpus().length,
    profile: perfConfig.profile,
  };
}

// Single instance lock
// Ensure we don't share the generic "Electron" userData lock path with other apps.
if (app.getName() === 'Electron') {
  app.setName('Chromic Engine');
}
app.setPath('userData', path.join(app.getPath('appData'), 'Chromic Engine'));

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  console.warn('[Electron] Another Chromic Engine instance is already running; exiting second instance.');
  app.quit();
}

let mainWindow = null;
let serverPort = null;

function initAutoUpdates() {
  if (!app.isPackaged) return;

  try {
    const runtimeToken = process.env.CHROMIC_UPDATER_TOKEN || process.env.GH_TOKEN || '';
    // For public GitHub repos, electron-updater works without a token.
    // Only set GH_TOKEN if one is provided (needed for private repos).
    if (runtimeToken) {
      process.env.GH_TOKEN = runtimeToken;
    }

    const { autoUpdater } = require('electron-updater');
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on('checking-for-update', () => {
      console.log('[Updater] Checking for update...');
    });
    autoUpdater.on('update-available', (info) => {
      console.log(`[Updater] Update available: ${info?.version || 'unknown'}`);
    });
    autoUpdater.on('update-not-available', () => {
      console.log('[Updater] No updates available');
    });
    autoUpdater.on('error', (err) => {
      console.warn('[Updater] Error:', err?.message || err);
    });
    autoUpdater.on('download-progress', (progress) => {
      const pct = Number.isFinite(progress?.percent) ? progress.percent.toFixed(1) : '0.0';
      console.log(`[Updater] Downloading update: ${pct}%`);
    });
    autoUpdater.on('update-downloaded', async (info) => {
      console.log(`[Updater] Update downloaded: ${info?.version || 'unknown'}`);
      const target = mainWindow && !mainWindow.isDestroyed() ? mainWindow : null;
      const result = await dialog.showMessageBox(target, {
        type: 'info',
        buttons: ['Restart now', 'Later'],
        defaultId: 0,
        cancelId: 1,
        title: 'Update ready',
        message: 'A new version of Chromic Engine has been downloaded.',
        detail: 'Restart now to apply the update.',
      });
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });

    // Defer initial check slightly so startup is not blocked.
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch((e) => {
        console.warn('[Updater] Initial check failed:', e?.message || e);
      });
    }, 3000);
  } catch (e) {
    console.warn('[Updater] Disabled due to initialization error:', e?.message || e);
  }
}

function resolveScriptsPath() {
  const isDev = !app.isPackaged;
  return isDev
    ? path.join(__dirname, '..', 'scripts')
    : path.join(process.resourcesPath, 'scripts');
}

function ensureAlignerExecutables() {
  const scriptsPath = resolveScriptsPath();
  process.env.CHROMIC_SCRIPTS_ROOT = scriptsPath;

  if (app.isPackaged) {
    process.env.CHROMIC_MEDIA_ROOT = path.join(app.getPath('userData'), 'media');
    const bundledLyricsRoot = path.join(process.resourcesPath, 'lyrics-engine');
    const userLyricsRoot = path.join(app.getPath('userData'), 'lyrics-engine');

    // Keep runtime workspace writable in packaged app.
    process.env.CHROMIC_LYRICS_ROOT = userLyricsRoot;
    process.env.CHROMIC_BUNDLED_LYRICS_ROOT = bundledLyricsRoot;

    // Refresh core runtime files from bundled resources on each launch.
    try {
      fs.mkdirSync(userLyricsRoot, { recursive: true });
      const seedFiles = ['aligner.py', 'batch_align.py', 'requirements.txt'];
      for (const name of seedFiles) {
        const from = path.join(bundledLyricsRoot, name);
        const to = path.join(userLyricsRoot, name);
        if (fs.existsSync(from)) {
          fs.copyFileSync(from, to);
          console.log(`[Electron] Synced lyrics-engine asset: ${name}`);
        }
      }
    } catch (e) {
      console.warn('[Electron] Failed to seed lyrics-engine workspace:', e.message);
    }
  }

  if (process.platform !== 'darwin') return;

  const candidates = [
    path.join(scriptsPath, 'aligner.py'),
    path.join(scriptsPath, 'lyrics-engine', 'aligner.py'),
    path.join(process.env.CHROMIC_LYRICS_ROOT || '', 'aligner.py'),
    path.join(process.env.CHROMIC_BUNDLED_LYRICS_ROOT || '', 'aligner.py'),
  ].filter(Boolean);

  for (const scriptPath of candidates) {
    if (!fs.existsSync(scriptPath)) continue;
    try {
      fs.chmodSync(scriptPath, 0o755);
      console.log(`[Electron] Ensured executable: ${scriptPath}`);
    } catch (e) {
      console.warn(`[Electron] chmod failed for ${scriptPath}: ${e.message}`);
    }
  }
}

async function startServer() {
  ensureAlignerExecutables();
  const { app: expressApp, startWhisperWarmupIfNeeded } = require('../index.js');
  setTimeout(() => {
    try { startWhisperWarmupIfNeeded?.(); } catch (e) { console.warn('[Electron] Whisper warmup trigger failed:', e.message); }
  }, 700);
  return new Promise((resolve, reject) => {
    const server = expressApp.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      serverPort = addr.port;
      console.log(`[Electron] Express server started on http://127.0.0.1:${serverPort}`);
      resolve(serverPort);
    });
    server.on('error', reject);
  });
}

function createWindow() {
  // Resolve app icon using platform-specific build assets first.
  const iconCandidates = process.platform === 'win32'
    ? [path.join(__dirname, '..', 'build', 'icon.ico'), path.join(__dirname, '..', 'app-icon.png')]
    : [path.join(__dirname, '..', 'build', 'icon.png'), path.join(__dirname, '..', 'app-icon.png')];
  const iconPath = iconCandidates.find((p) => fs.existsSync(p)) || iconCandidates[iconCandidates.length - 1];

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: iconPath,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    trafficLightPosition: undefined,
    // Keep startup stable on macOS: transparent + vibrancy caused immediate crashes on some setups.
    transparent: false,
    vibrancy: undefined,
    visualEffectState: undefined,
    backgroundColor: '#0a0a0f',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      additionalArguments: [
        ...(process.argv.includes('--chromic-debug') ? ['--chromic-debug'] : []),
        ...(process.argv.includes('--chromic-perf') ? ['--chromic-perf'] : []),
      ],
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webgl: true,
      backgroundThrottling: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });

  // Set Content-Security-Policy BEFORE loading the URL
  // to suppress Electron security warning and allow worker blob scripts
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' http://127.0.0.1:*; " +
          "script-src 'self' 'unsafe-inline' blob: http://127.0.0.1:*; " +
          "script-src-elem 'self' 'unsafe-inline' blob: http://127.0.0.1:*; " +
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data: blob: http://127.0.0.1:*; " +
          "media-src 'self' blob: http://127.0.0.1:* file:; " +
          "connect-src 'self' http://127.0.0.1:* ws://127.0.0.1:* https://cdn.jsdelivr.net; " +
          "worker-src 'self' blob:; " +
          "child-src 'self' blob:; " +
          "font-src 'self' data: https://cdn.jsdelivr.net;"
        ],
      },
    });
  });

  mainWindow.loadURL(`http://127.0.0.1:${serverPort}`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    buildMenu(mainWindow);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
});

// ── Live Reload ──────────────────────────────────────────────────────────────

function setupLiveReload() {
  const publicDir = path.join(__dirname, '..', 'public');
  let reloadTimeout = null;
  const watcher = fs.watch(publicDir, { recursive: true }, (eventType, filename) => {
    if (!filename || !mainWindow) return;
    clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(() => {
      console.log(`[Electron] File changed: ${filename} — reloading`);
      mainWindow.webContents.reloadIgnoringCache();
    }, 300);
  });
  app.on('will-quit', () => watcher.close());
}

// ── IPC Handlers ─────────────────────────────────────────────────────────────

ipcMain.handle('window:minimize', () => mainWindow?.minimize());
ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize();
  else mainWindow?.maximize();
});
ipcMain.handle('window:close', () => mainWindow?.close());
ipcMain.handle('window:isMaximized', () => mainWindow?.isMaximized() ?? false);

// Native File Dialogs
ipcMain.handle('dialog:openMusic', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Add Music to Chromic Engine',
    properties: ['openFile', 'openDirectory', 'multiSelections'],
    filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg', 'aiff'] }],
  });
  return canceled ? [] : filePaths;
});

ipcMain.handle('dialog:openImage', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Album Artwork',
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp'] }],
  });
  return canceled ? null : filePaths[0] || null;
});

// Library folder linking — pick external music directory
ipcMain.handle('dialog:openLibraryFolder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: 'Link Music Library Folder',
    properties: ['openDirectory'],
    message: 'Select a folder containing your music. Files will be indexed without copying.',
  });
  return canceled ? null : filePaths[0] || null;
});

// Performance IPC
ipcMain.handle('perf:getHealth', () => getEngineHealth());

ipcMain.handle('perf:getConfig', () => ({
  ...perfConfig,
  profiles: Object.entries(PERFORMANCE_PROFILES).map(([key, p]) => ({ key, ...p })),
}));

ipcMain.handle('perf:setProfile', (_event, profileKey) => {
  const profile = PERFORMANCE_PROFILES[profileKey];
  if (!profile) return { ok: false, error: 'Unknown profile' };
  Object.assign(perfConfig, profile, { profile: profileKey });
  savePerfConfig(perfConfig);
  return { ok: true, needsRestart: true, config: perfConfig };
});

ipcMain.handle('perf:setCustom', (_event, { maxRam, gpuMemory, highPriority }) => {
  if (maxRam) perfConfig.maxRam = Math.max(512, Math.min(16384, maxRam));
  if (gpuMemory) perfConfig.gpuMemory = Math.max(256, Math.min(8192, gpuMemory));
  if (highPriority !== undefined) perfConfig.highPriority = !!highPriority;
  perfConfig.profile = 'custom';
  savePerfConfig(perfConfig);
  return { ok: true, needsRestart: true, config: perfConfig };
});

ipcMain.handle('perf:restart', () => {
  app.relaunch();
  app.exit(0);
});

ipcMain.handle('dep:getStatus', () => global.depStatus);

ipcMain.handle('perf:getRendererMemory', async () => {
  if (!mainWindow) return null;
  try {
    const metrics = await mainWindow.webContents.executeJavaScript(`
      (() => {
        const m = performance.memory || {};
        return {
          jsHeapUsedMB: Math.round((m.usedJSHeapSize || 0) / 1048576),
          jsHeapTotalMB: Math.round((m.totalJSHeapSize || 0) / 1048576),
          jsHeapLimitMB: Math.round((m.jsHeapSizeLimit || 0) / 1048576),
        };
      })()
    `);
    return metrics;
  } catch { return null; }
});

// ── Dependency Doctor ────────────────────────────────────────────────────────

global.depStatus = { ffmpeg: false, python: false, ffmpegVersion: null, pythonVersion: null };

function checkDependency(command) {
  return new Promise((resolve) => {
    exec(command, { timeout: 5000 }, (err, stdout) => {
      resolve(err ? null : stdout.trim());
    });
  });
}

async function runDependencyChecks() {
  const ffmpegOut = await checkDependency('ffmpeg -version');
  if (ffmpegOut) {
    global.depStatus.ffmpeg = true;
    const match = ffmpegOut.match(/ffmpeg version (\S+)/);
    global.depStatus.ffmpegVersion = match ? match[1] : 'unknown';
  }

  const pythonCmd = process.platform === 'win32' ? 'python --version' : 'python3 --version';
  const pythonOut = await checkDependency(pythonCmd);
  if (pythonOut) {
    global.depStatus.python = true;
    const match = pythonOut.match(/Python (\S+)/);
    global.depStatus.pythonVersion = match ? match[1] : 'unknown';
  }

  console.log(`[DepDoctor] ffmpeg: ${global.depStatus.ffmpeg ? '✅ ' + global.depStatus.ffmpegVersion : '❌ not found'}`);
  console.log(`[DepDoctor] python: ${global.depStatus.python ? '✅ ' + global.depStatus.pythonVersion : '❌ not found'}`);

  // Notify renderer if deps are missing
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('dep:status', global.depStatus);
  }
}

// ── Executable Permission Fix (macOS/Linux) ──────────────────────────────────

function ensureScriptsExecutable() {
  if (process.platform === 'win32') return;
  const dirs = [
    path.join(__dirname, '..', 'scripts'),
    path.join(__dirname, '..', 'lyrics-engine'),
  ];
  if (app.isPackaged && process.resourcesPath) {
    dirs.push(path.join(process.resourcesPath, 'scripts'));
    dirs.push(path.join(process.resourcesPath, 'lyrics-engine'));
  }
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    try {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.py') || f.endsWith('.sh'));
      for (const f of files) {
        const fp = path.join(dir, f);
        try { fs.chmodSync(fp, 0o755); } catch {}
      }
      if (files.length > 0) console.log(`[Permissions] chmod +x on ${files.length} scripts in ${path.basename(dir)}/`);
    } catch {}
  }
}

// ── App Lifecycle ────────────────────────────────────────────────────────────

app.on('ready', async () => {
  app.setName('Chromic Engine');
  applyProcessPriority(perfConfig.highPriority);

  // Set dock icon on macOS (BrowserWindow.icon doesn't affect the dock)
  if (process.platform === 'darwin' && app.dock) {
    const dockIcon = path.join(__dirname, '..', 'app-icon.png');
    if (fs.existsSync(dockIcon)) {
      app.dock.setIcon(dockIcon);
    }
  }
  try {
    await startServer();
    createWindow();
    ensureScriptsExecutable();
    initAutoUpdates();
    // Run dependency checks after window is ready (non-blocking)
    setTimeout(() => runDependencyChecks(), 1500);
    if (!app.isPackaged) {
      setupLiveReload();
    }
  } catch (err) {
    console.error('[Electron] Failed to start:', err);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (!mainWindow) createWindow();
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

// ── Global Safety Nets ───────────────────────────────────────────────────────

const CRASH_LOG_PATH = path.join(app.getPath('userData'), 'crash.log');

function appendCrashLog(type, err) {
  const timestamp = new Date().toISOString();
  const msg = `[${timestamp}] ${type}: ${err?.stack || err?.message || String(err)}\n`;
  try {
    fs.appendFileSync(CRASH_LOG_PATH, msg);
  } catch {}
  console.error(`[CrashGuard] ${type}:`, err);
}

process.on('uncaughtException', (err) => {
  appendCrashLog('UncaughtException', err);
  // Don't crash — log and continue unless it's truly fatal
  if (err?.message?.includes('EADDRINUSE') || err?.message?.includes('Cannot find module')) {
    dialog.showErrorBox('Chromic Engine — Fatal Error', err.message);
    app.quit();
  }
});

process.on('unhandledRejection', (reason) => {
  appendCrashLog('UnhandledRejection', reason);
});









