import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, app, shell } from "electron";
import { join } from "path";
import icon from "../../resources/icon.png?asset";
import "./contextMenu";
import "./drag";
import "./ipcMain";
import createTray from "./tray";
import "./winAspectRadio";
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 281,
    // minHeight: 50,
    // minWidth: 50,
    // maxHeight: 500,
    // maxWidth: 500,
    alwaysOnTop: true,
    frame: false,
    // titleBarStyle: "hidden",
    transparent: true,
    skipTaskbar: true,
    // show: false,
    // autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });
  if (is.dev) mainWindow.webContents.openDevTools();
  // * 管理拖拽

  // mainWindow.setAspectRatio(16 / 9);
  mainWindow.setAlwaysOnTop(true, "screen-saver");
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.commandLine.appendSwitch("disable-features", "WidgetLayering");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test

  createWindow();
  //  * 管理托盘
  createTray();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
