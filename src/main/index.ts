import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

const isDevelopment = !app.isPackaged;

const createWindow = async () => {
  const windowOptions: BrowserWindowConstructorOptions = {
    minWidth: 940,
    minHeight: 900,
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 20,
      y: 32,
    },
    webPreferences: {
      contextIsolation: true,
      devTools: isDevelopment,
      spellcheck: false,
      nodeIntegration: true,
    },
  };
  const browserWindow = new BrowserWindow(windowOptions);

  if (isDevelopment) {
    await browserWindow.loadURL(`http://localhost:3000`);
  } else {
    await browserWindow.loadFile("./index.html");
  }

  browserWindow.webContents.openDevTools();
};

app.whenReady().then(async () => {
  createWindow();
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
