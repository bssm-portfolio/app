import { useRecoilState } from "recoil";
import { Toast, ToastProperty } from "@/types/toast.interface";
import { uuid as uuidv4 } from "uuidv4";
import toastState from "@/store/toast";

const getToastProperty = (content: string, property?: Toast): ToastProperty => {
  return {
    id: uuidv4(),
    position: property?.position || "BOTTOM_RIGHT",
    type: property?.type || "normal",
    time: property?.time || 5000,
    content,
  };
};

const useOverlay = () => {
  const [, setToastList] = useRecoilState<ToastProperty[]>(toastState);

  const closeToast = (id: string, timerId: NodeJS.Timeout) => {
    setToastList((toastList) => toastList.filter((toast) => toast.id !== id));
    clearTimeout(timerId);
  };

  const openToast = (content: string, toastConfig?: Toast) => {
    const time = 5000;
    const toastProperty = getToastProperty(content, { ...toastConfig, time });
    setToastList((prev) => [...prev, toastProperty]);

    const timerId = setTimeout(() => {
      closeToast(toastProperty.id, timerId);
    }, time);
  };

  return { openToast, closeToast };
};

export default useOverlay;
