import {
  BoxIcon,
  CameraIcon,
  CircleIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import "../src/assets/App.scss";
import { Camera } from "./components/Camera";
import { Setting } from "./components/Setting";
import useConfigStore from "./stores/useConfigStore";
import useDevicesStore from "./stores/useDevicesStore";
import useHoverStore from "./stores/useHoverStore";
function App(): JSX.Element {
  const isRounded = useConfigStore((state) => state.configs.rounded);
  const borderRadius = useConfigStore((state) => state.configs.borderRadius);
  const isHoverCamera = useHoverStore((state) => state.isHoverCamera);
  const curPage = useConfigStore((state) => state.configs.page);
  const setConfig = useConfigStore((state) => state.setConfig);
  // * 设备状态管理
  const setStoreDevices = useDevicesStore((state) => state.setDevices);
  const setIsHoverCamera = useHoverStore((state) => state.setIsHoverCamera);
  // * 设备列表
  const [_devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const quit = () => {
    window.api.quit();
  };
  useEffect(() => {
    // * 使用MediaDevices.enumerateDevices()方法获取可用的媒体输入和输出设备的列表。(麦克风、摄像头、耳机设备)
    navigator.mediaDevices.enumerateDevices().then((res) => {
      // * 过滤出视频输入设备
      setDevices(res.filter((device) => device.kind === "videoinput")),
        // * 保存设备列表到store
        setStoreDevices(res.filter((device) => device.kind === "videoinput"));
    });

    setConfig({ page: "camera" });
    window.api.setWinAspectRatio({
      aspectRatio: 9 / 16,
      width: 281,
      height: 500,
    });
  }, []);

  return (
    <Theme
      style={{
        borderRadius: isRounded ? "50%" : `${borderRadius}px`,
      }}
      // onMouseEnter={() => {
      //   setIsHoverCamera(true);
      //   console.log("enter");
      // }}
      // onMouseLeave={() => {
      //   setIsHoverCamera(false);
      //   console.log("leave");
      // }}
      // onContextMenu={quit}
    >
      <div>
        <section className="setting-icon-container">
          {curPage === "camera" ? (
            <>
              {isHoverCamera && (
                <GearIcon
                  className="setting-icon no-drag"
                  color="#7ed321"
                  onClick={() => setConfig({ page: "setting" })}
                />
              )}
              {isRounded
                ? isHoverCamera && (
                    <BoxIcon
                      color="#7ed321"
                      className="setting-icon circle no-drag"
                      onClick={() => setConfig({ rounded: !isRounded })}
                    ></BoxIcon>
                  )
                : isHoverCamera && (
                    <CircleIcon
                      color="#7ed321"
                      className="setting-icon circle no-drag"
                      onClick={() => setConfig({ rounded: !isRounded })}
                    />
                  )}
            </>
          ) : (
            <CameraIcon
              className="setting-icon no-drag"
              color="#7ed321"
              onClick={() => setConfig({ page: "camera" })}
            />
          )}
        </section>
        <section>{curPage === "camera" ? <Camera /> : <Setting />}</section>
      </div>
    </Theme>
  );
}

export default App;
