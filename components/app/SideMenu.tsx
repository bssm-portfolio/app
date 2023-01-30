import PortfolioList from "../portfolio/PortfolioList";

export default function SideMenu() {
  return (
    <div className="ml-0 xl:ml-xlarge ">
      <h2 className="text-base font-bold">추천 프로젝트</h2>
      <PortfolioList type="portfolio" />
    </div>
  );
}
