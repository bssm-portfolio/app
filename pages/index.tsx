import { MainLayout } from "@/layouts";
import MainTitle from "@/components/main/MainTitle";
import MainFilter from "@/components/main/MainFilter";
import { usePortfolioList } from "@/models/portfolio";
import { MainPortfolioList } from "@/components";
import { useState } from "react";
import { SortType } from "@/types/portfolio.interface";

export default function Home() {
  const [keyword, setKeyword] = useState<SortType>("ALL");
  const { pages, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePortfolioList(
      { size: 12 },
      keyword !== "ALL" ? { sortType: keyword } : {},
    );

  return (
    <MainLayout
      app={
        <MainPortfolioList
          pages={pages}
          hasNextPage={hasNextPage || false}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
      title={<MainTitle />}
      filter={<MainFilter keyword={keyword} setKeyword={setKeyword} />}
    />
  );
}
