import { getKoreanDate } from "@/utils/date";
import { usePortfolio } from "@/models/portfolio";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import Group from "../atoms/Group";
import { HeartIcon } from "../Icon";
import Description from "../portfolio/Description";

export default function Detail() {
  const { data } = usePortfolio();
  return (
    <div className="mt-small">
      <div className="w-full h-full flex justify-between flex-col sm:flex-row">
        <div>
          <h2 className="font-bold text-large">{data.title}</h2>
          <span>{data.writer.name}</span>
          <Chip.Group className="mt-small">
            {data.skillList.map((skillData) => {
              return <Chip.Item key={skillData}>{skillData}</Chip.Item>;
            })}
          </Chip.Group>
          <span className="block my-small">
            조회수 {data.views}회 · {getKoreanDate(data.createdDate)}
          </span>
        </div>

        <div>
          <div className="flex gap-small mb-large">
            <Button status="active">
              <HeartIcon className="mr-2xsmall" />
              <span className="text-small">{data.bookmarks}</span>
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
            <Group names={data.contributorList} />
          </div>
        </div>
      </div>
      <Description description={data.description} />
    </div>
  );
}
