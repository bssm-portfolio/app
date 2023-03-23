import classNames from "classnames";
import { ReactNode, RefObject } from "react";

interface DropFileUploaderProps {
  className?: string;
  children: ReactNode;
  labelRef: RefObject<HTMLLabelElement>;
}

export default function DropFileUploader({
  className = "",
  children,
  labelRef,
}: DropFileUploaderProps) {
  return (
    <label className={classNames(className)} ref={labelRef}>
      {children}
    </label>
  );
}
