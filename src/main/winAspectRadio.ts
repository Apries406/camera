import { BrowserWindow, ipcMain } from "electron";

// * 获取当前窗口
const getWin = (event: Electron.IpcMainEvent) => {
  return BrowserWindow.fromWebContents(event.sender)!;
};
ipcMain.on(
  "set-window-aspect-ratio",
  (
    event: Electron.IpcMainEvent,
    opt: {
      aspectRatio: number;
      width?: number;
      height?: number;
    },
  ) => {
    const win = getWin(event);
    if (opt.width && opt.height) {
      win.setBounds({ width: opt.width, height: opt.height });
    }
    win.setAspectRatio(opt.aspectRatio);
  },
);
