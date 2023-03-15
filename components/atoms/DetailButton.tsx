import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonStatus = "active" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  children: ReactNode;
  className?: string;
}

const getButtonCss = (status: ButtonStatus): string => {
  return `
    bg-${status === "active" ? "primary-light_gray" : "primary-dark_gray"}
    text-${status === "active" ? "primary-dark_gray" : "primary-light_gray"}
    rounded-full
    p-[0.75rem]
    shadow
    flex
    items-center
    whitespace-nowrap
  `;
};

export default function DetailButton({
  type = "button",
  status = "disabled",
  children,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={classNames(className, getButtonCss(status))}
    >
      {children}
    </button>
  );
}
