import useSearch from "@/models/search";
import { PortfolioListType } from "@/types/portfolio.interface";
import { useRouter } from "next/router";
import PortfolioItem from "../app/PortfolioItem";

interface PortfolioListProps {
  keyword?: string;
  type?: PortfolioListType;
}

export default function PortfolioList({
  keyword = "",
  type = "main",
}: PortfolioListProps) {
  const router = useRouter();
  const { list: portfolioList } = useSearch(keyword);

  return (
    <div className="flex flex-col items-start">
      {portfolioList.map((portfolio) => {
        return (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            type={type}
          />
        );
      })}
    </div>
  );
}
