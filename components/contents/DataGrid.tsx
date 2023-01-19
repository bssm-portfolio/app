import { Portfolio } from "@/types/portfolio.interface";
import { getParsedDataGridList } from "@/utils/data";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
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
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSingleCheck = (isChecked: boolean, portfolioId: number): void => {
    if (isChecked)
      setCheckedList((prev) => [...(prev as number[]), portfolioId]);
    else
      setCheckedList((prev) =>
        prev.filter((checkedItem) => checkedItem !== portfolioId),
      );
  };

  const handleAllCheck = (isChecked: boolean): void => {
    if (isChecked)
      setCheckedList(portfolioList.map((portfolio) => portfolio.portfolioId));
    else setCheckedList([]);
  };

  const onDragEnd = ({ source, destination }: DropResult): void => {
    if (!destination) return;
    const dataGridList: Portfolio[] = getParsedDataGridList(portfolioList);
    const [targetItem] = dataGridList.splice(source.index, 1);
    dataGridList.splice(destination.index, 0, targetItem);
    setPortfolioList(dataGridList);
  };

  const getHeadCss = (): string => {
    return `grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem] 
    py-6 
    border-y 
    border-y-primary-border_gray 
    text-center`;
  };

  const getBodyCss = (): string => {
    return `grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem] 
    items-center 
    py-4 
    border-b 
    border-b-primary-border_gray 
    select-none`;
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
            checked={checkedList.length === portfolioList.length}
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
                <Draggable
                  key={portfolio.portfolioId.toString()}
                  draggableId={portfolio.portfolioId.toString()}
                  index={idx}
                >
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={getBodyCss()}
                    >
                      <DataGridItem
                        portfolio={portfolio}
                        checkedList={checkedList}
                        handleSingleCheck={handleSingleCheck}
                        router={router}
                      />
                    </div>
                  )}
                </Draggable>
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
