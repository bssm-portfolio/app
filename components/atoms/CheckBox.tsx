import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const getCheckBoxCss = () => {
  return `
  appearance-none
  w-5
  h-5
  outline
  outline-2
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
  id,
  label,
  ...props
}: CheckBoxProps) {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        className={classNames(className, getCheckBoxCss())}
        {...props}
      />
      {label ? <label htmlFor={id}>{label}</label> : null}
    </>
  );
}
