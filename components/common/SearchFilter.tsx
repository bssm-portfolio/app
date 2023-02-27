import { Filter } from "@/types/portfolio.interface";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import CheckBoxText from "../atoms/CheckBoxText";
import { DownIcon } from "../Icon";
import OrangeFilterIcon from "../Icon/OrangeFilterIcon";
import WhiteFilterIcon from "../Icon/WhiteFilterIcon";

interface SearchFilterProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export default function SearchFilter({ filter, setFilter }: SearchFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  const dateRadioPropertyList = [
    { id: "AN_HOUR_AGO", label: "지난 1시간", value: "AN_HOUR_AGO" },
    { id: "TODAY", label: "오늘", value: "TODAY" },
    { id: "THIS_WEEK", label: "이번 주", value: "THIS_WEEK" },
    { id: "THIS_MONTH", label: "이번 달", value: "THIS_MONTH" },
    { id: "THIS_YEAR", label: "올해", value: "THIS_YEAR" },
  ];
  const gradeRadioPropertyList = [
    { id: "3", label: "3학년", value: "3" },
    { id: "2", label: "2학년", value: "2" },
    { id: "1", label: "1학년", value: "1" },
  ];
  const sortTypeRadioPropertyList = [
    { id: "ALL", label: "전체", value: "ALL" },
    { id: "UPLOAD_DATE", label: "업로드순", value: "UPLOAD_DATE" },
    { id: "COMMENTS", label: "댓글순", value: "COMMENTS" },
  ];

  return (
    <div className="flex flex-col mb-small cursor-pointer text-white">
      <div className="flex items-center select-none" onClick={handleClick}>
        {isOpen ? <OrangeFilterIcon /> : <WhiteFilterIcon />}

        <span
          className={classNames("block ml-3 text-middle text-somago_yellow", {
            "!text-white": !isOpen,
          })}
        >
          필터
        </span>
        <DownIcon
          className={classNames(
            "ml-3 mt-1 [&>path]:stroke-somago_yellow rotate-180",
            {
              " [&>path]:!stroke-white rotate-0": !isOpen,
            },
          )}
        />
      </div>
      {isOpen && (
        <div className="flex gap-32 my-8">
          <div className="flex flex-col">
            <h2 className="font-semibold">업로드 날짜</h2>
            <hr className="my-2.5 text-white w-40" />
            {dateRadioPropertyList.map((dateRadioProperty) => (
              <CheckBoxText
                name="uploadDateType"
                id={dateRadioProperty.id}
                label={dateRadioProperty.label}
                value={dateRadioProperty.value}
                key={dateRadioProperty.id}
                filter={filter}
                setFilter={setFilter}
              />
            ))}
          </div>
          <div>
            <h2 className="font-semibold">학년</h2>
            <hr className="my-2.5 text-white w-40" />
            {gradeRadioPropertyList.map(({ id, label, value }) => (
              <CheckBoxText
                name="schoolGrade"
                id={id}
                label={label}
                value={value}
                key={id}
                filter={filter}
                setFilter={setFilter}
              />
            ))}
          </div>
          <div>
            <h2 className="font-semibold">정렬기준</h2>
            <hr className="my-2.5 text-white w-40" />
            {sortTypeRadioPropertyList.map(({ id, label, value }) => (
              <CheckBoxText
                name="sortType"
                id={id}
                label={label}
                value={value}
                key={id}
                filter={filter}
                setFilter={setFilter}
                isSelect={
                  value === filter.sortType ||
                  (value === "ALL" &&
                    !["UPLOAD_DATE", "COMMENTS"].includes(
                      filter.sortType || "ALL",
                    ))
                }
              />
            ))}
          </div>
        </div>
      )}
      <hr className="text-white mt-3 mb-10" />
    </div>
  );
}
