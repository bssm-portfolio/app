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
  const { pages } = useSearch({ page: 1, size: 12 }, { search: keyword });

  return (
    <div className="flex flex-col items-start">
      {pages[0].list.map((portfolio) => {
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
