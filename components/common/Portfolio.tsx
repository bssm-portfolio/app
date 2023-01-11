import { Portfolio } from "@/types/portfolio.interface";
import Image from "next/image";
import { CommentIcon, HeartIcon } from "@/components/Icon";
import { Chip } from "@/components";
import { getKoreanDate, getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";

interface PortfolioProps {
  portfolio: Portfolio;
  onClick?: () => void;
}

const countViewCss = `
  flex items-center gap-0.5 text-sm
`;

export default function PortfolioView({ portfolio, onClick }: PortfolioProps) {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <Image
        className="rounded"
        src={getFileDownloadUrl(portfolio.thumbnail)}
        alt="포트폴리오이미지"
        width={320}
        height={180}
        priority
      />
      <div className="flex w-full mt-3">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <div className="font-bold text-sm">{portfolio.title}</div>
            <div className="flex gap-3">
              <div className={countViewCss}>
                <HeartIcon />
                {portfolio.bookmarks}개
              </div>
              <div className={countViewCss}>
                <CommentIcon />
                {portfolio.comments}개
              </div>
            </div>
          </div>
          <div className="text-xs">
            {portfolio.writer.name}
            {portfolio.contributorList.length > 0
              ? `외 ${portfolio.contributorList.length} 명`
              : ""}
          </div>
        </div>
      </div>
      <Chip.Group className="mt-2">
        {portfolio.skillList.map((skill) => (
          <Chip.Item key={skill}>{skill}</Chip.Item>
        ))}
      </Chip.Group>
      <div className="text-sxx mt-1">
        {`${getKoreanDate(portfolio.createdDate)} · ${getTimeAgo(
          portfolio.createdDate,
        )}`}
      </div>
    </div>
  );
}
