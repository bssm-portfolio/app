import Filter from "@/components/contents/Filter";
import PortfolioList from "@/components/portfolio/PortfolioList";
import SearchPageLayout from "@/layouts/Search";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    setKeyword((router.query.keyword as string) || "");
  }, [router.query]);

  const seoConfig: NextSeoProps = {
    title: `검색 결과 : ${keyword}`,
    description: `${keyword}에 대한 검색 결과입니다.`,
  };

  return (
    <div>
      <NextSeo {...seoConfig} />
      <SearchPageLayout
        filter={<Filter />}
        portfolioList={<PortfolioList keyword={keyword} />}
      />
    </div>
  );
}
