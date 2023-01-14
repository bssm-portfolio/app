import Image from "next/image";
import { getTimeAgo } from "@/utils/date";
import { usePortfolioList } from "@/models/portfolio";
import { getFileDownloadUrl } from "@/utils/file";
import Chip from "../atoms/Chip";

export default function SideMenuItem() {
  const { list } = usePortfolioList();
  return (
    <div className="flex flex-col items-start">
      {list.map((portfolio) => {
        return (
          <div className="w-full h-full flex my-2" key={portfolio.portfolioId}>
            <Image
              className="rounded-[0.625rem] object-cover xl:!w-[15rem] xl:!h-[8.4rem]"
              src={getFileDownloadUrl(portfolio.thumbnail)}
              alt={portfolio.title}
              width={320}
              height={180}
            />
            <div className="ml-3">
              <h2 className="font-bold text-middle mb-[.5rem]">
                {portfolio.title}
              </h2>
              <span className="font-bold text-small block mb-xsmall">
                {portfolio.writer.name}
              </span>
              <Chip.Group>
                {portfolio.skillList.map((skillData) => {
                  return <Chip.Item key={skillData}>{skillData}</Chip.Item>;
                })}
              </Chip.Group>
              <span className="text-xsmall">
                조회수 {portfolio.views}회 · {getTimeAgo(portfolio.createdDate)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
