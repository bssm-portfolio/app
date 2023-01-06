import React, { ReactNode } from "react";

type ButtonVarient = "primary" | "secondary";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
  varient?: ButtonVarient;
}

const getButtonCss = (varient: ButtonVarient) => {
  const bgColor = varient === "primary" ? "bg-blue" : "bg-black";
  return `
    px-5
    py-2.5 
    ${bgColor}
    text-white
    rounded 
    font-inter
    text-sm
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
