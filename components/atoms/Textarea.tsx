import { TextareaHTMLAttributes } from "react";

type TextareaVarient = "primary";
interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  varient?: TextareaVarient;
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
  ...props
}: InputProps) {
  return (
    <textarea
      className={`${className} ${getTextareaCss(varient)}`}
      {...props}
    />
  );
}
