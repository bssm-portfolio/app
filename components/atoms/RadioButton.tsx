import { SortType } from "@/types/portfolio.interface";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

interface RadioProps {
  id: string;
  label: string;
  name?: string;
  checked?: boolean;
  value?: string;
  keyword: SortType;
  setKeyword: Dispatch<SetStateAction<SortType>>;
}

export default function RadioButton({
  id,
  label,
  name,
  value,
  keyword,
  setKeyword,
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
        onChange={(event) => setKeyword(event.target.value as SortType)}
        {...props}
      />
      <label
        htmlFor={id}
        className={classNames(
          "py-1.5 px-4 bg-white font-bold rounded-full cursor-pointer",
          {
            "!bg-somago_yellow": value === keyword,
          },
        )}
      >
        {label}
      </label>
    </div>
  );
}
