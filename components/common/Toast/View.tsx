import classNames from "classnames";
import { ToastProperty } from "@/types/toast.interface";

interface ToastViewProps {
  toastList: ToastProperty[];
}

export default function ToastView({ toastList }: ToastViewProps) {
  const backgroundColorList = {
    success: "bg-[#5CB85C]",
    danger: "bg-[#D9534F]",
    normal: "bg-[#3E73FB]",
  };
  const toastAnimationList = {
    TOP_LEFT: "animate-[toast-in-left_4.7s_ease-in]",
    TOP_RIGHT: "animate-[toast-in-right_4.7s_ease-in]",
    TOP_CENTER: "animate-[toast-in-bottom_4.7s_ease-in]",
    BOTTOM_LEFT: "animate-[toast-in-left_4.7s_ease-in]",
    BOTTOM_RIGHT: "animate-[toast-in-right_4.7s_ease-in]",
    BOTTOM_CENTER: "animate-[toast-in-top_4.7s_ease-in]",
  };

  return (
    <div className="fixed bottom-6 right-6">
      {toastList.map((toast) => {
        return (
          <div
            key={toast.id}
            className={classNames(
              "p-4 text-white",
              backgroundColorList[toast.type],
              toastAnimationList[toast.position],
            )}
          >
            {toast.content}
          </div>
        );
      })}
    </div>
  );
}
