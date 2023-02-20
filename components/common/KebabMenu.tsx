import classNames from "classnames";
import { ReactNode, useState } from "react";
import KebabIcon from "../Icon/KebabIcon";

interface KebabProps {
  children: ReactNode;
  className?: string;
}

function KebabMenuProvider({ children, className = "" }: KebabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => setIsOpen((prev) => !prev);

  return (
    <div className={classNames("relative text-sm", className)}>
      <KebabIcon onClick={handleMenuClick} className="hover:opacity-50" />
      {isOpen && children}
    </div>
  );
}

function KebabMenu({ children, className = "" }: KebabProps) {
  return (
    <ul
      className={classNames(
        "absolute top-6 right-0 border rounded p-2.5",
        className,
      )}
    >
      {children}
    </ul>
  );
}
function KebabItem({ children, className = "" }: KebabProps) {
  return (
    <li className={classNames("flex items-center", className)}>{children}</li>
  );
}

export default { KebabMenuProvider, KebabMenu, KebabItem };
