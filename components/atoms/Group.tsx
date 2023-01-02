interface GroupProps {
  names: string[];
}

export default function Group({ names }: GroupProps) {
  return (
    <span className="rounded-[10px] bg-primary-light_gray px-[12px] py-[10px]">
      {names.map((data, idx) => {
        return (
          <span
            className={
              idx === 0
                ? "font-bold pr-[16px] last:pr-0"
                : "pr-[16px] last:pr-0"
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
