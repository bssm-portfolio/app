import styleConfig from "@/config/style";
import { ReactNode } from "react";

interface FrameProps {
  app: ReactNode;
}

function Frame({ app }: FrameProps) {
  return (
    <section className="flex justify-center min-h-[calc(100vh-4.625rem)]">
      <div className={styleConfig.desktopWidth}>{app}</div>
    </section>
  );
}

export default function EditLayout({ app }: FrameProps) {
  return <Frame app={app} />;
}
