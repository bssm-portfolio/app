// https://blog.logrocket.com/how-to-create-a-custom-toast-component-with-react/
import { useRecoilState } from "recoil";
import { Toast, ToastProperty } from "@/types/toast.interface";
import { uuid as uuidv4 } from "uuidv4";
import toastState from "@/store/toast";

const getToastProperty = (property: Toast) => {
  const id = uuidv4();
  const { type } = property;
  const defaultProperty = { id, ...property };
  switch (type) {
    case "success":
      return {
        ...defaultProperty,
        backgroundColor: "#5CB85C",
      };
    case "danger":
      return {
        ...defaultProperty,
        backgroundColor: "#D9534F",
      };
    default:
      return {
        ...defaultProperty,
        backgroundColor: "#3E73FB",
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
