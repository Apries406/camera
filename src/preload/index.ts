import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
  setWinAspectRatio: (opt: {
    width?: number;
    height?: number;
    aspectRatio: number;
  }) => {
    ipcRenderer.send("set-win-aspect-ratio", opt);
  },
  windowDrag: (opt: { x: number; y: number }) => {
    ipcRenderer.invoke("window-drag", opt);
  },
  showContextMenu: () => {
    ipcRenderer.invoke("show-context-menu");
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
