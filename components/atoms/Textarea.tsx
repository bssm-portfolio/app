import { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextareaVarient = "primary";
interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  varient?: TextareaVarient;
  registerReturn?: UseFormRegisterReturn;
}

const getTextareaCss = (varient: TextareaVarient) => {
  return `
    p-2.5
    h-16
    rounded 
    font-inter
    text-sm
    border-0.5
    border-primary-border_gray
    resize-none
  `;
};

export default function Textarea({
  varient = "primary",
  onClick,
  children,
  className = "",
  registerReturn,
  ...props
}: InputProps) {
  return (
    <textarea
      className={`${className} ${getTextareaCss(varient)}`}
      {...registerReturn}
      {...props}
    />
  );
}
