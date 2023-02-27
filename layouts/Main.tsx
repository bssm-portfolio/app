import { ReactNode } from "react";

interface MainLayoutProps {
  app: ReactNode;
  title: ReactNode;
  filter: ReactNode;
}

export default function MainLayout({ app, title, filter }: MainLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-center px-[8.375rem] bg-background_blue">
      <div>{title}</div>
      <div>{filter}</div>
      <div>{app}</div>
    </div>
  );
}
