import Link from "next/link";
import { Logo, SearchBar, Avatar, Menu } from "@/components";
import classNames from "classnames";
import type { MenuPair } from "../Menu";

interface HeaderProps {
  avatarUrl?: string;
  toggleMenu?: () => void;
  menuOpen?: boolean;
  menuPair: MenuPair[];
}

export default function HeaderView({
  avatarUrl,
  menuOpen = false,
  toggleMenu,
  menuPair,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center m-4">
      <Link href="/">
        <Logo />
      </Link>
      <SearchBar />
      <div className="relative">
        <Avatar imageUrl={avatarUrl} onClick={toggleMenu} />
        <Menu
          menuPair={menuPair}
          className={classNames("absolute top-4 right-2", {
            "z-20 opacity-100": menuOpen,
            "-z-10 opacity-0": !menuOpen,
          })}
        />
        <div
          onClick={toggleMenu}
          className={classNames(
            "bg-slate-600 opacity-10 fixed left-0 top-0 w-screen h-screen",
            {
              "z-10 ": menuOpen,
              hidden: !menuOpen,
            },
          )}
        />
      </div>
    </div>
  );
}
