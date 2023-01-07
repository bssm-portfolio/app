import React from "react";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
}

const getLabelFormCss = () => {
  return `
    font-inter
    text-sm
  `;
};

export default function LabelForm({
  className,
  children,
  label,
  ...props
}: InputProps) {
  return (
    <div className={`${className} ${getLabelFormCss()}`} {...props}>
      <h3 className="mb-2">{label}</h3>
      {children}
    </div>
  );
}