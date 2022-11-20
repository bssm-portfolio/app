import Image from "next/image";

interface AvatarProps {
  imageUrl?: string;
  width?: number;
  height?: number;
}

export default function Avatar({
  imageUrl = "",
  width = 50,
  height = 50,
}: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      src={imageUrl}
      alt="사용자 아바타"
      width={width}
      height={height}
    />
  );
}
