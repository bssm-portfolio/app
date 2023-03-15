import { useState } from "react";
import { Portfolio } from "@/types/portfolio.interface";
import Image from "next/image";
import { CommentIcon, HeartIcon } from "@/components/Icon";
import { Avatar } from "@/components";
import { getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";
import classNames from "classnames";
import config from "@/config";
import ChipGroup from "../atoms/ChipGroup";
import RecommendIcon from "../Icon/RecommendIcon";

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
      className="flex flex-col flex-1 cursor-pointer min-w-[22.5rem] max-w-[22.5rem] shadow p-[1.25rem] rounded-lg bg-white"
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
          onError={() => setImageSrc(config.defaultThumbnail)}
        />
      </div>
      <div className="mt-3 mb-[3.125rem]">
        <div className="flex justify-between">
          <div className="flex gap-4 items-start">
            <Avatar
              width={40}
              height={40}
              imageUrl={portfolio.writer.profileImageUrl}
            />
            <div className="flex-1">
              <div className="font-bold text-sm line-clamp-2 break-all">
                {portfolio.title}
              </div>
              <div className="text-xs">
                {portfolio.writer.name}
                {portfolio.contributorList.length > 0
                  ? `외 ${portfolio.contributorList.length} 명`
                  : ""}
              </div>
              <ChipGroup skillList={portfolio.skillList} />
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

      <div className="flex text-sxx mt-auto mb-0 gap-[0.625rem]">
        {portfolio.recommendStatus === "RECOMMEND" && (
          <div className="flex gap-[0.25rem] text-blue font-bold">
            <RecommendIcon />
            [추천 프로젝트]
          </div>
        )}
        {`조회수 ${portfolio.views}회 · ${getTimeAgo(portfolio.createdDate)}`}
      </div>
    </div>
  );
}
