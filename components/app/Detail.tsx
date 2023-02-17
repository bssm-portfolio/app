import { getKoreanDate } from "@/utils/date";
import type { Portfolio } from "@/types/portfolio.interface";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRef } from "react";
import useOverlay from "@/hooks/useOverlay";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import Group from "../atoms/Group";
import Description from "../portfolio/Description";
import EmptyHeartIcon from "../Icon/EmptyHeartIcon";
import ShareIcon from "../Icon/ShareIcon";
import PeopleIcon from "../Icon/PeopleIcon";

interface PortfolioDetailProps {
  portfolio: Portfolio;
}

export default function Detail({ portfolio }: PortfolioDetailProps) {
  const { openToast } = useOverlay();
  const handleShare = () => {
    openToast("복사가 완료되었습니다.");
  };
  const url = useRef(typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className="mt-small">
      <div className="w-full h-full flex justify-between flex-col sm:flex-row">
        <div>
          <h2 className="font-bold text-large">{portfolio.title}</h2>
          <span>{portfolio.writer.name}</span>
          <Chip.Group className="mt-small" type="detail">
            {portfolio.skillList.map((skillData) => {
              return <Chip.Item key={skillData}>{skillData}</Chip.Item>;
            })}
          </Chip.Group>
          <span className="block my-small">
            조회수 {portfolio.views}회 · {getKoreanDate(portfolio.createdDate)}
          </span>
        </div>

        <div>
          <div className="flex gap-small mb-large">
            <Button status="active">
              <EmptyHeartIcon className="mr-2xsmall" />
              <span className="text-small">{portfolio.bookmarks}</span>
            </Button>
            <Button status="active">
              <PeopleIcon className="mr-2xsmall" />
              <span className="text-small">팔로잉</span>
            </Button>
            <CopyToClipboard text={url.current}>
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
