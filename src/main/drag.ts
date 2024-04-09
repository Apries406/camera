import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("window-drag", (event, opt: { x: number; y: number }) => {
  const win = BrowserWindow.fromWebContents(event.sender)!;
  const [x, y] = win.getPosition();
  console.log(x, y);
  const [mx, my] = [
    x + parseInt(opt.x.toString()),
    y + parseInt(opt.y.toString()),
  ];
  const [width, height] = win.getSize();
  console.log(width, height);
  win.setPosition(mx, my);
  win.setSize(parseInt(width.toString()), parseInt(height.toString()));
  console.log("window-drag", opt);
});
