import { MainLayout } from "@/layouts";
import MainTitle from "@/components/main/MainTitle";
import MainFilter from "@/components/main/MainFilter";
import { usePortfolioList } from "@/models/portfolio";
import { MainPortfolioList, Portfolio as PortfolioView } from "@/components";
import { useState } from "react";
import { Portfolio, SortType } from "@/types/portfolio.interface";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/apis";
import { useRouter } from "next/router";
import RecommendIcon from "@/components/Icon/RecommendIcon";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<SortType>("ALL");
  const { pages, isFetchingNextPage, fetchNextPage, customHasNextPage } =
    usePortfolioList(
      { size: 12 },
      keyword !== "ALL" ? { sortType: keyword } : {},
    );

  const { data } = useQuery(["recommendPortfolio"], () =>
    httpClient.portfolio
      .search({
        pagination: { size: 6, page: 0 },
        filter: {
          recommendStatus: "RECOMMEND",
        },
      })
      .then((r) => r.data),
  );

  return (
    <MainLayout
      app={
        <MainPortfolioList
          pages={pages}
          customHasNextPage={customHasNextPage || false}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
      title={<MainTitle />}
      filter={<MainFilter keyword={keyword} setKeyword={setKeyword} />}
      recommend={
        ["ALL", "BOOKMARKS"].includes(keyword) ? (
          <>
            <div className="flex justify-center items-center rounded-full gap-[0.375rem] text-blue font-bold bg-white w-[8.5rem] h-[2.25rem] text-sm mb-[2.5rem]">
              <RecommendIcon size={24} />
              추천 프로젝트
            </div>
            <div className="flex flex-wrap gap-[1.5rem]">
              {data?.list.map((portfolio: Portfolio) => (
                <PortfolioView
                  portfolio={portfolio}
                  onClick={() =>
                    router.push(`/portfolio/${portfolio.portfolioId}`)
                  }
                  key={portfolio.portfolioId}
                />
              ))}
            </div>
            <hr className="text-white my-10" />
          </>
        ) : undefined
      }
    />
  );
}
