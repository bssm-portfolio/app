import { ReactNode } from "react";

interface SearchPageLayoutProps {
  filter: ReactNode;
  portfolioList: ReactNode;
}

function Frame({ filter, portfolioList }: SearchPageLayoutProps) {
  return (
    <div className="relative pt-8 px-32 flex flex-col justify-center z-10 overflow-hidden">
      <div className="z-20">
        <div>{filter}</div>
        <div>{portfolioList}</div>
      </div>
      <div className="absolute -top-[10rem] -left-24 rotate-[-8deg] w-[150vw] h-[37.5rem] bg-background_blue -z-10" />
    </div>
  );
}

export default function SearchPageLayout({
  filter,
  portfolioList,
}: SearchPageLayoutProps) {
  return <Frame filter={filter} portfolioList={portfolioList} />;
}
