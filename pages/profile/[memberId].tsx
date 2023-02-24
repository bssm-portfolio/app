import Head from "next/head";
import type { GetServerSideProps } from "next";
import httpClient from "@/apis";
import { deepcopy } from "@/utils/data";
import { Member } from "@/types/member.interface";
import { usePortfolioListById } from "@/models/portfolio";
import { ProfilePagePortfolioList, ProfilePageProfile } from "@/components";
import { ProfilePageLayout } from "@/layouts";
import useUser from "@/hooks/useUser";
import { NextSeo, NextSeoProps } from "next-seo";

interface MemberIdPageProps {
  member: Member;
}

export default function Home({ member }: MemberIdPageProps) {
  const { list: portfolioList } = usePortfolioListById(member.memberId);
  const { user: userInfo } = useUser({ authorizedPage: true });

  const seoConfig: NextSeoProps = {
    title: `${userInfo.name}님의 정보`,
    description: `${userInfo.name}님의 정보 페이지입니다.`,
    openGraph: {
      images: [{ url: userInfo.profileImageUrl }],
    },
  };

  return (
    <div>
      <NextSeo {...seoConfig} />
      <ProfilePageLayout
        profile={
          <ProfilePageProfile
            userInfo={member}
            isMypage={userInfo.memberId === member.memberId}
          />
        }
        portfiloList={
          <ProfilePagePortfolioList
            portfolioList={portfolioList}
            isMypage={userInfo.memberId === member.memberId}
          />
        }
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { memberId } = context.query;
  if (Number.isNaN(Number(memberId)))
    return {
      notFound: true,
    };

  const member = (await httpClient.member.getById({ params: { id: memberId } }))
    .data;

  return {
    props: {
      member: deepcopy(member),
    },
  };
};
