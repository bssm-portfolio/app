import Link from "next/link";
import { Logo, SearchBar, Avatar, HeaderButton } from "@/components";
import { useRouter } from "next/router";
import styleConfig from "@/config/style";
import classNames from "classnames";

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
    <div className="flex justify-center bg-background_blue z-50">
      <div
        className={classNames(
          "flex flex-col justify-between items-start gap-3 my-4 select-none lg:flex-row lg:items-center",
          styleConfig.desktopWidth,
        )}
      >
        <Link href="/">
          <Logo />
        </Link>
        <SearchBar />
        <div className="flex gap-4">
          <HeaderButton onClick={onLeftButtonClick}>
            {isLogined ? "log out" : "log in"}
          </HeaderButton>
          {isLogined && (
            <HeaderButton
              onClick={onRightButtonClick}
              className="!bg-somago_yellow"
            >
              upload +
            </HeaderButton>
          )}
          {isLogined && (
            <div className="relative cursor-pointer">
              <Avatar
                imageUrl={avatarUrl}
                width={40}
                height={40}
                onClick={() => router.push(`/profile/${memberId}`)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
