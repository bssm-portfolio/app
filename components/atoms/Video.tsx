import useWindow from "@/hooks/useWindow";
import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player/lazy";

export default function Video({ ...props }: ReactPlayerProps) {
  const { isWindow } = useWindow();
  if (!isWindow) return <div />;
  return <ReactPlayer {...props} />;
}
