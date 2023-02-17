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
  md:px-6
  xl:px-[6.25rem]
  xl:flex-row
  `;
};

function Frame({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <section className={getLayoutCss()}>
      <div className="w-full">
        {app}
        {detail}
        {comment}
      </div>
      <div className="mt-base xl:mt-0 xl:row-span-2">{sidebar}</div>
    </section>
  );
}

export function AppLayout({ app, sidebar, detail, comment }: FrameProps) {
  return (
    <Frame app={app} sidebar={sidebar} detail={detail} comment={comment} />
  );
}

export default AppLayout;
