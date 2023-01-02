import { ReactNode } from "react";
import { Header } from "@/components";

interface FrameProps {
  app: ReactNode;
  sidebar: ReactNode;
  detail: ReactNode;
  comment: ReactNode;
}

function Frame({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <div className="pt-[52px] grid grid-rows-[1fr] xl:grid-cols-[minmax(0,_1fr)_420px] xl:grid-rows-[minmax(1fr,_0)_300px] px-4 xl:px-[100px]">
      <div>
        <div>{app}</div>
        <div>{detail}</div>
      </div>
      <div className="mt-[16px] xl:mt-0 xl:row-span-2">{sidebar}</div>
      <div>{comment}</div>
    </div>
  );
}

export function AppLayout({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <>
      <Header />
      <Frame app={app} sidebar={sidebar} detail={detail} comment={comment} />
    </>
  );
}

export default AppLayout;
