import config from "@/config";
import classNames from "classnames";
import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
}

export default function Avatar({
  imageUrl = "",
  width = 50,
  height = 50,
  onClick,
  className,
}: AvatarProps) {
  return (
    <Image
      onClick={onClick}
      className={classNames(className, "rounded-full", {
        "h-[40px]": height === 40,
      })}
      src={imageUrl || ""}
      alt="사용자 아바타"
      width={width}
      height={height}
      sizes="3.125rem"
      priority
      onError={(event) => {
        event.currentTarget.src = config.defaultProfile;
      }}
    />
  );
}
