import Image from "next/image";
import { getTimeAgo } from "@/utils/date";
import { usePortfolioList } from "@/models/portfolio";
import Chip from "../atoms/Chip";

export default function SideMenuItem() {
  const { data } = usePortfolioList();
  return (
    <div className="flex flex-col items-start xl:w-[26.25rem]">
      {data.map((portfolio) => {
        return (
          <div className="w-full h-full flex m-2" key={portfolio.portfolioId}>
            <Image
              className="rounded-xsmall"
              src={portfolio.portfolioUrl}
              alt={portfolio.title}
              width="320"
              height="180"
            />
            <div className="ml-3">
              <h2 className="font-bold text-middle mb-[.5rem]">
                {portfolio.title}
              </h2>
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
      })}
    </div>
  );
}
