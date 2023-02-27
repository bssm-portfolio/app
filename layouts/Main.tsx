import { ReactNode } from "react";

interface MainLayoutProps {
  app: ReactNode;
  title: ReactNode;
  filter: ReactNode;
}

export default function MainLayout({ app, title, filter }: MainLayoutProps) {
  return (
    <div className="relative w-full flex flex-col justify-center px-[8.375rem] bg-background_blue overflow-hidden -z-20">
      <div>{title}</div>
      <div>{filter}</div>
      <div>{app}</div>
      <div className="absolute top-[37.5rem] -left-16 -rotate-[8deg] bg-somago_yellow w-[110vw] h-60 -z-10" />
    </div>
  );
}
