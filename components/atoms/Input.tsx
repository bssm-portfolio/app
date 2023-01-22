import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputVarient = "primary";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  varient?: InputVarient;
  registerReturn?: UseFormRegisterReturn;
}

const getInputCss = (varient: InputVarient) => {
  return `
    p-2.5
    h-9
    rounded 
    font-inter
    text-sm
    border-0.5
    border-primary-border_gray
  `;
};

export default function Input({
  varient = "primary",
  onClick,
  children,
  className = "",
  registerReturn,
  ...props
}: InputProps) {
  return (
    <input
      className={`${className} ${getInputCss(varient)}`}
      {...registerReturn}
      {...props}
    />
  );
}
