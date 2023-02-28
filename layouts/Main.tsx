import { ReactNode } from "react";

interface MainLayoutProps {
  app: ReactNode;
  title: ReactNode;
  filter: ReactNode;
}

export default function MainLayout({ app, title, filter }: MainLayoutProps) {
  return (
    <section className="relative z-10 bg-background_blue overflow-hidden min-h-[calc(100vh-5.125rem)]">
      <div className="w-full flex flex-col justify-center px-[8.375rem] z-20">
        <div>{title}</div>
        <div>{filter}</div>
        <div>{app}</div>
      </div>
      <div className="absolute top-[37.5rem] -left-16 -rotate-[8deg] bg-somago_yellow w-[150vw] h-60 -z-10" />
    </section>
  );
}
