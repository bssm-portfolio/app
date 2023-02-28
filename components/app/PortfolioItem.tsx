import config from "@/config";
import { Portfolio, PortfolioListType } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import Chip from "../atoms/Chip";
import { CommentIcon, HeartIcon } from "../Icon";

interface SideMenuPortfolioProps {
  portfolio: Portfolio;
  onClick: () => void;
  type: PortfolioListType;
}

export default function PortfolioItem({
  portfolio,
  onClick,
  type,
}: SideMenuPortfolioProps) {
  const [imageSrc, setImageSrc] = useState(
    getFileDownloadUrl(portfolio.thumbnail),
  );
  const countViewCss = `
    flex items-center gap-0.5 text-xs
  `;

  return (
    <div
      className={classNames("w-full h-full flex mt-3 cursor-pointer", {
        "bg-white p-2.5 rounded-[0.625rem] shadow-lg":
          type === "search" || "portfolio",
      })}
      key={portfolio.portfolioId}
      onClick={onClick}
    >
      <div
        className={classNames("relative w-[20rem] h-[11.25rem]", {
          "xl:w-[15rem] xl:h-[8.4375rem]": type === "portfolio",
        })}
      >
        <Image
          className="rounded-[0.625rem]"
          src={imageSrc}
          alt={portfolio.title}
          sizes="15rem"
          fill
          priority
          onError={() => setImageSrc(config.defaultThumbnail)}
        />
      </div>

      <div className="ml-4">
        <h2
          className={classNames("font-bold text-middle mb-[.5rem]", {
            "!text-lg": type === "search",
          })}
        >
          {portfolio.title}
        </h2>
        <span
          className={classNames("font-bold text-small block", {
            "!text-base": type === "search",
          })}
        >
          {portfolio.writer.name}
        </span>
        {portfolio.skillList.length > 0 && (
          <Chip.Group className="my-2" type={type}>
            {portfolio.skillList.map((skillData) => {
              return (
                <Chip.Item type={type} key={skillData.skillId}>
                  {skillData.skillName}
                </Chip.Item>
              );
            })}
          </Chip.Group>
        )}
        <div className="text-xs mt-3">
          조회수 {portfolio.views}회 · {getTimeAgo(portfolio.createdDate)}
        </div>

        {type === "search" && (
          <div className="flex gap-3 mt-4">
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
        )}
      </div>
    </div>
  );
}
