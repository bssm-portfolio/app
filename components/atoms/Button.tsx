import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonVarient = "primary" | "secondary";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
  varient?: ButtonVarient;
}

const getButtonCss = (varient: ButtonVarient) => {
  const bgColor = varient === "primary" ? "bg-blue" : "bg-primary-light_gray";
  const textColor = varient === "primary" ? "text-white" : "text-black";
  return `
    px-5
    py-2.5 
    ${bgColor}
    ${textColor}
    rounded 
    font-inter
    text-sm
    font-bold
  `;
};

export default function Button({
  type = "button",
  varient = "primary",
  onClick,
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${className} ${getButtonCss(varient)}`}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}
