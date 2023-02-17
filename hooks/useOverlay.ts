import { useRecoilState } from "recoil";
import { Toast, ToastProperty } from "@/types/toast.interface";
import { uuid as uuidv4 } from "uuidv4";
import toastState from "@/store/toast";

const getToastProperty = (
  content: string,
  property: Omit<ToastProperty, "id" | "content">,
): ToastProperty => {
  return {
    ...property,
    id: uuidv4(),
    content,
  };
};

const useOverlay = () => {
  const [, setToastList] = useRecoilState<ToastProperty[]>(toastState);

  const closeToast = (id: string, timerId: NodeJS.Timeout) => {
    setToastList((toastList) => toastList.filter((toast) => toast.id !== id));
    clearTimeout(timerId);
  };

  const openToast = (
    content: string,
    { position = "BOTTOM_RIGHT", type = "normal", time = 5000 }: Toast,
  ) => {
    const toastProperty = getToastProperty(content, { position, type, time });
    setToastList((prev) => [...prev, toastProperty]);

    const timerId = setTimeout(() => {
      closeToast(toastProperty.id, timerId);
    }, time);
  };

  return { openToast, closeToast };
};

export default useOverlay;
