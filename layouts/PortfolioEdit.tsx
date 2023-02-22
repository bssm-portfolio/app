import { ReactNode } from "react";

interface FrameProps {
  app: ReactNode;
}

function Frame({ app }: FrameProps) {
  return <section>{app}</section>;
}

export default function EditLayout({ app }: FrameProps) {
  return <Frame app={app} />;
}
