import { BrowserWindow, Menu, ipcMain } from "electron";

ipcMain.handle("show-context-menu", (event) => {
  console.log("show context menu");
  const menu = Menu.buildFromTemplate([
    {
      label: "退出",
      role: "quit",
    },
  ]);

  menu.popup({ window: BrowserWindow.fromWebContents(event.sender)! });
});
