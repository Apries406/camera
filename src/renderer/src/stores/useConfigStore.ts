import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type TConfigStore = {
  configs: {
    borderColor: string;
    borderWidth: number;
    usingDeviceId: string;
    page: string;
    borderRadius: number;
    rounded: boolean;
    aspectRatio: number;
    videoElement: HTMLVideoElement | null;
    flip: boolean;
  };
  setConfig: (newConfig: Partial<TConfigStore["configs"]>) => void;
};
const useConfigStore = create<TConfigStore>()(
  persist(
    (set) => ({
      configs: {
        borderColor: "#f39c12", // * 边框颜色
        borderWidth: 0, // * 边框宽度
        usingDeviceId: "", // * 使用的摄像头ID
        page: "setting", // * 当前页面
        borderRadius: 10, // * 边框圆角
        rounded: false, // * 是否圆角摄像头
        aspectRatio: 16 / 9, // * 画面比例
        videoElement: null as null | HTMLVideoElement, // * 视频元素
        flip: false, // * 是否镜像
      },
      setConfig: (newConfig) =>
        set((state) => ({
          ...state,
          configs: { ...state.configs, ...newConfig },
        })),
    }),
    {
      name: "configStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useConfigStore;
