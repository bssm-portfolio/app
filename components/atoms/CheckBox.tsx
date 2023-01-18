import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const getCheckBoxCss = () => {
  return `
  appearance-none
  w-5
  h-5
  outline
  outline-primary-dark_gray
  rounded-sm
  box-border
  checked:bg-blue
  checked:border-[0.125rem]
  checked:border-white
  `;
};

export default function CheckBox({
  onClick,
  children,
  className = "",
  ...props
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className={classNames(className, getCheckBoxCss())}
      {...props}
    />
  );
}
