import Link from "next/link";
import { Logo, SearchBar, Avatar } from "@/components";

interface HeaderProps {
  avatarUrl?: string;
}

export default function HeaderView({ avatarUrl }: HeaderProps) {
  return (
    <div className="flex justify-between items-center m-4">
      <Link href="/">
        <Logo />
      </Link>
      <SearchBar />
      <Avatar imageUrl={avatarUrl} />
    </div>
  );
}
