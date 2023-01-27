import { Portfolio } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";
import Image from "next/image";
import Chip from "../atoms/Chip";

interface SideMenuPortfolioProps {
  portfolio: Portfolio;
  onClick: () => void;
}

export default function PortfolioItem({
  portfolio,
  onClick,
}: SideMenuPortfolioProps) {
  return (
    <div
      className="w-full h-full flex m-2 cursor-pointer"
      key={portfolio.portfolioId}
      onClick={onClick}
    >
      <div className="relative w-[320px] h-[180px] xl:w-[240px] xl:h-[135px]">
        <Image
          className="rounded-[0.625rem]"
          src={getFileDownloadUrl(portfolio.thumbnail)}
          alt={portfolio.title}
          fill
        />
      </div>

      <div className="ml-3">
        <h2 className="font-bold text-middle mb-[.5rem]">{portfolio.title}</h2>
        <span className="font-bold text-small block mb-xsmall">
          {portfolio.writer.name}
        </span>
        <Chip.Group className="mb-xsmall" type="portfolio">
          {portfolio.skillList.map((skillData) => {
            return <Chip.Item>{skillData}</Chip.Item>;
          })}
        </Chip.Group>
        <div className="text-xsmall">
          조회수 {portfolio.views}회 · {getTimeAgo(portfolio.createdDate)}
        </div>
      </div>
    </div>
  );
}
