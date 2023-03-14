import { Portfolio } from "@/components";
import { FetchNextPageType } from "@/types/index.interface";
import { PortfolioList } from "@/types/portfolio.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../common/Loading";

interface MainPortfolioListProps {
  pages: PortfolioList[] | { list: never[] }[];
  customHasNextPage: boolean;
  fetchNextPage: FetchNextPageType;
  isFetchingNextPage: boolean;
}

export default function MainPortfolioList({
  pages,
  customHasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: MainPortfolioListProps) {
  const router = useRouter();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && customHasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, customHasNextPage]);

  return (
    <>
      <div className="flex flex-wrap gap-[1.5rem]">
        {pages.map((page) =>
          page.list.map((portfolio) => (
            <Portfolio
              portfolio={portfolio}
              onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
              key={portfolio.portfolioId}
            />
          )),
        )}
      </div>
      <div ref={ref} className="h-36">
        {isFetchingNextPage && (
          <Loading
            className="mt-8 mx-auto"
            width={60}
            height={60}
            color="#FFCA31"
          />
        )}
      </div>
    </>
  );
}
