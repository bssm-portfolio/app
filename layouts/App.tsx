import { ReactNode } from "react";
import { Header } from "@/components";

interface FrameProps {
  app: ReactNode;
  sidebar: ReactNode;
  detail: ReactNode;
}

function Frame({ app, sidebar, detail }: FrameProps) {
  return (
    <div className="px-[134px] pt-[52px] flex justify-between">
      <div className="w-full">
        <div>{app}</div>
        <div>{detail}</div>
      </div>
      <div>{sidebar}</div>
    </div>
  );
}

export function AppLayout({ app, sidebar, detail }: FrameProps) {
  return (
    <>
      <Header />
      <Frame app={app} sidebar={sidebar} detail={detail} />
    </>
  );
}

export default AppLayout;
