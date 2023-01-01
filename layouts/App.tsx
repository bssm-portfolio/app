import { ReactNode } from "react";
import { Header } from "@/components";

interface FrameProps {
  app: ReactNode;
  sidebar: ReactNode;
  detail: ReactNode;
}

function Frame({ app, sidebar, detail }: FrameProps) {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_460px] grid-rows-[minmax(400px,_1fr)_66%] p-[30px]">
      <div className="w-full">{app}</div>
      <div>{sidebar}</div>
      <div>{detail}</div>
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
