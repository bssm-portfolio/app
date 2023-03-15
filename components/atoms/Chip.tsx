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
          "xl:!w-40": type === "portfolio",
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
        "px-3 py-1 text-center text-blue border border-blue rounded-full text-2xs whitespace-nowrap text-ellipsis overflow-hidden",
        className,
        {
          "w-16": type === "portfolio",
          "w-20": type === "main",
          "cursor-pointer py-3": type === "upload",
          "bg-blue text-white": type === "upload" && selected,
        },
      )}
    >
      {children}
    </div>
  );
}

export default { Item, Group };
