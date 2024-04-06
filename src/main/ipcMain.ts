import { Menu, MenuItemConstructorOptions, app, ipcMain } from "electron";

ipcMain.on("quit", () => {
  const template = [
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ] as MenuItemConstructorOptions[];
  const menu = Menu.buildFromTemplate(template);
  menu.popup();
});


