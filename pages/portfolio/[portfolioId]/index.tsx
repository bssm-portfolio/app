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
import { NextSeo, NextSeoProps } from "next-seo";
import { usePortfolio } from "@/models/portfolio";
import useUser from "@/hooks/useUser";

interface PortfolioIdPageProps {
  portfolio: Portfolio;
}

export default function PortfolioIdPage({ portfolio }: PortfolioIdPageProps) {
  const dateParsedPortfolio: Portfolio = getDateParsedData(portfolio);
  const type = dateParsedPortfolio.portfolioType;
  const {
    data: { bookmarkYn, followYn, bookmarks },
  } = usePortfolio(dateParsedPortfolio.portfolioId);
  const { user: userInfo } = useUser();

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
        detail={
          <AppDetail
            portfolio={dateParsedPortfolio}
            bookmarkYn={bookmarkYn}
            followYn={followYn}
            bookmarks={bookmarks}
            isMyPortfolio={
              userInfo.memberId === dateParsedPortfolio.writer.memberId
            }
          />
        }
        comment={
          <AppComment portfolioId={Number(dateParsedPortfolio.portfolioId)} />
        }
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
