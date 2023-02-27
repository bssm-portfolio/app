import { useState } from "react";
import { Portfolio } from "@/types/portfolio.interface";
import Image from "next/image";
import { CommentIcon, HeartIcon } from "@/components/Icon";
import { Avatar, Chip } from "@/components";
import { getKoreanDate, getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";
import classNames from "classnames";

interface PortfolioProps {
  portfolio: Portfolio;
  onClick?: () => void;
}

const countViewCss = `
  flex items-center gap-0.5 text-sm
`;

export default function PortfolioView({ portfolio, onClick }: PortfolioProps) {
  const [imageSrc, setImageSrc] = useState(
    getFileDownloadUrl(portfolio.thumbnail),
  );

  return (
    <div
      className="flex flex-col cursor-pointer w-[22.5rem] shadow p-[1.25rem]"
      onClick={onClick}
    >
      <div className="relative h-[11.25rem]">
        <Image
          className="rounded object-cover"
          src={imageSrc}
          alt="포트폴리오이미지"
          priority
          fill
          sizes="20rem"
          onError={() => {
            setImageSrc(
              "https://velog.velcdn.com/images/redjen/post/94ca451b-5a98-4882-96a5-81f028ff0801/image.jpg",
            );
          }}
        />
      </div>
      <div className="flex mt-3 mb-[3.125rem] ">
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={portfolio.writer.profileImageUrl}
              />
              <div className="flex-1">
                <div className="font-bold text-sm">{portfolio.title}</div>
                <div className="text-xs">
                  {portfolio.writer.name}
                  {portfolio.contributorList.length > 0
                    ? `외 ${portfolio.contributorList.length} 명`
                    : ""}
                </div>
                <Chip.Group className="mt-2 w-[14rem] h-[1.875rem]">
                  {portfolio.skillList.map((skill) => (
                    <Chip.Item key={skill.skillId}>{skill.skillName}</Chip.Item>
                  ))}
                </Chip.Group>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className={countViewCss}>
                <HeartIcon
                  className={classNames(
                    portfolio.bookmarkYn
                      ? "[&_path]:!fill-somago_yellow"
                      : undefined,
                    "mr-[0.1rem]",
                  )}
                />
                {portfolio.bookmarks}
              </div>
              <div className={countViewCss}>
                <CommentIcon className={classNames("mr-[0.1rem]")} />
                {portfolio.comments}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sxx mt-1">
        {`조회수 ${portfolio.views}회 · ${getTimeAgo(portfolio.createdDate)}`}
      </div>
    </div>
  );
}
