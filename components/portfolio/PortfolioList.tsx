import fixture from "@/fixtures";
import { useSearch } from "@/models/search";
import { useRouter } from "next/router";
import PortfolioItem from "../app/PortfolioItem";

interface PortfolioListProps {
  keyword?: string;
}

export default function PortfolioList({ keyword = "" }: PortfolioListProps) {
  // const { list } = useSearch(keyword);
  const list = fixture.portfolioList;
  const router = useRouter();

  return (
    <div className="flex flex-col items-start">
      {list.map((portfolio) => {
        return (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            type="main"
          />
        );
      })}
    </div>
  );
}
