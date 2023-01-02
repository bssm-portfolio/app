import classNames from "classnames";

interface GroupProps {
  names: string[];
}

export default function Group({ names }: GroupProps) {
  return (
    <span className="rounded-[0.625rem] bg-primary-light_gray px-small py-xsmall">
      {names.map((data, idx) => {
        return (
          <span
            className={classNames("pr-base", "last:pr-0", {
              "font-bold": idx === 0,
            })}
            key={data}
          >
            {data}
          </span>
        );
      })}
    </span>
  );
}
