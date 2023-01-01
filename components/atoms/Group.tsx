interface GroupProps {
  names: string[];
}

// 해당 컴포넌트의 span의 스타일에서 아마도 더 좋은 방법이 있지 않을 까 하는데 방법을 도저히 모르겠습니다. 조언 부탁드립니다!
// (pr-[16px] last:pr-0 부분이 겹치는게 매우 거슬립니다. 하지만 어떻게 개선할 수 있을지 도저히 모르겠습니다.)

export default function Group({ names }: GroupProps) {
  return (
    <span className="block rounded-[10px] bg-[#F9F9F9] px-[12px] py-[10px]">
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
