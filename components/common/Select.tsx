import React, { ReactNode, SelectHTMLAttributes } from "react";
import DownIcon from "../Icon/DownIcon";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: ReactNode;
}

export default function Select({
  children,
  onChange,
  name,
  className = "",
}: SelectProps) {
  return (
    <div className={className}>
      <div className="relative">
        <select
          name={name}
          onChange={onChange}
          className="appearance-none pr-[32px] text-center bg-inherit focus:outline-none"
        >
          {children}
        </select>
        <DownIcon className="absolute top-[7px] right-[12px] -z-10" />
      </div>
    </div>
  );
}
