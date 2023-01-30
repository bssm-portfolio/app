import { Header } from "@/components";
import { ReactNode } from "react";

interface SearchPageLayoutProps {
  filter: ReactNode;
  portfolioList: ReactNode;
}

function Frame({ filter, portfolioList }: SearchPageLayoutProps) {
  return (
    <div className="pt-8 px-32 flex flex-col justify-center">
      <div>{filter}</div>
      <div>{portfolioList}</div>
    </div>
  );
}

export default function SearchPageLayout({
  filter,
  portfolioList,
}: SearchPageLayoutProps) {
  return (
    <>
      <Header />
      <Frame filter={filter} portfolioList={portfolioList} />
    </>
  );
}
