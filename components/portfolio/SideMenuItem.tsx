import Image from "next/image";
import { getTimeAgo } from "@/utils/date";
import { usePortfolioList } from "@/models/portfolio";
import Chip from "../atoms/Chip";

export default function SideMenuItem() {
  const { data } = usePortfolioList();
  return (
    <div className="flex flex-col items-start xl:w-[26.25rem]">
      {data.map((portfolioData) => {
        return (
          <div
            className="w-full h-full flex m-2"
            key={portfolioData.portfolioId}
          >
            <Image
              className="rounded-xsmall"
              src={portfolioData.portfolioUrl}
              alt={portfolioData.title}
              width="320"
              height="180"
            />
            <div className="ml-3">
              <h2 className="font-bold text-middle mb-[.5rem]">
                {portfolioData.title}
              </h2>
              <span className="font-bold text-small block mb-xsmall">
                {portfolioData.writer.name}
              </span>
              <Chip.Group className="mb-xsmall">
                {portfolioData.skillList.map((skillData) => {
                  return <Chip.Item>{skillData}</Chip.Item>;
                })}
              </Chip.Group>
              <div className="text-xsmall">
                조회수 {portfolioData.views}회 ·{" "}
                {getTimeAgo(portfolioData.createdDate)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
