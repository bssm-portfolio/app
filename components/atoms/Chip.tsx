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
}

function Group({ children, className, type = "main" }: ChipGroupProps) {
  return (
    <div
      className={`${classNames(
        className,
        "flex gap-1 flex-wrap max-w-[20rem]",
        {
          "xl:w-[8.4375rem]": type === "portfolio",
        },
      )}`}
    >
      {children}
    </div>
  );
}

function Item({ children, type = "main" }: ChipProps) {
  return (
    <div
      className={classNames(
        "px-3 py-1 border border-blue rounded-full text-blue text-sxx",
        {
          "max-w-[7.5rem] overflow-hidden text-ellipsis whitespace-nowrap":
            type === "portfolio",
        },
      )}
    >
      {children}
    </div>
  );
}

export default { Item, Group };
