import classNames from "classnames";

export type MenuPair = {
  name: string;
  onClick: () => void;
};
interface MenuProps {
  className?: string;
  menuPair: MenuPair[];
}

export default function Menu({ className, menuPair }: MenuProps) {
  return (
    <div className={classNames(className, `w-32 bg-slate-200 p-4`)}>
      {menuPair.map((menu) => (
        <div
          className="m-2 hover:cursor-pointer"
          key={menu.name}
          onClick={menu.onClick}
        >
          {menu.name}
        </div>
      ))}
    </div>
  );
}
