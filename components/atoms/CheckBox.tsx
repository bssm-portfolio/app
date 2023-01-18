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
  border
  border-primary-dark_gray
  rounded-sm`;
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
