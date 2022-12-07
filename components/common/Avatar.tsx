import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function Avatar({
  imageUrl = "",
  width = 50,
  height = 50,
  onClick,
}: AvatarProps) {
  return (
    <Image
      onClick={onClick}
      className="rounded-full"
      src={imageUrl}
      alt="사용자 아바타"
      width={width}
      height={height}
    />
  );
}
