import { ContextMenu } from "@radix-ui/themes";
import useConfigStore from "@renderer/stores/useConfigStore";
import { useEffect, useRef } from "react";
import "./Camera.scss";
export const Camera = () => {
  // * 使用设备ID
  const usingDeviceId = useConfigStore((state) => state.configs.usingDeviceId);
  // * 边框宽度
  const borderWidth = useConfigStore((state) => state.configs.borderWidth);
  // * 边框颜色
  const borderColor = useConfigStore((state) => state.configs.borderColor);
  // * 是否为圆形
  const isRounded = useConfigStore((state) => state.configs.rounded);
  // * 边框圆角
  const borderRadius = useConfigStore((state) => state.configs.borderRadius);
  // * 是否镜像
  const isMirrored = useConfigStore((state) => state.configs.flip);
  // * 视频元素
  const videoRef = useRef<HTMLVideoElement>(null);
  // * 相机Ref
  // const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // * 绑定菜单事件
    videoRef.current?.addEventListener("show-context-menu", (e) => {
      e.preventDefault();
      window.api.showContextMenu();
    });
    // * 视频事件
    const constraints = {
      audio: false,
      video: {
        deviceId: usingDeviceId,
      },
    } as MediaStreamConstraints;
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      // * 设置视频源
      videoRef.current!.srcObject = stream;
      // * 开始播放视频
      videoRef.current!.play();
    });
  }, []);
  return (
    <div
      className="camera-container drag"
      style={{
        borderStyle: "solid",
        borderWidth: `${borderWidth}px`,
        borderColor: borderColor,
        borderRadius: isRounded ? "50%" : `${borderRadius}px`,
      }}
    >
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <video
            className="camera-video"
            ref={videoRef}
            autoPlay
            style={{
              transform: isMirrored ? "rotateY(180deg)" : "",
            }}
          />
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>复制</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </div>
  );
};
