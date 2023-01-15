import classNames from "classnames";
import { ReactNode } from "react";

interface ChipGroupProps {
  children: ReactNode;
  className?: string;
}

interface ChipProps {
  children: ReactNode;
}

function Group({ children, className }: ChipGroupProps) {
  return (
    <div
      className={`${classNames(
        className,
        "flex gap-1 flex-wrap xl:w-[8.4375rem]",
      )}`}
    >
      {children}
    </div>
  );
}

function Item({ children }: ChipProps) {
  return (
    <div className="px-3 py-1 border border-blue rounded-full text-blue text-sxx">
      {children}
    </div>
  );
}

export default { Item, Group };
