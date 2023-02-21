import classNames from "classnames";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonVarient = "primary" | "secondary";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
  varient?: ButtonVarient;
}

const getButtonCss = (varient: ButtonVarient) => {
  const bgColor =
    varient === "primary" ? "bg-somago_yellow" : "bg-primary-light_gray";
  return `
    px-[10px]
    py-[5px]
    ${bgColor}
    text-black
    rounded-full
    font-inter
    text-sm
    font-bold
    whitespace-nowrap
  `;
};

export default function InputButton({
  type = "button",
  varient = "primary",
  onClick,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(getButtonCss(varient), className)}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}
