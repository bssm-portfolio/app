import classNames from "classnames";
import { ToastProperty } from "@/types/toast.interface";

interface ToastViewProps {
  toastList: ToastProperty[];
}

export default function ToastView({ toastList }: ToastViewProps) {
  return (
    <div className="fixed bottom-6 right-6">
      {toastList.map((toast) => {
        return (
          <div
            key={toast.id}
            className={classNames(`bg-[${toast.backgroundColor}]`)}
          >
            {toast.content}
          </div>
        );
      })}
    </div>
  );
}
