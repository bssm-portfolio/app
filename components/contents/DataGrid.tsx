import httpClient from "@/apis";
import { RefetchType } from "@/types/index.interface";
import { Portfolio } from "@/types/portfolio.interface";
import { deepcopy, reorder } from "@/utils/data";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Button from "../atoms/Button";
import CheckBox from "../atoms/CheckBox";
import DataGridItem from "./DataGridItem";

interface DataGridProps {
  portfolioList: Portfolio[];
  setPortfolioList: Dispatch<SetStateAction<Portfolio[]>>;
  refetch: RefetchType;
}

export default function DataGrid({
  portfolioList,
  setPortfolioList,
  refetch,
}: DataGridProps) {
  const [checkedPortfolioIdList, setCheckedPortfolioIdList] = useState<
    number[]
  >([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const getPortfolioIdList = useCallback(
    () => portfolioList.map((portfolio) => portfolio.portfolioId),
    [portfolioList],
  );

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedPortfolioIdList(getPortfolioIdList());
      return;
    }
    setCheckedPortfolioIdList([]);
  };

  const isCheckedAll = () => {
    if (checkedPortfolioIdList.length === 0) return false;
    return checkedPortfolioIdList.length === portfolioList.length;
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const dataGridList = deepcopy<Portfolio[]>(portfolioList);
    setPortfolioList(
      reorder<Portfolio>(dataGridList, source.index, destination.index),
    );
    setIsChanged(true);
  };

  const getHeadCss = () => {
    return `
    grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem] 
    py-6 
    border-y 
    border-y-primary-border_gray 
    text-center`;
  };

  const handleDeleteButton = () => {
    Promise.all(
      checkedPortfolioIdList.map((checkedPortfolioId) =>
        httpClient.portfolio.delete({
          data: { portfolioId: checkedPortfolioId },
        }),
      ),
    ).then(() => {
      refetch();
      setCheckedPortfolioIdList([]);
    });
  };

  useEffect(() => {
    if (portfolioList.length !== 0 && isChanged) {
      httpClient.portfolio.sequence({ portfolioIdList: getPortfolioIdList() });
    }
  }, [portfolioList, getPortfolioIdList, isChanged]);

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
            checked={isCheckedAll()}
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
                  setCheckedPortfolioIdList={setCheckedPortfolioIdList}
                  key={portfolio.portfolioId}
                  idx={idx}
                />
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="flex justify-end mt-20">
          <Button
            className="!bg-primary-dark_gray"
            onClick={handleDeleteButton}
          >
            삭제
          </Button>
        </div>
      </DragDropContext>
    </>
  );
}
