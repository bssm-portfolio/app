import { Portfolio, PortfolioListType } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import Chip from "../atoms/Chip";

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
  return (
    <div
      className="w-full h-full flex m-2 cursor-pointer"
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
          sizes="10px"
          placeholder="blur"
          blurDataURL="https://velog.velcdn.com/images/redjen/post/94ca451b-5a98-4882-96a5-81f028ff0801/image.jpg"
          onError={() => {
            setImageSrc(
              "https://velog.velcdn.com/images/redjen/post/94ca451b-5a98-4882-96a5-81f028ff0801/image.jpg",
            );
          }}
        />
      </div>

      <div className="ml-3">
        <h2 className="font-bold text-middle mb-[.5rem]">{portfolio.title}</h2>
        <span className="font-bold text-small block mb-xsmall">
          {portfolio.writer.name}
        </span>
        <Chip.Group className="mb-xsmall" type={type}>
          {portfolio.skillList.map((skillData) => {
            return (
              <Chip.Item type={type} key={skillData.skillId}>
                {skillData.skillName}
              </Chip.Item>
            );
          })}
        </Chip.Group>
        <div className="text-xsmall">
          조회수 {portfolio.views}회 · {getTimeAgo(portfolio.createdDate)}
        </div>
      </div>
    </div>
  );
}
