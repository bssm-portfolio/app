import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../common/Loading";

export default function MainPortfolioList() {
  const router = useRouter();
  // todo: usePortfolioList useInfiniteQuery 안쓰는 빌트인 함수 정리하기
  const { pages, isFetchingNextPage, fetchNextPage } = usePortfolioList(
    { page: 1, size: 12 },
    {},
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

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
      <div ref={ref}>
        {isFetchingNextPage && (
          <Loading className="mt-8" width={60} height={60} type="spin" />
        )}
      </div>
    </div>
  );
}
