import { getKoreanDate } from "@/utils/date";
import type { Portfolio } from "@/types/portfolio.interface";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import Group from "../atoms/Group";
import { HeartIcon } from "../Icon";
import Description from "../portfolio/Description";

interface PortfolioDetailProps {
  portfolio: Portfolio;
}

export default function Detail({ portfolio }: PortfolioDetailProps) {
  return (
    <div className="mt-small">
      <div className="w-full h-full flex justify-between flex-col sm:flex-row">
        <div>
          <h2 className="font-bold text-large">{portfolio.title}</h2>
          <span>{portfolio.writer.name}</span>
          <Chip.Group className="mt-small">
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
              <HeartIcon className="mr-2xsmall" />
              <span className="text-small">{portfolio.bookmarks}</span>
            </Button>
            <Button status="active">
              <HeartIcon className="mr-2xsmall" />
              <span className="text-small">팔로잉</span>
            </Button>
            <Button status="active">
              <HeartIcon className="mr-2xsmall" />
              <span className="text-small">공유</span>
            </Button>
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
