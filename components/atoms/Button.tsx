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
  const borderColor = varient === "primary" ? "border-black" : "border-blue";
  const bgColor = varient === "primary" ? "bg-white" : "bg-blue";
  const color = varient === "primary" ? "text-black" : "text-white";

  return `
  px-1.875 
  py-0.468 
  border-0.5
  ${borderColor}
  ${bgColor}
  ${color}
  rounded-full 
  font-inter
  font-bold
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
