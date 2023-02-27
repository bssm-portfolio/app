import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { Filter, SearchFilterPropertyType } from "@/types/portfolio.interface";
import { XIcon } from "../Icon";

interface RadioProps {
  id: string;
  label: string;
  name: SearchFilterPropertyType;
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
  filter,
  setFilter,
  ...props
}: RadioProps) {
  const isSelect =
    value === filter[name] ||
    (value === "ALL" &&
      !["UPLOAD_DATE", "COMMENTS"].includes(filter.sortType || "ALL"));

  return (
    <div className="flex items-start">
      <input
        type="radio"
        className="appearance-none cursor-pointer"
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
