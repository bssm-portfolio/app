import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../common/Loading";

export default function MainPortfolioList() {
  const router = useRouter();
  const { pages, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePortfolioList({ size: 12 }, {});
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
            type="spin"
          />
        )}
      </div>
    </>
  );
}
