import { usePortfolioList } from "@/models/portfolio";
import { useRouter } from "next/router";
import SideMenuPortfolio from "../app/SideMenuPortfolio";

export default function SideMenuItem() {
  const { list } = usePortfolioList();
  const router = useRouter();

  return (
    <div className="flex flex-col items-start">
      {list.map((portfolio) => {
        return (
          <SideMenuPortfolio
            key={portfolio.portfolioId}
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
          />
        );
      })}
    </div>
  );
}
