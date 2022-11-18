import Link from "next/link";
import { Logo, SearchBar, Avatar } from "@/components";
import { useRecoilState } from "recoil";
import { userState } from "@/store";

export default function Header() {
  const [user] = useRecoilState(userState);

  return (
    <div
      className="flex justify-between items-center m-4"
      onClick={(e) => console.log("outer")}
    >
      <Link href="/">
        <Logo />
      </Link>
      <SearchBar />
      <Avatar imageUrl={user.avatarUrl} />
    </div>
  );
}
