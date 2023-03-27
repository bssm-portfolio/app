import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ReactSelect from "react-select";
import DownIcon from "../Icon/DownIcon";

export interface Option {
  value: string | number | readonly string[] | undefined;
  label: string;
}
interface SelectProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options?: Option[];
  nativeSelect?: boolean;
  registerReturn?: UseFormRegisterReturn;
  setValue?: (v: T) => void;
  defaultValue?: string;
}

export default function Select<T>({
  onChange,
  setValue,
  name,
  className = "",
  options = [],
  registerReturn,
  nativeSelect = false,
  defaultValue,
  ...props
}: SelectProps<T>) {
  if (nativeSelect) {
    return (
      <div className={className}>
        <div className="relative">
          <select
            name={name}
            onChange={onChange}
            className="appearance-none pr-8 text-center bg-inherit focus:outline-none"
            {...registerReturn}
            defaultValue={defaultValue}
          >
            {options.map(({ label, value }) => (
              <option key={label + value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <DownIcon className="absolute top-2 right-3" />
        </div>
      </div>
    );
  }
  return (
    <ReactSelect
      id={name}
      onChange={(v) => setValue?.(v as T)}
      placeholder={props.placeholder}
      options={options}
      defaultInputValue={defaultValue}
    />
  );
}
