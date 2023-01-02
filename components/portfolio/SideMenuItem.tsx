import Image from "next/image";
import fixture from "@/fixtures";
import { getTimeAgo } from "@/utils/date";
import Chip from "../atoms/Chip";

export default function SideMenuItem() {
  return (
    <div className="flex flex-col items-start xl:w-[26.25rem]">
      {fixture.portfolioList.map((data) => {
        return (
          <div className="w-full h-full flex m-2" key={data.portfolioId}>
            <Image
              className="rounded-xsmall"
              src={data.portfolioUrl}
              alt={data.title}
              width="240"
              height="135"
              style={{ objectFit: "cover" }}
            />
            <div className="ml-3">
              <h2 className="font-bold text-middle mb-[.5rem]">{data.title}</h2>
              <span className="font-bold text-small block mb-xsmall">
                {data.writer.name}
              </span>
              <Chip.Group className="mb-xsmall">
                {data.skillList.map((skillData) => {
                  return <Chip.Item>{skillData}</Chip.Item>;
                })}
              </Chip.Group>
              <div className="text-xsmall">
                조회수 {data.views}회 · {getTimeAgo(data.createdDate)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
