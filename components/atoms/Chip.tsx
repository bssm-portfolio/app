import classNames from "classnames";

interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface ChipProps {
  children: React.ReactNode;
}

function Group({ children, className }: ChipGroupProps) {
  return (
    <div className={`${classNames(className, "flex gap-1 flex-wrap")}`}>
      {children}
    </div>
  );
}

function Item({ children }: ChipProps) {
  return (
    <div className="px-3 py-1 border border-blue rounded-full text-blue text-sxx ">
      {children}
    </div>
  );
}

export default { Item, Group };
