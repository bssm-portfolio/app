import { PopupState } from "@/types/popup.interface";
import classNames from "classnames";

interface PopupViewProps extends PopupState {
  onClose: () => void;
}

export default function PopupView({
  content,
  visible,
  onClose,
}: PopupViewProps) {
  return (
    <>
      <div
        className={classNames(
          "fixed top-0 left-0 w-full h-full bg-black opacity-20",
          { hidden: !visible },
        )}
        onClick={onClose}
      />
      <div
        className={classNames(
          { hidden: !visible },
          "fixed top-1/2 left-1/2 flex flex-col bg-white max-h-45 w-3/4 max-w-37.5 -translate-x-1/2 -translate-y-1/2 rounded-3xl",
        )}
      >
        <div className="flex flex-col mt-6 gap-2.5 px-10 pb-40">{content}</div>
      </div>
    </>
  );
}
