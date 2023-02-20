import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";

export default function MainPortfolioList() {
  const router = useRouter();
  const { pages, isFetching, isFetchingNextPage } = usePortfolioList();

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-12 flex-wrap">
        {pages[0].list.map((portfolio) => (
          <Portfolio
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            key={portfolio.portfolioId}
          />
        ))}
      </div>
      <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
    </div>
  );
}
