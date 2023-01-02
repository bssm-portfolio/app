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
    <div className="pt-[3.25rem] grid grid-rows-[1fr] xl:grid-cols-[minmax(0,_1fr)_26.25rem] xl:grid-rows-[minmax(1fr,_0)_18.75rem] px-4 xl:px-[6.25rem]">
      <div>
        <div>{app}</div>
        <div>{detail}</div>
      </div>
      <div className="mt-base xl:mt-0 xl:row-span-2">{sidebar}</div>
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
