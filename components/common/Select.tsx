import { SelectHTMLAttributes } from "react";
import ReactSelect from "react-select";
import DownIcon from "../Icon/DownIcon";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options?: {
    value: string | number | readonly string[] | undefined;
    label: string;
  }[];
  nativeSelect?: boolean;
}

export default function Select({
  onChange,
  name,
  className = "",
  options = [],
  nativeSelect = false,
  ...props
}: SelectProps) {
  if (nativeSelect) {
    return (
      <div className={className}>
        <div className="relative">
          <select
            name={name}
            onChange={onChange}
            className="appearance-none pr-8 text-center bg-inherit focus:outline-none"
          >
            {options.map(({ label, value }) => (
              <option key={label + value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <DownIcon className="absolute top-2 right-3 -z-10" />
        </div>
      </div>
    );
  }
  return <ReactSelect placeholder={props.placeholder} options={options} />;
}
