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
    TOP_LEFT: "animate-[toast-in-left_3s_ease]",
    TOP_RIGHT: "animate-[toast-in-right_3s_ease]",
    TOP_CENTER: "animate-[toast-in-bottom_3s_ease]",
    BOTTOM_LEFT: "animate-[toast-in-left_3s_ease]",
    BOTTOM_RIGHT: "animate-[toast-in-right_3s_ease]",
    BOTTOM_CENTER: "animate-[toast-in-top_3s_ease]",
  };

  return (
    <div className="fixed bottom-6 right-3">
      {toastList.map((toast) => {
        return (
          <div
            className={classNames(
              "p-4 text-white rounded-xl mb-1",
              backgroundColorList[toast.type],
              toastAnimationList[toast.position],
            )}
            key={toast.id}
          >
            {toast.content}
          </div>
        );
      })}
    </div>
  );
}
