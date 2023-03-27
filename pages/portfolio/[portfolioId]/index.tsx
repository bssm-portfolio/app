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
import useWindow from "@/hooks/useWindow";

interface PortfolioIdPageProps {
  portfolio: Portfolio;
  portfolioId: number;
  is403: boolean;
}

export default function PortfolioIdPage({
  portfolio,
  portfolioId,
  is403,
}: PortfolioIdPageProps) {
  const { data: csrPortfolio } = usePortfolio(portfolioId);
  const { user: userInfo, isLogined } = useUser();
  const { isWindow } = useWindow();
  const isMyPortfolio =
    userInfo.memberId === csrPortfolio.writer.memberId && isLogined;

  const dateParsedPortfolio: Portfolio = getDateParsedData(
    !isMyPortfolio ? portfolio : csrPortfolio,
  );
  const type = dateParsedPortfolio.portfolioType;

  useEffect(() => {
    if (isWindow && !is403) {
      httpClient.portfolioViewsAdd.put({ portfolioId: portfolio.portfolioId });
    }
  }, [portfolio.portfolioId, is403, isWindow]);

  if (is403 && !isMyPortfolio) {
    return <Page403 />;
  }

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
                ? dateParsedPortfolio.video
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
            bookmarkYn={csrPortfolio.bookmarkYn}
            followYn={csrPortfolio.followYn}
            bookmarks={csrPortfolio.bookmarks}
            views={csrPortfolio.views}
            isMyPortfolio={isMyPortfolio}
            recommendStatus={csrPortfolio.recommendStatus}
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
  const portfolioId = context.params ? context.params.portfolioId : 0;
  const { data: portfolio, is403 } = await httpClient.portfolio
    .getById({
      params: { id: portfolioId },
    })
    .then((r) => ({ is403: false, data: deepcopy(r.data) }))
    .catch(() => ({ is403: true, data: {} }));

  return {
    props: {
      portfolio,
      portfolioId,
      is403,
    },
    revalidate: 6000,
  };
};
