import { Portfolio } from "@/components";
import { FetchNextPageType } from "@/types/index.interface";
import { PortfolioList } from "@/types/portfolio.interface";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../common/Loading";

export default function MainPortfolioList({
  pages,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: {
  pages: PortfolioList[] | { list: never[] }[];
  hasNextPage: boolean;
  fetchNextPage: FetchNextPageType;
  isFetchingNextPage: boolean;
}) {
  const router = useRouter();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-12">
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
            color="#FAAF3D"
          />
        )}
      </div>
    </>
  );
}
