import fixture from "@/fixtures";
import { getKoreanDate, getTimeAgo } from "@/utils/date";
import Image from "next/image";
import Chip from "./Chip";

export default function SideMenuItem() {
  return (
    <div>
      {fixture.portfolioList.map((data, idx) => {
        return (
          <div className="w-[400px] h-full shadow-md flex m-2" key={idx}>
            <Image
              className="rounded-[10px]"
              src={data.portfolioUrl}
              alt="dd"
              width={200}
              height={120}
            />
            <div className="ml-3">
              <h2 className="font-bold text-[14px] mb-[12px]">{data.title}</h2>
              <span className="font-bold text-[12px] block mb-2">
                {data.writer.name}
              </span>
              <Chip.Group className="mb-2">
                {data.skillList.map((skillData) => {
                  return <Chip.Item>{skillData}</Chip.Item>;
                })}
              </Chip.Group>
              <div className="mb-2">
                {getKoreanDate(data.createdDate)} ·{" "}
                {getTimeAgo(data.createdDate)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
