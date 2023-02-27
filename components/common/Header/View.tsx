import Link from "next/link";
import { Logo, SearchBar, Avatar, HeaderButton } from "@/components";
import { useRouter } from "next/router";

interface HeaderProps {
  avatarUrl?: string;
  isLogined?: boolean;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  memberId: number;
}

export default function HeaderView({
  avatarUrl,
  isLogined,
  onLeftButtonClick,
  onRightButtonClick,
  memberId,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center bg-background_blue">
      <div className="flex justify-between items-center m-4 w-74">
        <Link href="/">
          <Logo />
        </Link>
        <SearchBar />
        <div className="flex gap-4">
          <HeaderButton onClick={onLeftButtonClick}>
            {isLogined ? "log out" : "log in"}
          </HeaderButton>
          {isLogined && (
            <HeaderButton onClick={onRightButtonClick} varient="secondary">
              upload +
            </HeaderButton>
          )}
        </div>
        {isLogined && (
          <div className="relative cursor-pointer">
            <Avatar
              imageUrl={avatarUrl}
              onClick={() => router.push(`/profile/${memberId}`)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
