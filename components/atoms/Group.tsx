import { PortfolioWriter } from "@/types/oauth.interface";
import classNames from "classnames";

interface GroupProps {
  names: PortfolioWriter[];
}

export default function Group({ names }: GroupProps) {
  return (
    <div className="inline rounded-[0.625rem] bg-primary-light_gray px-small py-xsmall">
      {names.map((data, idx) => {
        return (
          <span
            className={classNames("pr-base", "last:pr-0", {
              "font-bold": idx === 0,
            })}
            key={data.memberId}
          >
            {data.name}
          </span>
        );
      })}
    </div>
  );
}
