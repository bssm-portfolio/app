import { Portfolio } from "@/types/portfolio.interface";
import { getFileDownloadUrl } from "@/utils/file";
import Image from "next/image";
import { NextRouter } from "next/router";
import { Draggable } from "react-beautiful-dnd";
import CheckBox from "../atoms/CheckBox";
import HamburgerIcon from "../Icon/HamburgerIcon";

interface DataGridItemProps {
  portfolio: Portfolio;
  checkedList: number[];
  handleSingleCheck: (isChecked: boolean, portfolioId: number) => void;
  router: NextRouter;
  idx: number;
}

export default function DataGridItem({
  portfolio,
  checkedList,
  handleSingleCheck,
  router,
  idx,
}: DataGridItemProps) {
  const getBodyCss = (): string => {
    return `grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem] 
    items-center 
    py-4 
    border-b 
    border-b-primary-border_gray 
    select-none`;
  };

  return (
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
                handleSingleCheck(event.target.checked, portfolio.portfolioId)
              }
            />
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
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
  );
}
