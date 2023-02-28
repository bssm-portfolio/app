import config from "@/config";
import { Portfolio } from "@/types/portfolio.interface";
import { getFileDownloadUrl } from "@/utils/file";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Button from "../atoms/Button";
import CheckBox from "../atoms/CheckBox";
import HamburgerIcon from "../Icon/HamburgerIcon";

interface DataGridItemProps {
  portfolio: Portfolio;
  checkedList: number[];
  setCheckedPortfolioIdList: Dispatch<SetStateAction<number[]>>;
  idx: number;
}

export default function DataGridItem({
  portfolio,
  checkedList,
  setCheckedPortfolioIdList,
  idx,
}: DataGridItemProps) {
  const router = useRouter();

  const getBodyCss = () => {
    return `grid 
    grid-cols-[3.375rem_1fr_7.75rem_7.75rem_7.75rem_4.2rem] 
    items-center 
    py-4 
    border-b 
    border-b-primary-border_gray 
    select-none`;
  };

  const handleSingleCheck = (isChecked: boolean, portfolioId: number) => {
    if (isChecked) {
      setCheckedPortfolioIdList((prev) => [...prev, portfolioId]);
      return;
    }
    setCheckedPortfolioIdList((prev) =>
      prev.filter((checkedPortfolioId) => checkedPortfolioId !== portfolioId),
    );
  };

  const isCheckedSingle = (portfolioId: number) => {
    return checkedList.includes(portfolioId);
  };

  const [imageUrl, setImageUrl] = useState(
    getFileDownloadUrl(portfolio.thumbnail),
  );

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
              checked={isCheckedSingle(portfolio.portfolioId)}
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
                  src={imageUrl}
                  alt={portfolio.title}
                  fill
                  sizes="7.5rem"
                  onError={() => setImageUrl(config.defaultThumbnail)}
                />
              </div>
              <h2 className="font-bold">{portfolio.title}</h2>
            </div>
          </div>
          <span>{portfolio.views}</span>
          <span>{portfolio.comments}</span>
          <span>{portfolio.bookmarks}</span>
          <Button
            varient="secondary"
            className="!bg-white border border-black"
            onClick={() =>
              router.push(`/portfolio/${portfolio.portfolioId}/edit`)
            }
          >
            수정
          </Button>
        </div>
      )}
    </Draggable>
  );
}
