import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      quit: () => void;
      setWinAspectRatio: (opt: {
        width?: number;
        height?: number;
        aspectRatio: number;
      }) => void;
      windowDrag: (opt: { x: number; y: number }) => void;
    };
  }
}
