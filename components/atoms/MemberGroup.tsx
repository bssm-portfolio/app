import { PortfolioWriter } from "@/types/member.interface";
import classNames from "classnames";
import { useRouter } from "next/router";

interface MemberGroupProps {
  writers: PortfolioWriter[];
}

export default function MemberGroup({ writers }: MemberGroupProps) {
  const router = useRouter();
  return (
    <div className="inline-flex flex-wrap ml-2 rounded-[0.625rem] bg-primary-light_gray px-small py-xsmall">
      {writers.map((data, idx) => {
        return (
          <span
            className={classNames(
              "pr-base cursor-pointer whitespace-nowrap",
              "last:pr-0",
              {
                "font-bold": idx === 0,
              },
            )}
            key={data.memberId}
            onClick={() => {
              router.push(`/profile/${data.memberId}`);
            }}
          >
            {data.name}
          </span>
        );
      })}
    </div>
  );
}
