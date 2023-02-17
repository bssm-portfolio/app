// https://blog.logrocket.com/how-to-create-a-custom-toast-component-with-react/
import { useRecoilState } from "recoil";
import { Toast, ToastProperty } from "@/types/toast.interface";
import { uuid as uuidv4 } from "uuidv4";
import toastState from "@/store/toast";

const getToastProperty = ({ content, position, type }: Omit<Toast, "time">) => {
  const id = uuidv4();
  switch (type) {
    case "success":
      return {
        id,
        content,
        backgroundColor: "#5CB85C",
        position,
      };
    case "danger":
      return {
        id,
        content,
        backgroundColor: "#D9534F",
        position,
      };
    default:
      return {
        id,
        content,
        backgroundColor: "#3E73FB",
        position,
      };
  }
};

const useOverlay = () => {
  const [toastList, setToastList] = useRecoilState<ToastProperty[]>(toastState);

  const closeToast = (id: string) => {
    const index = toastList.findIndex((e) => e.id === id);
    setToastList((prev) => {
      prev.splice(index, 1);
      return prev;
    });
  };

  const openToast = ({
    position = "BOTTOM_RIGHT",
    content,
    type = "normal",
    time = 2000,
  }: Toast) => {
    const toastProperty = getToastProperty({ content, position, type });
    setToastList((prev) => [...prev, toastProperty]);

    setTimeout(() => {
      closeToast(toastProperty.id);
    }, time);
  };

  return { openToast, closeToast };
};

export default useOverlay;
