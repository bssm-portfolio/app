import { PortfolioListType } from "@/types/portfolio.interface";
import classNames from "classnames";
import { ReactNode } from "react";

interface ChipGroupProps {
  children: ReactNode;
  className?: string;
  type?: PortfolioListType;
}

interface ChipItemProps {
  children: ReactNode;
  type?: PortfolioListType;
  className?: string;
  selected?: boolean;
  onClick?: (v: unknown) => void;
}

function Group({ children, className, type = "main" }: ChipGroupProps) {
  return (
    <div
      className={`${classNames(
        className,
        "flex flex-wrap gap-1.5 py-1 xl:w-32",
        {
          "!w-full": type === "detail" || "upload",
          "!w-[150px]": type === "portfolio",
        },
      )}`}
    >
      {children}
    </div>
  );
}

function Item({
  children,
  type = "main",
  className,
  selected,
  onClick,
}: ChipItemProps) {
  return (
    <div
      onClick={() => onClick?.(children)}
      className={classNames(
        "px-3 py-1 text-center border border-blue rounded-full text-sxx whitespace-nowrap text-ellipsis overflow-hidden",
        className,
        {
          "w-16": type === "portfolio",
          "text-blue": type === "main" || (type === "upload" && !selected),
          "cursor-pointer !w-24 py-3": type === "upload",
          "bg-blue text-white": type === "upload" && selected,
          " text-blue": type === "detail",
        },
      )}
    >
      {children}
    </div>
  );
}

export default { Item, Group };
