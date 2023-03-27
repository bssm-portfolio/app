import useWindow from "@/hooks/useWindow";
import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player/lazy";

interface VideoProps extends ReactPlayerProps {
  src?: string | string[];
}

export default function Video({ src, ...props }: VideoProps) {
  const { isWindow } = useWindow();
  if (!isWindow) return <div />;

  return <ReactPlayer width="100%" url={src} {...props} />;
}
