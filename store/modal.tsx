import { ModalState } from "@/types/modal.interface";
import { atom } from "recoil";

const modalState = atom<ModalState>({
  key: "modal",
  default: {
    title: "",
    content: null,
    visible: false,
  },
});

export default modalState;
