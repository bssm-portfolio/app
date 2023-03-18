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

interface PortfolioIdPageProps {
  portfolio: Portfolio;
}

export default function PortfolioIdPage({ portfolio }: PortfolioIdPageProps) {
  const dateParsedPortfolio: Portfolio = getDateParsedData(portfolio);
  const type = dateParsedPortfolio.portfolioType;
  const {
    data: { bookmarkYn, followYn, bookmarks, views, recommendStatus },
  } = usePortfolio(dateParsedPortfolio.portfolioId);
  const { user: userInfo } = useUser();
  const isMyPortfolio =
    userInfo.memberId === dateParsedPortfolio.writer.memberId;

  useEffect(() => {
    if (typeof window !== "undefined") {
      httpClient.portfolioViewsAdd.put({ portfolioId: portfolio.portfolioId });
    }
  }, [portfolio.portfolioId]);

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
  try {
    const { data: portfolio } = context.params
      ? await httpClient.portfolio.getById({
          params: { id: context.params.portfolioId },
        })
      : { data: {} };

    return {
      props: {
        portfolio: deepcopy(portfolio),
      },
      revalidate: 6000,
    };
  } catch {
    return {
      redirect: {
        permanent: true,
        destination: "/403",
      },
      props: {},
    };
  }
};
