/**
 * Debug logging service.
 *
 * Controlled via:
 * - URL param: ?debug=true
 * - Server SSR flag: window.__DEBUG__
 * - localStorage: localStorage.setItem('debug', 'true')
 *
 * Usage:
 *   import { debug } from '/core/debug.js';
 *   debug.log('[MyModule]', 'something happened', data);
 *   debug.warn('[MyModule]', 'warning', data);
 *   debug.table(data);
 */

const isEnabled = () => {
  if (typeof window === 'undefined') return false;
  if (window.__DEBUG__) return true;
  if (window.chromicElectron?.isDebug) return true;
  if (new URLSearchParams(window.location.search).get('debug') === 'true') return true;
  try { return localStorage.getItem('debug') === 'true'; } catch (_) { return false; }
};

const _enabled = isEnabled();
// Expose globally so hot-path code can check without importing
if (typeof window !== 'undefined') {
  window.__DEBUG__ = _enabled;
  window.__PERF_MODE__ = window.chromicElectron?.isPerfMode || new URLSearchParams(window.location?.search).get('perf') === 'true';
}

export const debug = {
  get enabled() { return _enabled; },
  log: _enabled ? console.log.bind(console) : () => {},
  warn: _enabled ? console.warn.bind(console) : () => {},
  error: console.error.bind(console), // errors always show
  table: _enabled ? console.table.bind(console) : () => {},
  group: _enabled ? console.group.bind(console) : () => {},
  groupEnd: _enabled ? console.groupEnd.bind(console) : () => {},
};

