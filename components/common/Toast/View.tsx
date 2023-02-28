import classNames from "classnames";
import { ToastProperty } from "@/types/toast.interface";
import CheckIcon from "@/components/Icon/CheckIcon";

interface ToastViewProps {
  toastList: ToastProperty[];
}

export default function ToastView({ toastList }: ToastViewProps) {
  const backgroundColorList = {
    success: "bg-[#5CB85CB3]",
    danger: "bg-[#D9534FB3]",
    normal: "bg-[#000000B3]",
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
    <div className="fixed bottom-6 right-3 z-50">
      {toastList.map((toast) => {
        return (
          <div
            className={classNames(
              "flex items-center px-[3.75rem] py-5 text-white rounded-xl mb-1",
              backgroundColorList[toast.type],
              toastAnimationList[toast.position],
            )}
            key={toast.id}
          >
            <CheckIcon className="mr-5" />
            <span className="text-lg font-bold">{toast.content}</span>
          </div>
        );
      })}
    </div>
  );
}
