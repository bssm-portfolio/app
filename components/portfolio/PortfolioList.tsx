import { usePortfolioList } from "@/models/portfolio";
import useSearch from "@/models/search";
import { PortfolioListType } from "@/types/portfolio.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PortfolioItem from "../app/PortfolioItem";
import Loading from "../common/Loading";

interface PortfolioListProps {
  keyword?: string;
  type?: PortfolioListType;
}

export default function PortfolioList({
  keyword = "",
  type = "main",
}: PortfolioListProps) {
  const router = useRouter();
  const { pages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePortfolioList({ size: 12 }, { search: keyword });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-start">
      {pages.map((page) =>
        page.list.map((portfolio) => (
          <PortfolioItem
            key={portfolio.portfolioId}
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            type={type}
          />
        )),
      )}
      <div ref={ref} className="h-36">
        {isFetchingNextPage && (
          <Loading className="mt-8" width={60} height={60} type="spin" />
        )}
      </div>
    </div>
  );
}
