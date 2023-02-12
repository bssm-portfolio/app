import { PortfolioListType } from "@/types/portfolio.interface";
import classNames from "classnames";
import { ReactNode } from "react";

interface ChipGroupProps {
  children: ReactNode;
  className?: string;
  type?: PortfolioListType;
}

interface ChipProps {
  children: ReactNode;
  type?: PortfolioListType;
  selected?: boolean;
  onClick?: (v: unknown) => void;
}

function Group({ children, className, type = "main" }: ChipGroupProps) {
  return (
    <div
      className={`${classNames(className, "flex gap-1 flex-wrap", {
        "max-w-[20rem]": type === "main",
        "w-full": type === "detail",
        "xl:w-[8.4375rem]": type === "portfolio",
        "w-full max-w-none": type === "upload",
      })}`}
    >
      {children}
    </div>
  );
}

function Item({ children, type = "main", selected, onClick }: ChipProps) {
  return (
    <div
      onClick={() => onClick?.(children)}
      className={classNames(
        "px-3 py-1 border border-blue rounded-full text-sxx",
        {
          "text-blue": type === "main" || (type === "upload" && !selected),
          "xl:max-w-[7.5rem] xl:overflow-hidden xl:text-ellipsis xl:whitespace-nowrap":
            type === "portfolio",
          "cursor-pointer h-[2.31rem] whitespace-nowrap text-ellipsis overflow-hidden text-[0.875rem] flex items-center":
            type === "upload",
          "bg-blue text-white": type === "upload" && selected,
        },
      )}
    >
      {children}
    </div>
  );
}

export default { Item, Group };
