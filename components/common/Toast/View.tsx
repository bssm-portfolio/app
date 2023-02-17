import { ToastProperty } from "@/types/toast.interface";
import classNames from "classnames";

export default function ToastView({
  toastList,
}: {
  toastList: ToastProperty[];
}) {
  return (
    <div>
      {toastList.map((toast) => {
        return (
          <div className={classNames(`bg-${toast.backgroundColor}`)}>
            {toast.content}
          </div>
        );
      })}
    </div>
  );
}
