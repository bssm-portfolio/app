import { ModalState } from "@/types/modal.interface";
import { atom } from "recoil";

export const MODAL_STATE = "MODAL_STATE";

export const modalState = atom<ModalState>({
  key: MODAL_STATE,
  default: {
    title: "",
    content: null,
    visible: false,
  },
});
