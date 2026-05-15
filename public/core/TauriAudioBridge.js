/**
 * @deprecated Tauri build is no longer maintained — Tauri's WebView lacks full Web Audio API
 * support (no SharedArrayBuffer, limited AnalyserNode, no gapless playback).
 * Use Electron or browser mode (Express) instead.
 *
 * TauriAudioBridge — Rewrites audio URLs to go through the embedded Rust HTTP server
 * instead of Tauri's asset:// protocol. WebKit handles HTTP streaming with proper
 * buffering and Range request support, fixing seek lag and audio pipeline stalls.
 *
 * In dev mode (Express on localhost:1437), this is a no-op since audio is already HTTP.
 * In production Tauri builds, audio paths are rewritten to http://127.0.0.1:{port}/{absolute_path}
 */

let _audioServerPort = null;
let _isTauri = false;
let _initialized = false;

/**
 * Initialize the bridge. Call once at app startup.
 * Detects Tauri environment and fetches the audio server port.
 */
export async function initTauriAudioBridge() {
  if (_initialized) return;
  _initialized = true;

  // Detect Tauri v2 environment
  _isTauri = !!(window.__TAURI_INTERNALS__ || window.__TAURI__);

  if (!_isTauri) {
    console.log('[TauriAudioBridge] Not in Tauri, using default audio URLs');
    return;
  }

  try {
    // Tauri v2 invoke
    const { invoke } = window.__TAURI_INTERNALS__ || window.__TAURI__?.core || {};
    if (invoke) {
      _audioServerPort = await invoke('get_audio_server_port');
      console.log(`[TauriAudioBridge] Audio server on port ${_audioServerPort}`);
    }
  } catch (err) {
    console.warn('[TauriAudioBridge] Failed to get audio server port:', err);
  }
}

/**
 * Rewrite an audio URL to go through the embedded HTTP server.
 * - In browser/dev mode: returns the URL unchanged
 * - In Tauri production: rewrites to http://127.0.0.1:{port}/{absolute_file_path}
 *
 * @param {string} url - Original audio URL (relative or absolute path)
 * @returns {string} - URL suitable for <audio> src
 */
export function resolveAudioUrl(url) {
  if (!_isTauri || !_audioServerPort || !url) {
    return url;
  }

  // If it's already an HTTP URL (dev mode), don't rewrite
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If it's a Tauri asset URL, extract the path
  if (url.startsWith('asset://') || url.startsWith('tauri://')) {
    const pathPart = url.replace(/^(asset|tauri):\/\/localhost\//, '');
    return `http://127.0.0.1:${_audioServerPort}/${encodeURI(pathPart)}`;
  }

  // For relative URLs like /media/music/..., resolve to absolute filesystem path
  // The Express server serves from the project root, so relative URLs map to real paths.
  // In production Tauri, track.url contains the absolute filesystem path from scan_library.
  if (url.startsWith('/')) {
    // Relative to server root — in Tauri production this shouldn't happen,
    // but keep it working for hybrid dev/prod
    return url;
  }

  // Absolute filesystem path (from Rust scan_library) — route through HTTP server
  return `http://127.0.0.1:${_audioServerPort}/${encodeURI(url)}`;
}

/**
 * Check if we're running in Tauri
 */
export function isTauriEnvironment() {
  return _isTauri;
}

