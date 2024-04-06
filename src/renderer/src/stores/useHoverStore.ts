import { create } from "zustand";

type THoverStore = {
  isHoverCamera: boolean;
  setIsHoverCamera: (isHover: boolean) => void;
};

const useHoverStore = create<THoverStore>()((set) => ({
  isHoverCamera: false,
  setIsHoverCamera: (isHover: boolean) =>
    set(() => ({ isHoverCamera: isHover })),
}));

export default useHoverStore;
