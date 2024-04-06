import { Select, TextField } from "@radix-ui/themes";
import useConfigStore from "@renderer/stores/useConfigStore";
import useDevicesStore from "@renderer/stores/useDevicesStore";
import { useEffect, useState } from "react";
import "./Setting.scss";
export const Setting = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const setConfig = useConfigStore((state) => state.setConfig);
  const devicesFromStore = useDevicesStore((state) => state.devices);
  const borderWidth = useConfigStore((state) => state.configs.borderWidth);
  const borderColor = useConfigStore((state) => state.configs.borderColor);
  const usingDeviceId = useConfigStore((state) => state.configs.usingDeviceId);
  useEffect(() => {
    setDevices(devicesFromStore);
    // * 默认选择第一个设备
    if (devices.length > 0) {
      setConfig({ usingDeviceId: devicesFromStore[0].deviceId });
    }
  });
  return (
    <div className="setting">
      <h2 className="setting-title">参数设置</h2>
      <div className="video-in">
        <Select.Root
          defaultValue={devices.length > 0 ? devices[0].deviceId : ""}
          value={usingDeviceId}
        >
          <Select.Trigger placeholder="选择视频输入设备" />
          <Select.Content>
            {devices.map((device) => {
              return (
                <Select.Item
                  key={device.deviceId}
                  value={device.deviceId}
                  onClick={() => setConfig({ usingDeviceId: device.deviceId })}
                >
                  {device.label}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>
      </div>
      <div>
        <TextField.Root
          placeholder="边框宽度"
          value={borderWidth}
          onChange={(e) => {
            setConfig({ borderWidth: parseInt(e.target.value) });
          }}
        >
          <TextField.Slot></TextField.Slot>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <TextField.Root
          placeholder="边框颜色"
          value={borderColor}
          onChange={(e) => {
            setConfig({ borderColor: e.target.value });
          }}
        ></TextField.Root>
      </div>
    </div>
  );
};
