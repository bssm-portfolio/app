import SearchFilter from "@/components/common/SearchFilter";
import PortfolioList from "@/components/portfolio/PortfolioList";
import SearchPageLayout from "@/layouts/Search";
import { Filter, SearchType } from "@/types/portfolio.interface";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>({});

  useEffect(() => {
    setFilter((prev) => ({
      keyword: router.query.keyword,
      searchType: router.query.searchType as SearchType,
      ...prev,
    }));
  }, [router.query]);

  const seoConfig: NextSeoProps = {
    title: `검색 결과 : ${router.query.keyword}`,
    description: `${router.query.keyword}에 대한 검색 결과입니다.`,
  };

  return (
    <div>
      <NextSeo {...seoConfig} />
      <SearchPageLayout
        filter={<SearchFilter filter={filter} setFilter={setFilter} />}
        portfolioList={<PortfolioList type="search" filter={filter} />}
      />
    </div>
  );
}
