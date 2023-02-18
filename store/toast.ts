import { ToastProperty } from "@/types/toast.interface";
import { atom } from "recoil";

const toastState = atom<ToastProperty[]>({
  key: "toast",
  default: [],
});

export default toastState;
