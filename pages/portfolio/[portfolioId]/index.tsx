import Head from "next/head";
import { AppLayout } from "@/layouts";
import {
  AppComment,
  AppDetail,
  PortfolioPlayer,
  AppSideMenu,
} from "@/components";
import type { GetServerSideProps } from "next";
import httpClient from "@/apis";
import { Portfolio } from "@/types/portfolio.interface";
import { getFileDownloadUrl } from "@/utils/file";
import { getDateParsedData } from "@/utils/date";
import { deepcopy } from "@/utils/data";
import { useRouter } from "next/router";
import { NextSeo, NextSeoProps } from "next-seo";

interface PortfolioIdPageProps {
  portfolio: Portfolio;
}

export default function Home({ portfolio }: PortfolioIdPageProps) {
  const dateParsedPortfolio: Portfolio = getDateParsedData(portfolio);
  const type = dateParsedPortfolio.portfolioType;
  const router = useRouter();
  const { portfolioId } = router.query;

  const seoConfig: NextSeoProps = {
    title: portfolio.title,
    description: portfolio.description,
    openGraph: {
      images: [
        {
          url: getFileDownloadUrl(portfolio.thumbnail),
          width: 320,
          height: 160,
          alt: portfolio.thumbnail.fileName,
        },
      ],
    },
  };

  return (
    <div>
      <NextSeo {...seoConfig} />
      <AppLayout
        app={
          <PortfolioPlayer
            url={
              type === "VIDEO"
                ? getFileDownloadUrl(dateParsedPortfolio.video)
                : dateParsedPortfolio.portfolioUrl
            }
            type={type}
          />
        }
        sidebar={<AppSideMenu />}
        detail={<AppDetail portfolio={dateParsedPortfolio} />}
        comment={<AppComment portfolioId={Number(portfolioId)} />}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { portfolioId } = context.query;
  if (Number.isNaN(Number(portfolioId)))
    return {
      notFound: true,
    };

  const portfolio = (
    await httpClient.portfolio.getById({ params: { id: portfolioId } })
  ).data;

  return {
    props: {
      portfolio: deepcopy(portfolio),
    },
  };
};
