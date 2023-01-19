import { Portfolio } from "@/types/portfolio.interface";
import { getParsedDataGridItems } from "@/utils/data";
import { getFileDownloadUrl } from "@/utils/file";
import Image from "next/image";
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
import HamburgerIcon from "../Icon/HamburgerIcon";

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

  const handleSingleCheck = (isChecked: boolean, id: number) => {
    if (isChecked) setCheckedList((prev) => [...(prev as number[]), id]);
    else
      setCheckedList((prev) =>
        prev.filter((checkedItem) => checkedItem !== id),
      );
  };

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked)
      setCheckedList(portfolioList.map((portfolio) => portfolio.portfolioId));
    else setCheckedList([]);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const dataGridItems: Portfolio[] = getParsedDataGridItems(portfolioList);

    const [targetItem] = dataGridItems.splice(source.index, 1);
    dataGridItems.splice(destination.index, 0, targetItem);
    setPortfolioList(dataGridItems);
  };

  const getHeadCss = () => {
    return `grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem] 
    py-6 
    border-y 
    border-y-primary-border_gray 
    text-center`;
  };
  const getBodyCss = () => {
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
                      <HamburgerIcon className="cursor-pointer ml-8" />
                      <div className="flex items-center pl-6 text-start">
                        <CheckBox
                          value={portfolio.portfolioId}
                          checked={checkedList.includes(portfolio.portfolioId)}
                          onChange={(event) =>
                            handleSingleCheck(
                              event.target.checked,
                              portfolio.portfolioId,
                            )
                          }
                        />
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() =>
                            router.push(`/portfolio/${portfolio.portfolioId}`)
                          }
                        >
                          <div className="relative w-[7.5rem] h-[4.2rem] mx-3">
                            <Image
                              className="object-cover rounded"
                              src={getFileDownloadUrl(portfolio.thumbnail)}
                              alt={portfolio.title}
                              fill
                            />
                          </div>
                          <h2 className="font-bold">{portfolio.title}</h2>
                        </div>
                      </div>
                      <span>{portfolio.views}</span>
                      <span>{portfolio.comments}</span>
                      <span>{portfolio.bookmarks}</span>
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
