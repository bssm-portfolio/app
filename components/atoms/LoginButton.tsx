import { ButtonHTMLAttributes, ReactNode } from "react";

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "button";
  children: ReactNode;
}

export default function LoginButton({
  type = "button",
  children,
}: LoginButtonProps) {
  const getButtonCss = () => {
    return `border border-primary-dark_gray w-full rounded-full py-[1.125rem] text-[1.125rem] font-bold flex justify-center items-center`;
  };

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getButtonCss()}
    >
      {children}
    </button>
  );
}
