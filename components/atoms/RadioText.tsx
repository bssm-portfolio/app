import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

interface RadioProps {
  id: string;
  label: string;
  name?: string;
  checked?: boolean;
  value?: string;
}

export default function RadioText({
  id,
  label,
  name,
  value,
  ...props
}: RadioProps) {
  return (
    <div className="flex items-start">
      <input
        type="radio"
        className="appearance-none cursor-pointer"
        name={name}
        id={id}
        value={value}
        {...props}
      />
      <label
        htmlFor={id}
        className={classNames("text-white cursor-pointer mt-2.5", {
          "!text-somago_yellow": !value,
        })}
      >
        {label}
      </label>
    </div>
  );
}
