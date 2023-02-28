import { ReactNode } from "react";

interface FrameProps {
  app: ReactNode;
}

function Frame({ app }: FrameProps) {
  return <section className="min-h-[calc(100vh-5.125rem)]">{app}</section>;
}

export default function EditLayout({ app }: FrameProps) {
  return <Frame app={app} />;
}
