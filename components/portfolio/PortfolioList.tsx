import { usePortfolioList } from "@/models/portfolio";
import { useRouter } from "next/router";
import PortfolioItem from "../app/PortfolioItem";

export default function PortfolioList() {
  const { list } = usePortfolioList();
  const router = useRouter();

  return (
    <div className="flex flex-col items-start">
      {list.map((portfolio) => {
        return (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
          />
        );
      })}
    </div>
  );
}
