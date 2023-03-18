import SearchFilter from "@/components/common/SearchFilter";
import PortfolioList from "@/components/portfolio/PortfolioList";
import SearchPageLayout from "@/layouts/Search";
import { Filter, SearchType } from "@/types/portfolio.interface";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>({ searchType: "TITLE" });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      search: router.query.keyword as string,
      searchType: (router.query.searchType as SearchType) || "TITLE",
    }));
  }, [router.query]);

  const seoConfig: NextSeoProps = {
    title: `검색 결과 : ${router.query.keyword}`,
    description: `${router.query.keyword}에 대한 검색 결과입니다.`,
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <SearchPageLayout
        filter={<SearchFilter filter={filter} setFilter={setFilter} />}
        portfolioList={<PortfolioList type="search" filter={filter} />}
      />
    </>
  );
}
