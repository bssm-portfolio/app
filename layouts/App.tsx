import { ReactNode } from "react";

interface FrameProps {
  app: ReactNode;
  sidebar: ReactNode;
  detail: ReactNode;
  comment: ReactNode;
}

const getLayoutCss = () => {
  return `
  grid 
  pt-[3.25rem] 
  px-4
  md:px-6
  xl:px-[6.25rem]
  xl:grid-cols-[minmax(0,_1fr)_28.25rem] 
  xl:grid-rows-[minmax(1fr,_0)_18.75rem] 
  `;
};

function Frame({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <section className={getLayoutCss()}>
      <div>
        <div>{app}</div>
        <div>{detail}</div>
      </div>
      <div className="mt-base xl:mt-0 xl:row-span-2">{sidebar}</div>
      <div>{comment}</div>
    </section>
  );
}

export function AppLayout({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <Frame app={app} sidebar={sidebar} detail={detail} comment={comment} />
  );
}

export default AppLayout;
