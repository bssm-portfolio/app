import { XIcon } from "@/components/Icon";
import { ModalState } from "@/types/modal.interface";
import classNames from "classnames";

interface ModalViewProps extends ModalState {
  onClose?: () => void;
}

export default function ModalView({
  title,
  content,
  visible,
  onClose,
}: ModalViewProps) {
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
          { "rounded-lg": title },
          { "rounded-3xl": !title },
          "fixed top-1/2 left-1/2 flex flex-col bg-white max-h-45 w-3/4 max-w-37.5 -translate-x-1/2 -translate-y-1/2 overflow-auto overflow-x-hidden",
        )}
      >
        {title ? (
          <div className="flex justify-between items-center w-full px-6 py-5 h-16 border-b-0.5 border-primary-border_gray">
            <h1 className="font-bold text-xl">{title}</h1>
            <XIcon className="cursor-pointer" onClick={onClose} />
          </div>
        ) : null}

        <div className="flex flex-col mt-6 gap-2.5 px-10">{content}</div>
      </div>
    </>
  );
}
