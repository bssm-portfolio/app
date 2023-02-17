import toastState from "@/store/toast";
import { useRecoilState } from "recoil";
import ToastView from "./View";

export default function Toast() {
  const [toastList] = useRecoilState(toastState);

  return <ToastView toastList={toastList} />;
}
