import { Filter } from "@/types/portfolio.interface";
import classNames from "classnames";
import { Dispatch, SetStateAction, useReducer, useState } from "react";
import CheckBoxText from "../atoms/CheckBoxText";
import { DownIcon } from "../Icon";
import OrangeFilterIcon from "../Icon/OrangeFilterIcon";
import WhiteFilterIcon from "../Icon/WhiteFilterIcon";

interface SearchFilterProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const enum PropertyEnum {
  DATE_AN_HOUR_AGO = "AN_HOUR_AGO",
  DATE_TODAY = "TODAY",
  DATE_THIS_WEEK = "THIS_WEEK",
  DATE_THIS_MONTH = "THIS_MONTH",
  DATE_THIS_YEAR = "THIS_YEAR",
  GRADE_3 = "3",
  GRADE_2 = "2",
  GRADE_1 = "1",
  SORT_ALL = "ALL",
  SORT_UPLOAD_DATE = "UPLOAD_DATE",
  SORT_COMMENTS = "COMMENTS",
}

export default function SearchFilter({ filter, setFilter }: SearchFilterProps) {
  const [isOpen, toggleOpen] = useReducer((state) => !state, false);

  const datePropertyList = [
    {
      id: PropertyEnum.DATE_AN_HOUR_AGO,
      label: "지난 1시간",
      value: PropertyEnum.DATE_AN_HOUR_AGO,
    },
    {
      id: PropertyEnum.DATE_TODAY,
      label: "오늘",
      value: PropertyEnum.DATE_TODAY,
    },
    {
      id: PropertyEnum.DATE_THIS_WEEK,
      label: "이번 주",
      value: PropertyEnum.DATE_THIS_WEEK,
    },
    {
      id: PropertyEnum.DATE_THIS_MONTH,
      label: "이번 달",
      value: PropertyEnum.DATE_THIS_MONTH,
    },
    {
      id: PropertyEnum.DATE_THIS_YEAR,
      label: "올해",
      value: PropertyEnum.DATE_THIS_YEAR,
    },
  ];
  const gradePropertyList = [
    { id: PropertyEnum.GRADE_3, label: "3학년", value: PropertyEnum.GRADE_3 },
    { id: PropertyEnum.GRADE_2, label: "2학년", value: PropertyEnum.GRADE_2 },
    { id: PropertyEnum.GRADE_1, label: "1학년", value: PropertyEnum.GRADE_1 },
  ];
  const sortTypePropertyList = [
    {
      id: PropertyEnum.SORT_ALL,
      label: "전체",
      value: undefined,
    },
    {
      id: PropertyEnum.SORT_UPLOAD_DATE,
      label: "업로드순",
      value: PropertyEnum.SORT_UPLOAD_DATE,
    },
    {
      id: PropertyEnum.SORT_COMMENTS,
      label: "댓글순",
      value: PropertyEnum.SORT_COMMENTS,
    },
  ];

  const [selectedSortTypePropertyId, setSelectedSortTypePropertyId] =
    useState("");

  return (
    <div className="flex flex-col mb-small cursor-pointer text-white">
      <div className="flex items-center select-none" onClick={toggleOpen}>
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
              " [&>path]:!stroke-white !rotate-0": !isOpen,
            },
          )}
        />
      </div>

      {isOpen && (
        <div className="flex gap-32 my-8">
          <div className="flex flex-col">
            <h2 className="font-semibold">업로드 날짜</h2>
            <hr className="my-2.5 text-white w-40" />
            {datePropertyList.map(({ id, label, value }) => (
              <CheckBoxText
                name="uploadDateType"
                key={id}
                id={id}
                label={label}
                value={value}
                filter={filter}
                setFilter={setFilter}
                checkedId={selectedSortTypePropertyId}
                setCheckedId={setSelectedSortTypePropertyId}
              />
            ))}
          </div>
          <div>
            <h2 className="font-semibold">학년</h2>
            <hr className="my-2.5 text-white w-40" />
            {gradePropertyList.map(({ id, label, value }) => (
              <CheckBoxText
                name="schoolGrade"
                key={id}
                id={id}
                label={label}
                value={value}
                filter={filter}
                setFilter={setFilter}
                checkedId={selectedSortTypePropertyId}
                setCheckedId={setSelectedSortTypePropertyId}
              />
            ))}
          </div>
          <div>
            <h2 className="font-semibold">정렬기준</h2>
            <hr className="my-2.5 text-white w-40" />
            {sortTypePropertyList.map(({ id, label, value }) => (
              <CheckBoxText
                name="sortType"
                key={id}
                id={id}
                label={label}
                value={value}
                filter={filter}
                setFilter={setFilter}
                checkedId={selectedSortTypePropertyId}
                setCheckedId={setSelectedSortTypePropertyId}
              />
            ))}
          </div>
        </div>
      )}
      <hr className="text-white mt-3 mb-10" />
    </div>
  );
}
