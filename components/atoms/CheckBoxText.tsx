import classNames from "classnames";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Filter, SearchFilterPropertyType } from "@/types/portfolio.interface";
import { deepcopy } from "@/utils/data";
import { XIcon } from "../Icon";

interface RadioProps {
  id: string;
  label: string;
  name: SearchFilterPropertyType;
  value: string;
  checkedId: string;
  setCheckedId: Dispatch<SetStateAction<string>>;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export default function CheckBoxText({
  id,
  label,
  name,
  value,
  checkedId,
  setCheckedId,
  filter,
  setFilter,
  ...props
}: RadioProps) {
  const isChecked = checkedId === id;
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkedId === id) {
      setCheckedId("");
      setFilter((prev) => {
        const newPrev = deepcopy(prev);
        delete newPrev[name];
        return newPrev;
      });
      return;
    }
    setCheckedId(id);
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
