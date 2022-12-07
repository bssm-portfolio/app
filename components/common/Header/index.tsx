import { userState } from "@/store";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { MenuPair } from "../Menu";
import HeaderView from "./View";

export default function Header() {
  const [user] = useRecoilState(userState);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuPair: MenuPair[] = [
    { name: "마이페이지", onClick: () => router.push("/mypage") },
    { name: "로그아웃", onClick: () => router.push("/signin") },
  ];
  return (
    <HeaderView
      menuPair={menuPair}
      avatarUrl={user.avatarUrl}
      menuOpen={menuOpen}
      toggleMenu={() => setMenuOpen((s) => !s)}
    />
  );
}
