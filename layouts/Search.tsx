import styleConfig from "@/config/style";
import { ReactNode } from "react";

interface SearchPageLayoutProps {
  filter: ReactNode;
  portfolioList: ReactNode;
}

function Frame({ filter, portfolioList }: SearchPageLayoutProps) {
  return (
    <section className="flex justify-center">
      <div
        className={`relative pt-8 flex flex-col z-10 overflow-hidden min-h-[calc(100vh-4.625rem)] ${styleConfig.desktopWidth}`}
      >
        <div className="z-20">
          <div>{filter}</div>
          <div>{portfolioList}</div>
        </div>
      </div>
      <div className="absolute -top-[15rem] -left-24 rotate-[-7deg] w-[150vw] h-[55rem] bg-background_blue -z-10" />
    </section>
  );
}

export default function SearchPageLayout({
  filter,
  portfolioList,
}: SearchPageLayoutProps) {
  return <Frame filter={filter} portfolioList={portfolioList} />;
}
