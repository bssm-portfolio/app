import classNames from "classnames";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  CheckBoxProperty,
  Filter,
  SearchFilterPropertyType,
} from "@/types/portfolio.interface";
import { XIcon } from "../Icon";

interface RadioProps {
  id: string;
  label: string;
  name: SearchFilterPropertyType;
  value?: string;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  checkBoxPropertyId: string;
  setCheckBoxPropertyId: Dispatch<SetStateAction<string>>;
}

export default function CheckBoxText({
  id,
  label,
  name,
  value,
  filter,
  setFilter,
  checkBoxPropertyId,
  setCheckBoxPropertyId,
  ...props
}: RadioProps) {
  const isChecked = checkBoxPropertyId === id;
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkBoxPropertyId === id) {
      setCheckBoxPropertyId("");
      setFilter((prev) => ({ ...prev, [name]: undefined }));
      return;
    }
    setCheckBoxPropertyId(id);
    setFilter((prev) => ({ ...prev, [name]: event.target.value }));
  };

  return (
    <div className="flex items-start select-none cursor-pointer">
      <input
        type="checkbox"
        className="appearance-none"
        name={name}
        id={id}
        value={value}
        checked={isChecked}
        onChange={handleFilterChange}
        {...props}
      />
      <label
        htmlFor={id}
        className={classNames(
          "flex items-center text-white cursor-pointer mt-2.5",
          {
            "!text-somago_yellow": isChecked,
          },
        )}
      >
        {label}
        {isChecked && (
          <XIcon className="[&>path]:fill-somago_yellow w-3 h-3 ml-2" />
        )}
      </label>
    </div>
  );
}
