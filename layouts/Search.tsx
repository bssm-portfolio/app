import Filter from "@/components/contents/Filter";
import PortfolioList from "@/components/portfolio/PortfolioList";

function Frame({ filter, portfolioList }) {
  return (
    <div>
      <div>{filter}</div>
      <div>{portfolioList}</div>
    </div>
  );
}

export default function SearchPageLayout() {
  return <Frame filter={<Filter />} portfolioList={<PortfolioList />} />;
}
