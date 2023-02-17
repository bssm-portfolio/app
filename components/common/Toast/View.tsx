import classNames from "classnames";
import { ToastProperty } from "@/types/toast.interface";

interface ToastViewProps {
  toastList: ToastProperty[];
}

export default function ToastView({ toastList }: ToastViewProps) {
  const backgroundColorList = {
    success: "#5CB85C",
    danger: "#D9534F",
    normal: "#3E73FB",
  };

  return (
    <div className="fixed bottom-6 right-6">
      {toastList.map((toast) => {
        return (
          <div
            key={toast.id}
            className={classNames(backgroundColorList[toast.type])}
          >
            {toast.content}
          </div>
        );
      })}
    </div>
  );
}
