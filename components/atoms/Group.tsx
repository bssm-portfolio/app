interface GroupProps {
  names: string[];
}

export default function Group({ names }: GroupProps) {
  return (
    <span className="rounded-[0.625rem] bg-primary-light_gray px-small py-xsmall">
      {names.map((data, idx) => {
        return (
          <span
            className={
              idx === 0 ? "font-bold pr-base last:pr-0" : "pr-base last:pr-0"
            }
            key={data}
          >
            {data}
          </span>
        );
      })}
    </span>
  );
}
