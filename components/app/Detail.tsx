import { getKoreanDate } from "@/utils/date";
import type { Portfolio } from "@/types/portfolio.interface";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import useOverlay from "@/hooks/useOverlay";
import config from "@/config";
import httpClient from "@/apis";
import KEY from "@/models/key";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import Group from "../atoms/Group";
import Description from "../portfolio/Description";
import ShareIcon from "../Icon/ShareIcon";
import PeopleIcon from "../Icon/PeopleIcon";
import EmptyHeartIcon from "../Icon/EmptyHeartIcon";
import FilledHeartIcon from "../Icon/FilledHeartIcon";

interface PortfolioDetailProps {
  portfolio: Portfolio;
}

export default function Detail({ portfolio }: PortfolioDetailProps) {
  const { openToast } = useOverlay();
  const router = useRouter();
  const url = `${config.clientUrl + router.asPath}`;
  const queryClient = useQueryClient();

  const handleLike = () => {
    httpClient.portfolio.bookmark({ portfolioId: portfolio.portfolioId });
  };

  const handleFollow = () => {
    httpClient.portfolio.bookmark({ portfolioId: portfolio.portfolioId });
  };

  const handleShare = () => {
    openToast("복사가 완료되었습니다.");
  };

  return (
    <div className="mt-small">
      <div className="w-full h-full flex justify-between flex-col sm:flex-row">
        <div>
          <h2 className="font-bold text-large">{portfolio.title}</h2>
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
          <div className="flex gap-small mb-large">
            <Button status="active" onClick={handleLike}>
              {portfolio.bookmarkYn ? (
                <FilledHeartIcon className="mr-2xsmall" />
              ) : (
                <EmptyHeartIcon className="mr-2xsmall" />
              )}
              <span className="text-small">{portfolio.bookmarks}</span>
            </Button>
            <Button status="active">
              <PeopleIcon className="mr-2xsmall" />
              <span className="text-small">팔로잉</span>
            </Button>
            <CopyToClipboard text={url}>
              <Button status="active" onClick={handleShare}>
                <ShareIcon className="mr-2xsmall" />
                <span className="text-small">공유</span>
              </Button>
            </CopyToClipboard>
          </div>

          <div className="mb-large">
            <Group names={portfolio.contributorList} />
          </div>
        </div>
      </div>
      <Description description={portfolio.description} />
    </div>
  );
}
