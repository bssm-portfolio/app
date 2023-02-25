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
      className={`${classNames(
        className,
        "flex w-80 overflow-auto scrollbar-hide py-1",
        {
          "xl:max-w-[8.125rem]": type === "portfolio",
          "!w-[23rem]": type === "detail",
          "!w-full": type === "upload",
        },
      )}`}
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
        "px-3 py-1 border border-blue rounded-full text-sxx whitespace-nowrap mr-1",
        {
          "text-blue": type === "main" || (type === "upload" && !selected),
          "cursor-pointer h-[2.31rem] whitespace-nowrap text-ellipsis text-[0.875rem] flex items-center":
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
