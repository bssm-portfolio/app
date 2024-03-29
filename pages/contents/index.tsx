import DataGrid from "@/components/contents/DataGrid";
import DataGridTitle from "@/components/contents/DataGridTitle";
import useUser from "@/hooks/useUser";
import ChannelContentLayout from "@/layouts/ChannelContent";
import { useMyPortfolioList } from "@/models/portfolio";
import { Portfolio } from "@/types/portfolio.interface";
import { NextSeo, NextSeoProps } from "next-seo";
import { useEffect, useState } from "react";

export default function Home() {
  const { list: myPortfolioList, isError } = useMyPortfolioList();
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
  useUser({ authorizedPage: true });

  useEffect(() => {
    if (!isError) setPortfolioList(myPortfolioList);
  }, [myPortfolioList, isError]);

  const seoConfig: NextSeoProps = {
    title: "콘텐츠 관리",
    description: "내 포트폴리오를 관리하는 페이지입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <ChannelContentLayout
        title={<DataGridTitle />}
        datagrid={
          <DataGrid
            portfolioList={portfolioList}
            setPortfolioList={setPortfolioList}
          />
        }
      />
    </>
  );
}
