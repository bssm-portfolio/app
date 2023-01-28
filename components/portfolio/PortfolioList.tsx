import httpClient from "@/apis";
import { useSearch } from "@/models/search";
import { Portfolio, PortfolioListType } from "@/types/portfolio.interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  // const { list } = useSearch(keyword);

  const [list, setList] = useState<Portfolio[]>([]);
  useEffect(() => {
    httpClient.portfolio
      .search({ params: { keyword } })
      .then((d) => setList(d.data.list));
  }, [keyword]);

  return (
    <div className="flex flex-col items-start">
      {keyword}
      {list.map((portfolio) => {
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
