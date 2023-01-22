import { PopupState } from "@/types/popup.interface";
import { atom } from "recoil";

const popupState = atom<PopupState>({
  key: "popup",
  default: {
    content: null,
    visible: false,
  },
});

export default popupState;
