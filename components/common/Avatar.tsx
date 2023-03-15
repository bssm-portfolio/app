import config from "@/config";
import classNames from "classnames";
import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
  sizes?: number;
}

export default function Avatar({
  imageUrl,
  onClick,
  className,
  sizes = 40,
}: AvatarProps) {
  return (
    <Image
      onClick={onClick}
      className={classNames(className, "rounded-full")}
      src={imageUrl || config.defaultProfile}
      alt="사용자"
      width={sizes}
      height={sizes}
      sizes={sizes.toString()}
      priority
    />
  );
}
