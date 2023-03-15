import { ReactNode } from "react";

interface MainLayoutProps {
  app: ReactNode;
  title: ReactNode;
  filter: ReactNode;
  recommend?: ReactNode;
}

export default function MainLayout({
  app,
  title,
  filter,
  recommend,
}: MainLayoutProps) {
  return (
    <section className="relative z-10 bg-background_blue overflow-hidden flex justify-center min-h-[calc(100vh-4.625rem)]">
      <div className="flex flex-col z-20 w-[90vw]">
        <div>{title}</div>
        <div>{filter}</div>
        {recommend && <div>{recommend}</div>}
        <div>{app}</div>
      </div>
      <div className="absolute top-[37.5rem] -left-[1000px] -rotate-[8deg] bg-somago_yellow w-[5000px] h-full -z-10" />
    </section>
  );
}
