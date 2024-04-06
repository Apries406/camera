import { create } from "zustand";
type TDevicesStore = {
  devices: MediaDeviceInfo[];
  setDevices: (devices: MediaDeviceInfo[]) => void;
};
const useDevicesStore = create<TDevicesStore>()((set) => ({
  devices: [],
  setDevices: (devices) => set({ devices }),
}));

export default useDevicesStore;
