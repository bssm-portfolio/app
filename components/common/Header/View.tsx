import Link from "next/link";
import { Logo, SearchBar, Avatar, Menu, Button } from "@/components";
import classNames from "classnames";
import type { MenuPair } from "../Menu";

interface HeaderModalMenuProps {
  menuOpen?: boolean;
  menuPair: MenuPair[];
  toggleMenu?: () => void;
}
interface HeaderProps extends HeaderModalMenuProps {
  avatarUrl?: string;
}

function HeaderModalMenu({
  menuPair,
  menuOpen,
  toggleMenu,
}: HeaderModalMenuProps) {
  return (
    <>
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
    </>
  );
}

export default function HeaderView({ avatarUrl }: HeaderProps) {
  const isLogined = false;
  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center m-4 w-74">
        <Link href="/">
          <Logo />
        </Link>
        <SearchBar />
        <div className="flex gap-4">
          <Button>log out</Button>
          <Button varient="secondary">
            {isLogined ? "upload +" : "sign up"}
          </Button>
        </div>
        <div className="relative">
          <Avatar imageUrl={avatarUrl} />
          {/* <HeaderModalMenu/> */}
        </div>
      </div>
    </div>
  );
}
