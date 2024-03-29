import styleConfig from "@/config/style";
import classNames from "classnames";
import { ReactNode } from "react";

interface FrameProps {
  title: ReactNode;
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
  pt-10 
  px-4
  z-20
  xl:flex-row
  overflow-hidden
  `;
};

function Frame({ title, app, sidebar, detail, comment }: FrameProps) {
  return (
    <section className={classNames("relative overflow-x-hidden")}>
      <div
        className={classNames(
          styleConfig.desktopWidth,
          "relative mx-auto z-10 min-h-[calc(100vh-11.4375rem)] ",
        )}
      >
        {title}
        <div className={getLayoutCss()}>
          <div className="w-full">
            {app}
            {detail}
            {comment}
          </div>
          <div className="mt-base xl:mt-0 xl:row-span-2">{sidebar}</div>
        </div>
      </div>
      <div className="absolute -top-[15rem] -left-24 rotate-[-7deg] w-[150vw] h-[55rem] bg-background_blue -z-10" />
    </section>
  );
}

export function AppLayout(props: FrameProps) {
  return <Frame {...props} />;
}

export default AppLayout;
