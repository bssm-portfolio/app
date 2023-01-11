import classNames from "classnames";
import { ChangeEventHandler, InputHTMLAttributes } from "react";

type ButtonVarient = "primary" | "secondary";
interface FileUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label?: string;
  varient?: ButtonVarient;
  id?: string;
}

const getFileUploaderCss = (varient: ButtonVarient) => {
  const bgColor = varient === "primary" ? "bg-blue" : "bg-black";
  return `
    px-5
    py-2.5 
    cursor-pointer 
    ${bgColor}
    text-white
    rounded 
    font-inter
    text-sm
  `;
};

export default function FileUploader({
  varient = "primary",
  onChange,
  label,
  className = "",
  id = "file-uploader",
}: FileUploaderProps) {
  return (
    <>
      <label
        htmlFor={id}
        className={classNames(className, getFileUploaderCss(varient))}
      >
        {label}
      </label>
      <input
        type="file"
        id={id}
        className={classNames("hidden")}
        onChange={onChange}
      />
    </>
  );
}
