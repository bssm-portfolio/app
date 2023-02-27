import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { Filter, SearchFilterPropertyType } from "@/types/portfolio.interface";
import { XIcon } from "../Icon";

interface RadioProps {
  id: string;
  label: string;
  name: SearchFilterPropertyType;
  value: string;
  isSelect?: boolean;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export default function CheckBoxText({
  id,
  label,
  name,
  value,
  filter,
  setFilter,
  isSelect = value === filter[name],
  ...props
}: RadioProps) {
  return (
    <div className="flex items-start select-none cursor-pointer">
      <input
        type="checkbox"
        className="appearance-none"
        name={name}
        id={id}
        value={value}
        onChange={(event) =>
          setFilter((prev) => ({ ...prev, [name]: event.target.value }))
        }
        {...props}
      />
      <label
        htmlFor={id}
        className={classNames(
          "flex items-center text-white cursor-pointer mt-2.5",
          {
            "!text-somago_yellow": isSelect,
          },
        )}
      >
        {label}
        {isSelect && (
          <XIcon className="[&>path]:fill-somago_yellow w-3 h-3 ml-2" />
        )}
      </label>
    </div>
  );
}
