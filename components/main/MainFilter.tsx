import { SortType } from "@/types/portfolio.interface";
import { Dispatch, SetStateAction } from "react";
import RadioButton from "../atoms/RadioButton";

interface RadioProperty {
  id: string;
  label: string;
  value: SortType;
}

export default function MainFilter({
  keyword,
  setKeyword,
}: {
  keyword: SortType;
  setKeyword: Dispatch<SetStateAction<SortType>>;
}) {
  const radioPropertyList: RadioProperty[] = [
    {
      id: "ALL",
      label: "전체",
      value: "ALL",
    },
    {
      id: "UPLOAD_DATE",
      label: "업로드일순",
      value: "UPLOAD_DATE",
    },
    {
      id: "COMMENTS",
      label: "댓글순",
      value: "COMMENTS",
    },
    {
      id: "BOOKMARKS",
      label: "추천순",
      value: "BOOKMARKS",
    },
    {
      id: "VIEWS",
      label: "조회수순",
      value: "VIEWS",
    },
  ];
  return (
    <div className="flex items-center justify-center gap-3 my-11">
      {radioPropertyList.map((radioProperty) => (
        <RadioButton
          name="main-radio"
          id={radioProperty.id}
          key={radioProperty.id}
          label={radioProperty.label}
          value={radioProperty.value}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      ))}
    </div>
  );
}
