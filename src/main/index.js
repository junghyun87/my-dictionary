import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  globalShortcut,
  ipcMain,
} from 'electron';
import path from 'path';

const assetsDirectory = path.join(__dirname, '../../', 'assets');

let tray = undefined;
let window = undefined;

// Don't show the app in the doc
app.dock.hide();

app.on('ready', () => {
  createTray();
  createWindow();
  createMenu();
  globalShortcut.register('Ctrl+Cmd+Shift+D', () => {
    toggleWindow();
  });
});

const createMenu = () => {
  let menuTemplate = [
    {
      label: app.getName(),
      submenu: [{ role: 'quit' }],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('close-me', (evt, arg) => {
  app.quit();
});

ipcMain.on('hide-me', (evt, arg) => {
  window.hide();
});

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'icon.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', function(event) {
    toggleWindow();

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' });
    }
  });
};

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x: x, y: y };
};

const createWindow = () => {
  window = new BrowserWindow({
    width: 360,
    height: 555,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false,
    },
  });
  window.loadURL(`file://${path.join(__dirname, '../../', 'index.html')}`);
  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
};

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
  window.focus();
};
