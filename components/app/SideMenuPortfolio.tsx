import { Portfolio } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { getFileDownloadUrl } from "@/utils/file";
import Image from "next/image";
import Chip from "../atoms/Chip";

interface SideMenuPortfolioProps {
  portfolio: Portfolio;
  onClick: () => void;
}

function SideMenuPortfolio({ portfolio, onClick }: SideMenuPortfolioProps) {
  return (
    <div
      className="w-full h-full flex m-2 cursor-pointer"
      key={portfolio.portfolioId}
      onClick={onClick}
    >
      <Image
        className="rounded-xsmall"
        src={getFileDownloadUrl(portfolio.thumbnail)}
        alt={portfolio.title}
        width="320"
        height="180"
      />
      <div className="ml-3">
        <h2 className="font-bold text-middle mb-[.5rem]">{portfolio.title}</h2>
        <span className="font-bold text-small block mb-xsmall">
          {portfolio.writer.name}
        </span>
        <Chip.Group className="mb-xsmall">
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

export default SideMenuPortfolio;
