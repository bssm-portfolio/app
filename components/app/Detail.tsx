import fixture from "@/fixtures";
import { getKoreanDate, getTimeAgo } from "@/utils/date";
import Image from "next/image";
import Button from "../atoms/DetailButton";
import Chip from "../atoms/Chip";
import Group from "../atoms/Group";
import { HeartIcon } from "../Icon";

export default function Detail() {
  const portfolioData = fixture.portfolio;
  const commentDataList = fixture.commentList;
  return (
    <div className="mt-[12px]">
      <div className="w-full h-full flex justify-between">
        <div>
          <h2 className="font-bold text-[20px]">{portfolioData.title}</h2>
          <span>{portfolioData.writer.name}</span>
          <Chip.Group className="mt-[12px]">
            {portfolioData.skillList.map((skillData) => {
              return <Chip.Item key={skillData}>{skillData}</Chip.Item>;
            })}
          </Chip.Group>
          <span className="block my-[12px]">
            조회수 {portfolioData.views}회 ·{" "}
            {getKoreanDate(portfolioData.createdDate)}
          </span>
        </div>

        <div>
          <div className="flex gap-[12px] mb-[16px]">
            <Button status="active">
              <HeartIcon className="mr-[6px]" />
              <span className="font-[12px]">{portfolioData.bookmarks}</span>
            </Button>
            <Button status="active">
              <HeartIcon className="mr-[6px]" />
              <span className="font-[12px]">팔로잉</span>
            </Button>
            <Button status="active">
              <HeartIcon className="mr-[6px]" />
              <span className="font-[12px]">공유</span>
            </Button>
          </div>

          <div className="mb-[21px]">
            <Group names={["참여자", "참여자1", "참여자2", "참여자3"]} />
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[12px] bg-[#F9F9F9] rounded">
        프로젝트 설명 및 사진 첨부
        <ul className="list-disc pl-[20px] py-[20px]">
          <li>글의 길이에 따라서 박스 크기 변동 </li>
          <li>프로젝트 기간 등 </li>
        </ul>
        글 또는 사진 첨부 가능
      </div>
      <div>
        <div className="flex mt-[16px]">
          <Image
            src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
            alt="프로필"
            width={40}
            height={40}
            className="rounded-full"
          />
          <input
            type="text"
            className="w-full ml-[16px] border-b-[1px] border-b-[#D9D9D9] outline-none"
            placeholder="댓글 추가.."
          />
        </div>
        <div className="mt-[36px]">
          {commentDataList.map((commentData) => {
            return (
              <div className="flex items-center mb-[32px]">
                <Image
                  className="rounded-full mr-[16px]"
                  src={commentData.userProfile}
                  alt="프로필 사진"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="flex items-center">
                    <h2 className="font-bold text-[12px] mr-[10px]">
                      {commentData.userName}
                    </h2>
                    ·{" "}
                    <span className="color-[#3A3A3A] text-[10px]">
                      {getTimeAgo(commentData.createdDate)}
                    </span>
                  </div>
                  <p className="text-[14px]">{commentData.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
