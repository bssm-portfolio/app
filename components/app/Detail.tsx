import ReactMarkdown from "react-markdown";
import fixture from "@/fixtures";
import { getKoreanDate } from "@/utils/date";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import Group from "../atoms/Group";
import { HeartIcon } from "../Icon";

export default function Detail() {
  const portfolioData = {
    ...fixture.portfolio,
    content: `프로젝트 설명 및 사진 첨부
  + 글의 길이에 따라서 박스 크기 변동 
  * 프로젝트 기간 등 

  글 또는 사진 첨부 가능`,
  };
  return (
    <div className="mt-small">
      <div className="w-full h-full flex justify-between flex-col sm:flex-row">
        <div>
          <h2 className="font-bold text-large">{portfolioData.title}</h2>
          <span>{portfolioData.writer.name}</span>
          <Chip.Group className="mt-small">
            {portfolioData.skillList.map((skillData) => {
              return <Chip.Item key={skillData}>{skillData}</Chip.Item>;
            })}
          </Chip.Group>
          <span className="block my-small">
            조회수 {portfolioData.views}회 ·{" "}
            {getKoreanDate(portfolioData.createdDate)}
          </span>
        </div>

        <div>
          <div className="flex gap-small mb-large">
            <Button status="active">
              <HeartIcon className="mr-2xsmall" />
              <span className="text-small">{portfolioData.bookmarks}</span>
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
            <Group names={["참여자", "참여자1", "참여자2", "참여자3"]} />
          </div>
        </div>
      </div>
      <div className="px-large py-small bg-primary-light_gray rounded">
        <ReactMarkdown>{portfolioData.content}</ReactMarkdown>
      </div>
    </div>
  );
}
