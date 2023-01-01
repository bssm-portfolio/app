import React from "react";

type ButtonStatus = "active" | "disabled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: ButtonStatus;
  children: React.ReactNode;
}

const getButtonCss = (status: ButtonStatus): string => {
  const backgroundColor = status ? "#F9F9F9" : "#3A3A3A";
  const color = status ? "#3A3A3A" : "#F9F9F9";
  return `
  bg-[${backgroundColor}]
  text-[${color}]
  rounded-[30px]
  px-[10.5px]
  py-[12px]
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
}: ButtonProps) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={getButtonCss(status)}
    >
      {children}
    </button>
  );
}
