import { ReactNode } from "react";

interface FrameProps {
  app: ReactNode;
}

function Frame({ app }: FrameProps) {
  return (
    <section className="flex px-[8.375rem] pb-16 pt-10 min-h-[calc(100vh-4.625rem)]">
      {app}
    </section>
  );
}

export default function ProfileEditLayout({ app }: FrameProps) {
  return <Frame app={app} />;
}
