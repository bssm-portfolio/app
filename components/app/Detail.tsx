import { getKoreanDate } from "@/utils/date";
import type { Portfolio } from "@/types/portfolio.interface";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import useOverlay from "@/hooks/useOverlay";
import config from "@/config";
import httpClient from "@/apis";
import { useQueryClient } from "@tanstack/react-query";
import KEY from "@/models/key";
import useUser from "@/hooks/useUser";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import MemberGroup from "../atoms/MemberGroup";
import Description from "../portfolio/Description";
import ShareIcon from "../Icon/ShareIcon";
import PeopleIcon from "../Icon/PeopleIcon";
import EmptyHeartIcon from "../Icon/EmptyHeartIcon";
import FilledHeartIcon from "../Icon/FilledHeartIcon";
import EditIcon from "../Icon/EditIcon";

interface PortfolioDetailProps {
  portfolio: Portfolio;
  bookmarkYn: boolean;
  followYn: boolean;
  isMyPortfolio: boolean;
  bookmarks: number;
}

export default function Detail({
  portfolio,
  bookmarkYn,
  followYn,
  isMyPortfolio,
  bookmarks,
}: PortfolioDetailProps) {
  const { openToast } = useOverlay();
  const { user: userInfo } = useUser();
  const router = useRouter();
  const url = `${config.clientUrl + router.asPath}`;
  const queryClient = useQueryClient();

  const handleLike = () => {
    httpClient.portfolio
      .bookmark({ portfolioId: portfolio.portfolioId })
      .then(() => queryClient.invalidateQueries([KEY.PORTFOLIO]))
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  const handleFollow = () => {
    httpClient.follow
      .post({ memberId: portfolio.writer.memberId })
      .then(() => queryClient.invalidateQueries([KEY.PORTFOLIO]))
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  const handleUnFollow = () => {
    httpClient.follow
      .unfollow({
        data: { memberId: portfolio.writer.memberId },
      })
      .then(() => queryClient.invalidateQueries([KEY.PORTFOLIO]))
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  const handleShare = () => {
    openToast("복사가 완료되었습니다.");
  };

  return (
    <div className="mt-small bg-white p-4 rounded">
      <div className="w-full h-full flex justify-between flex-col sm:flex-row">
        <div>
          <h2 className="font-bold text-large">
            <span className="text-blue">({portfolio.portfolioTheme}) </span>
            {portfolio.title}
          </h2>
          <span
            onClick={() => router.push(`/profile/${portfolio.writer.memberId}`)}
            className="cursor-pointer"
          >
            {portfolio.writer.name}
          </span>
          <Chip.Group className="mt-small" type="detail">
            {portfolio.skillList.map((skillData) => {
              return (
                <Chip.Item key={skillData.skillId}>
                  {skillData.skillName}
                </Chip.Item>
              );
            })}
          </Chip.Group>
          <span className="block my-small">
            조회수 {portfolio.views}회 · {getKoreanDate(portfolio.createdDate)}
          </span>
        </div>

        <div>
          <div className="flex justify-end gap-small mb-large">
            <Button status="active" onClick={handleLike}>
              {bookmarkYn ? (
                <FilledHeartIcon className="mr-2xsmall" />
              ) : (
                <EmptyHeartIcon className="mr-2xsmall" />
              )}
              <span className="text-small">{bookmarks}</span>
            </Button>

            {!isMyPortfolio ? (
              <Button
                status="active"
                onClick={followYn ? handleUnFollow : handleFollow}
                className={followYn ? "!bg-somago_yellow" : ""}
              >
                <PeopleIcon className="mr-2xsmall" />
                <span className="text-small">
                  {followYn ? "팔로잉" : "팔로우"}
                </span>
              </Button>
            ) : (
              <Button
                status="active"
                className="text-small"
                onClick={() => router.push(`${router.asPath}/edit`)}
              >
                <EditIcon className="mr-2xsmall w-4 h-4" />
                수정
              </Button>
            )}

            <CopyToClipboard text={url}>
              <Button status="active" onClick={handleShare}>
                <ShareIcon className="mr-2xsmall" />
                <span className="text-small">공유</span>
              </Button>
            </CopyToClipboard>
          </div>
          {portfolio.contributorList.length > 0 && (
            <div className="mb-large flex justify-end">
              <MemberGroup writers={[userInfo, ...portfolio.contributorList]} />
            </div>
          )}
        </div>
      </div>
      <Description description={portfolio.description} />
    </div>
  );
}
