import React, { ReactNode } from "react";

interface ButtonProps {
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
}

export default function Button({
  type = "button",
  onClick,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}
