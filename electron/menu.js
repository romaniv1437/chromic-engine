/**
 * Chromic Engine — Native Menu Bar
 * Cross-platform menu with macOS Application Menu, hotkeys, and IPC integration.
 */

const { Menu, MenuItem, shell } = require('electron');

const APP_NAME = 'Chromic Engine';
const VERSION = require('../package.json').version || '1.0.0';
const GITHUB_URL = 'https://github.com/romaniv1437/chromic-engine';

function buildMenu(mainWindow) {
  const isMac = process.platform === 'darwin';

  const send = (channel, ...args) => {
    mainWindow?.webContents?.send(channel, ...args);
  };

  const template = [];

  // ── macOS Application Menu ───────────────────────────────────────────────
  if (isMac) {
    template.push({
      label: APP_NAME,
      submenu: [
        { role: 'about', label: `About ${APP_NAME}` },
        { type: 'separator' },
        {
          label: 'Settings…',
          accelerator: 'CmdOrCtrl+,',
          click: () => send('menu:settings'),
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  // ── File ──────────────────────────────────────────────────────────────────
  template.push({
    label: 'File',
    submenu: [
      {
        label: 'Add Music…',
        accelerator: 'CmdOrCtrl+O',
        click: () => send('menu:add-music'),
      },
      { type: 'separator' },
      ...(!isMac ? [
        {
          label: 'Settings…',
          accelerator: 'CmdOrCtrl+,',
          click: () => send('menu:settings'),
        },
        { type: 'separator' },
      ] : []),
      isMac ? { role: 'close' } : { role: 'quit' },
    ],
  });

  // ── Edit ──────────────────────────────────────────────────────────────────
  template.push({
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' },
    ],
  });

  // ── View ──────────────────────────────────────────────────────────────────
  template.push({
    label: 'View',
    submenu: [
      {
        label: 'Search…',
        accelerator: 'CmdOrCtrl+K',
        click: () => send('menu:search'),
      },
      { type: 'separator' },
      {
        label: 'Toggle Pro Mode',
        accelerator: 'CmdOrCtrl+Shift+M',
        click: () => send('menu:toggle-pro'),
      },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  });

  // ── Playback ──────────────────────────────────────────────────────────────
  template.push({
    label: 'Playback',
    submenu: [
      {
        label: 'Play / Pause',
        accelerator: 'Space',
        registerAccelerator: false, // handled by renderer
        click: () => send('menu:play-pause'),
      },
      {
        label: 'Next Track',
        accelerator: 'CmdOrCtrl+Right',
        click: () => send('menu:next-track'),
      },
      {
        label: 'Previous Track',
        accelerator: 'CmdOrCtrl+Left',
        click: () => send('menu:prev-track'),
      },
      { type: 'separator' },
      {
        label: 'Toggle Shuffle',
        accelerator: 'CmdOrCtrl+S',
        click: () => send('menu:toggle-shuffle'),
      },
    ],
  });

  // ── AI & Lyrics ───────────────────────────────────────────────────────────
  template.push({
    label: 'AI',
    submenu: [
      {
        label: 'AI & Pro Settings…',
        click: () => send('menu:ai-settings'),
      },
      { type: 'separator' },
      {
        label: 'Sync Lyrics (Current Track)',
        click: () => send('menu:sync-lyrics'),
      },
      {
        label: 'Translate Lyrics (Current Track)',
        click: () => send('menu:translate-lyrics'),
      },
      { type: 'separator' },
      {
        label: 'Start Model Training…',
        click: () => send('menu:start-training'),
      },
    ],
  });

  // ── Window (macOS standard) ───────────────────────────────────────────────
  if (isMac) {
    template.push({
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ],
    });
  }

  // ── Help ──────────────────────────────────────────────────────────────────
  template.push({
    label: 'Help',
    submenu: [
      {
        label: 'Documentation',
        click: () => shell.openExternal(`${GITHUB_URL}#readme`),
      },
      {
        label: 'Architecture',
        click: () => shell.openExternal(`${GITHUB_URL}/blob/main/docs/ARCHITECTURE.md`),
      },
      {
        label: 'AI Setup Guide',
        click: () => shell.openExternal(`${GITHUB_URL}/blob/main/docs/AI_SETUP.md`),
      },
      {
        label: 'Keyboard Shortcuts',
        click: () => shell.openExternal(`${GITHUB_URL}/blob/main/docs/SHORTCUTS.md`),
      },
      { type: 'separator' },
      {
        label: 'Report a Bug',
        click: () => shell.openExternal(`${GITHUB_URL}/issues`),
      },
      { type: 'separator' },
      {
        label: `Version ${VERSION}`,
        enabled: false,
      },
    ],
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return menu;
}

module.exports = { buildMenu };

