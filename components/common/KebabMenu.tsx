import classNames from "classnames";
import { ReactNode, useState } from "react";
import KebabIcon from "../Icon/KebabIcon";

interface KebabProps {
  children: ReactNode;
  className?: string;
}

function MenuProvider({ children, className = "" }: KebabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => setIsOpen((prev) => !prev);

  return (
    <div
      onClick={handleMenuClick}
      className={classNames("relative text-sm", className)}
    >
      <KebabIcon className="hover:opacity-50" />
      {isOpen && children}
    </div>
  );
}

function Menu({ children, className = "" }: KebabProps) {
  return (
    <ul
      className={classNames("absolute top-6 right-0 border rounded", className)}
    >
      {children}
    </ul>
  );
}
function Item({ children, className = "" }: KebabProps) {
  return (
    <li
      className={classNames(
        "flex items-center whitespace-nowrap cursor-pointer px-2.5 py-[0.3125rem] hover:bg-slate-300",
        className,
      )}
    >
      {children}
    </li>
  );
}

export default { MenuProvider, Menu, Item };
