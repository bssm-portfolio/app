import { useEffect } from "react";
import { AppLayout } from "@/layouts";
import {
  AppComment,
  AppDetail,
  PortfolioPlayer,
  AppSideMenu,
} from "@/components";
import type { GetStaticProps } from "next";
import httpClient from "@/apis";
import { Portfolio } from "@/types/portfolio.interface";
import { getFileDownloadUrl } from "@/utils/file";
import { getDateParsedData } from "@/utils/date";
import { deepcopy } from "@/utils/data";
import { NextSeo, NextSeoProps } from "next-seo";
import { usePortfolio } from "@/models/portfolio";
import useUser from "@/hooks/useUser";
import PortfolioTitle from "@/components/app/PortfolioTitle";
import Page403 from "@/pages/403";

interface PortfolioIdPageProps {
  portfolio: Portfolio;
  is403: boolean;
}

export default function PortfolioIdPage({
  portfolio,
  is403,
}: PortfolioIdPageProps) {
  const dateParsedPortfolio: Portfolio = getDateParsedData(portfolio);
  const type = dateParsedPortfolio.portfolioType;
  const {
    data: { bookmarkYn, followYn, bookmarks, views, recommendStatus },
  } = usePortfolio(dateParsedPortfolio.portfolioId);
  const { user: userInfo } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined" && !is403) {
      httpClient.portfolioViewsAdd.put({ portfolioId: portfolio.portfolioId });
    }
  }, [portfolio.portfolioId, is403]);

  if (is403) {
    return <Page403 />;
  }

  const isMyPortfolio =
    userInfo.memberId === dateParsedPortfolio.writer.memberId;

  const seoConfig: NextSeoProps = {
    title: dateParsedPortfolio.title,
    description: dateParsedPortfolio.description,
    openGraph: {
      images: [
        {
          url: getFileDownloadUrl(dateParsedPortfolio.thumbnail),
          width: 320,
          height: 160,
          alt: dateParsedPortfolio.thumbnail.fileName,
        },
      ],
    },
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <AppLayout
        title={<PortfolioTitle />}
        app={
          <PortfolioPlayer
            videoUrl={
              dateParsedPortfolio.portfolioType !== "URL"
                ? getFileDownloadUrl(dateParsedPortfolio.video)
                : undefined
            }
            portfolioUrl={
              dateParsedPortfolio.portfolioType !== "VIDEO"
                ? dateParsedPortfolio.portfolioUrl
                : undefined
            }
            type={type}
          />
        }
        sidebar={<AppSideMenu />}
        detail={
          <AppDetail
            portfolio={dateParsedPortfolio}
            bookmarkYn={bookmarkYn}
            followYn={followYn}
            bookmarks={bookmarks}
            views={views}
            isMyPortfolio={isMyPortfolio}
            recommendStatus={recommendStatus}
          />
        }
        comment={
          <AppComment portfolioId={Number(dateParsedPortfolio.portfolioId)} />
        }
      />
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: portfolio, is403 } = await httpClient.portfolio
    .getById({
      params: { id: context.params ? context.params.portfolioId : 0 },
    })
    .then((r) => ({ is403: false, data: deepcopy(r.data) }))
    .catch(() => ({ is403: true, data: {} }));
  return {
    props: {
      portfolio,
      is403,
    },
    revalidate: 6000,
  };
};
