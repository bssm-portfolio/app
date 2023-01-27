import { Header } from "@/components";
import Filter from "@/components/contents/Filter";
import PortfolioList from "@/components/portfolio/PortfolioList";
import { ReactNode } from "react";

interface FrameProps {
  filter: ReactNode;
  portfolioList: ReactNode;
}

function Frame({ filter, portfolioList }: FrameProps) {
  return (
    <>
      <div>{filter}</div>
      <div>{portfolioList}</div>
    </>
  );
}

export default function SearchPageLayout() {
  return (
    <>
      <Header />
      <Frame filter={<Filter />} portfolioList={<PortfolioList />} />
    </>
  );
}
