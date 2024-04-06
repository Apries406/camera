import useConfigStore from "@renderer/stores/useConfigStore";
import { useEffect, useRef } from "react";
import "./Camera.scss";
export const Camera = () => {
  const usingDeviceId = useConfigStore((state) => state.configs.usingDeviceId);
  const borderWidth = useConfigStore((state) => state.configs.borderWidth);
  const borderColor = useConfigStore((state) => state.configs.borderColor);
  const isRounded = useConfigStore((state) => state.configs.rounded);
  const borderRadius = useConfigStore((state) => state.configs.borderRadius);

  // * 视频元素
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      className="camera-container"
      style={{
        borderStyle: "solid",
        borderWidth: `${borderWidth}px`,
        borderColor: borderColor,
        borderRadius: isRounded ? "50%" : `${borderRadius}px`,
      }}
    >
      <video className="camera-video" ref={videoRef}></video>
    </div>
  );
};
