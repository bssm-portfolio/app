import { Toast } from "@/types/toast.interface";
import { atom } from "recoil";

const toastState = atom<Toast[]>({
  key: "toast",
  default: [],
});

export default toastState;
