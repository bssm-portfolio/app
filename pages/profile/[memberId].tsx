import type { GetServerSideProps } from "next";
import httpClient from "@/apis";
import { deepcopy } from "@/utils/data";
import { Member } from "@/types/member.interface";
import { usePortfolioListById } from "@/models/portfolio";
import { ProfilePagePortfolioList, ProfilePageProfile } from "@/components";
import { ProfilePageLayout } from "@/layouts";
import useUser from "@/hooks/useUser";
import { NextSeo, NextSeoProps } from "next-seo";
import useMember from "@/models/member";

interface MemberIdPageProps {
  userInfo: Member;
}

export default function Home({ userInfo }: MemberIdPageProps) {
  const { user: myUserInfo } = useUser({ authorizedPage: true });
  const isMypage = myUserInfo.memberId === userInfo.memberId;
  const { list: portfolioList } = usePortfolioListById(
    userInfo.memberId,
    isMypage,
  );
  const {
    data: { followYn, followingCount, followerCount },
  } = useMember(userInfo.memberId);

  const seoConfig: NextSeoProps = {
    title: `${userInfo.name}님의 정보`,
    description: `${userInfo.name}님의 정보 페이지입니다.`,
    openGraph: {
      images: [{ url: userInfo.profileImageUrl }],
    },
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <ProfilePageLayout
        profile={
          <ProfilePageProfile
            userInfo={userInfo}
            isMypage={isMypage}
            followYn={followYn}
            followingCount={followingCount}
            followerCount={followerCount}
          />
        }
        portfiloList={
          <ProfilePagePortfolioList
            portfolioList={portfolioList}
            isMypage={isMypage}
          />
        }
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { memberId } = context.query;
  if (Number.isNaN(Number(memberId)))
    return {
      notFound: true,
    };

  const userInfo = (
    await httpClient.member.getById({ params: { id: memberId } })
  ).data;

  return {
    props: {
      userInfo: deepcopy(userInfo),
    },
  };
};
