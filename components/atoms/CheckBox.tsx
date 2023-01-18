import classNames from "classnames";
import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const getSelectCss = () => {
  return ``;
};

export default function Select({
  onClick,
  children,
  className = "",
  ...props
}: SelectProps) {
  return (
    <input
      type="checkbox"
      className={classNames(className, getSelectCss())}
      {...props}
    />
  );
}
