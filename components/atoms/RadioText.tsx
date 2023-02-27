import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { Filter } from "@/types/portfolio.interface";

interface RadioProps {
  id: string;
  label: string;
  name?: string;
  checked?: boolean;
  value?: string;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
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
