import ReactLoading from "react-loading";

type LoadingType =
  | "blank"
  | "balls"
  | "bars"
  | "bubbles"
  | "cubes"
  | "cylon"
  | "spin"
  | "spinningBubbles"
  | "spokes";

interface LoadingProps {
  color?: string;
  type?: LoadingType;
  className?: string;
  width?: number;
  height?: number;
}

export default function Loading({
  type = "spin",
  color = "black",
  className = "",
  width = 30,
  height = 30,
}: LoadingProps) {
  return (
    <ReactLoading
      type={type}
      color={color}
      height={width}
      width={height}
      className={className}
    />
  );
}
