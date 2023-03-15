import config from "@/config";
import classNames from "classnames";
import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
  width: number;
  height: number;
}

export default function Avatar({
  imageUrl,
  onClick,
  className,
  width,
  height,
}: AvatarProps) {
  return (
    <Image
      onClick={onClick}
      className={classNames(className, "rounded-full")}
      src={imageUrl || config.defaultProfile}
      alt="사용자"
      width={width}
      height={height}
      priority
    />
  );
}
