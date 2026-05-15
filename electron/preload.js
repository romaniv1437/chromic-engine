/**
 * Chromic Engine — Electron Preload Script
 * Exposes minimal safe APIs to the renderer process.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('chromicElectron', {
  platform: process.platform,
  arch: process.arch,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  // Window controls for custom titlebar
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  // Native file dialogs
  openMusicDialog: () => ipcRenderer.invoke('dialog:openMusic'),
  openImageDialog: () => ipcRenderer.invoke('dialog:openImage'),
  openLibraryFolder: () => ipcRenderer.invoke('dialog:openLibraryFolder'),
  // Performance management
  perf: {
    getHealth: () => ipcRenderer.invoke('perf:getHealth'),
    getConfig: () => ipcRenderer.invoke('perf:getConfig'),
    setProfile: (key) => ipcRenderer.invoke('perf:setProfile', key),
    setCustom: (opts) => ipcRenderer.invoke('perf:setCustom', opts),
    restart: () => ipcRenderer.invoke('perf:restart'),
    getRendererMemory: () => ipcRenderer.invoke('perf:getRendererMemory'),
  },
  // Dependency health
  deps: {
    getStatus: () => ipcRenderer.invoke('dep:getStatus'),
    onStatus: (callback) => ipcRenderer.on('dep:status', (_e, status) => callback(status)),
  },
  // Menu event listener — renderer subscribes to native menu actions
  onMenuAction: (callback) => {
    const channels = [
      'menu:settings', 'menu:add-music', 'menu:search',
      'menu:toggle-pro', 'menu:play-pause', 'menu:next-track',
      'menu:prev-track', 'menu:toggle-shuffle', 'menu:ai-settings',
      'menu:sync-lyrics', 'menu:translate-lyrics', 'menu:start-training',
    ];
    for (const ch of channels) {
      ipcRenderer.on(ch, () => callback(ch.replace('menu:', '')));
    }
  },
});

