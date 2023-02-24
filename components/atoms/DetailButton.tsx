import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonStatus = "active" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: ButtonStatus;
  children: ReactNode;
  className?: string;
}

const getButtonCss = (status: ButtonStatus): string => {
  return `
    bg-${status === "active" ? "primary-light_gray" : "primary-dark_gray"}
    text-${status === "active" ? "primary-dark_gray" : "primary-light_gray"}
    rounded-full
    px-[0.65rem]
    py-small
    shadow
    flex
    items-center
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
      className={classNames(getButtonCss(status), className)}
    >
      {children}
    </button>
  );
}
