import { ReactNode } from "react";

interface FrameProps {
  app: ReactNode;
  sidebar: ReactNode;
  detail: ReactNode;
  comment: ReactNode;
}

const getLayoutCss = () => {
  return `
  flex
  flex-col
  justify-between
  pt-[3.25rem] 
  px-4
  z-20
  md:px-6
  xl:px-[6.25rem]
  xl:flex-row
  `;
};

function Frame({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <section className="relative z-10 overflow-hidden min-h-[calc(100vh-5.125rem)]">
      <div className={getLayoutCss()}>
        <div className="w-full">
          {app}
          {detail}
          {comment}
        </div>
        <div className="mt-base xl:mt-0 xl:row-span-2">{sidebar}</div>
      </div>
      <div className="absolute -top-[15rem] -left-24 rotate-[-7deg] w-[150vw] h-[55rem] bg-background_blue -z-10" />
    </section>
  );
}

export function AppLayout({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <Frame app={app} sidebar={sidebar} detail={detail} comment={comment} />
  );
}

export default AppLayout;
