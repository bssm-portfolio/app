import DataGrid from "@/components/contents/DataGrid";
import DataGridTitle from "@/components/contents/DataGridTitle";
import Filter from "@/components/contents/Filter";
import ChannelContentLayout from "@/layouts/ChannelContent";
import { useMyPortfolioList } from "@/models/portfolio";
import { Portfolio } from "@/types/portfolio.interface";
import { NextSeo, NextSeoProps } from "next-seo";
import { useEffect, useState } from "react";

export default function Home() {
  const { list, refetch } = useMyPortfolioList();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);

  useEffect(() => {
    setPortfolioList(list);
  }, [list]);

  const seoConfig: NextSeoProps = {
    title: "콘텐츠 관리",
    description: "내 포트폴리오를 관리하는 페이지입니다.",
  };

  return (
    <div>
      <NextSeo {...seoConfig} />
      <ChannelContentLayout
        title={<DataGridTitle />}
        filter={<Filter />}
        datagrid={
          <DataGrid
            portfolioList={portfolioList}
            setPortfolioList={setPortfolioList}
            refetch={refetch}
          />
        }
      />
    </div>
  );
}
