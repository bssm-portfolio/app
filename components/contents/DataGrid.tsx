import { Portfolio } from "@/types/portfolio.interface";
import { deepcopy, reorder } from "@/utils/data";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Button from "../atoms/Button";
import CheckBox from "../atoms/CheckBox";
import DataGridItem from "./DataGridItem";

interface DataGridProps {
  portfolioList: Portfolio[];
  setPortfolioList: Dispatch<SetStateAction<Portfolio[]>>;
}

export default function DataGrid({
  portfolioList,
  setPortfolioList,
}: DataGridProps) {
  const router = useRouter();
  const [checkedPortfolioIdList, setCheckedPortfolioIdList] = useState<
    number[]
  >([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSingleCheck = (isChecked: boolean, portfolioId: number) => {
    if (isChecked) {
      setCheckedPortfolioIdList((prev) => [...prev, portfolioId]);
      return;
    }
    setCheckedPortfolioIdList((prev) =>
      prev.filter((checked) => checked !== portfolioId),
    );
  };

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedPortfolioIdList(
        portfolioList.map((portfolio) => portfolio.portfolioId),
      );
      return;
    }
    setCheckedPortfolioIdList([]);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const dataGridList = deepcopy<Portfolio[]>(portfolioList);
    setPortfolioList(
      reorder<Portfolio>(dataGridList, source.index, destination.index),
    );
  };

  const getHeadCss = () => {
    return `grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem] 
    py-6 
    border-y 
    border-y-primary-border_gray 
    text-center`;
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setIsEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setIsEnabled(false);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div className={getHeadCss()}>
        <div />
        <span className="flex items-center pl-6 text-start select-none">
          <CheckBox
            id="select-all"
            className="mr-3"
            onChange={(event) => handleAllCheck(event.target.checked)}
            checked={checkedPortfolioIdList.length === portfolioList.length}
            label="전체선택"
          />
        </span>
        <span>조회수</span>
        <span>댓글</span>
        <span>좋아요</span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="contents" direction="vertical">
          {(droppableProvided) => (
            <div
              className="text-center"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {portfolioList.map((portfolio, idx) => (
                <DataGridItem
                  portfolio={portfolio}
                  checkedList={checkedPortfolioIdList}
                  handleSingleCheck={handleSingleCheck}
                  router={router}
                  key={portfolio.portfolioId}
                  idx={idx}
                />
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex justify-end mt-20">
          <Button className="bg-primary-dark_gray">삭제</Button>
        </div>
      </DragDropContext>
    </>
  );
}