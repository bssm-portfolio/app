import { Portfolio } from "@/types/portfolio.interface";
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
import CheckBox from "../atoms/CheckBox";
import HamburgerIcon from "../Icon/HamburgerIcon";

interface DataGridProps {
  portfolioList: Portfolio[];
  setPortfolioList: Dispatch<SetStateAction<Portfolio[] | undefined>>;
}

export default function DataGrid({
  portfolioList,
  setPortfolioList,
}: DataGridProps) {
  const router = useRouter();
  const [checked, setChecked] = useState<number[]>([]);
  const [enabled, setEnabled] = useState(false);

  const handleSingleCheck = (isChecked: boolean, id: number) => {
    if (isChecked) setChecked((prev) => [...(prev as number[]), id]);
    else setChecked(checked.filter((checkedItem) => checkedItem !== id));
  };

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked)
      setChecked(portfolioList?.map((portfolio) => portfolio.portfolioId));
    else setChecked([]);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const dataGridItems = JSON.parse(
      JSON.stringify(portfolioList),
    ) as typeof portfolioList;

    const [targetItem] = dataGridItems.splice(source.index, 1);
    dataGridItems.splice(destination.index, 0, targetItem);
    setPortfolioList(dataGridItems);
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <table className="w-full">
      <thead className="border-y border-y-primary-border_gray">
        <tr>
          <th className="flex items-center py-6 pl-14 text-start">
            <CheckBox
              id="select-all"
              className="mr-3"
              onChange={(event) => handleAllCheck(event.target.checked)}
              checked={checked.length === portfolioList?.length}
            />
            <label htmlFor="select-all">전체선택</label>
          </th>
          <th className="py-6 w-[7.75rem]">조회수</th>
          <th className="py-6 w-[7.75rem]">댓글</th>
          <th className="py-6 w-[7.75rem]">좋아요</th>
        </tr>
      </thead>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo" direction="vertical">
          {(provided) => (
            <tbody
              className="text-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {portfolioList?.map((portfolio, idx) => (
                <Draggable
                  key={portfolio.portfolioId.toString()}
                  draggableId={portfolio.portfolioId.toString()}
                  index={idx}
                >
                  {(provided1) => (
                    <tr
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      className="relative border-b border-b-primary-border_gray select-none"
                    >
                      <td className="flex items-center py-4 pl-14 text-start">
                        <HamburgerIcon className="absolute left-[10px] top-2/4 -translate-y-2/4 cursor-pointer" />
                        <CheckBox
                          value={portfolio.portfolioId}
                          checked={checked.includes(portfolio.portfolioId)}
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
                      </td>
                      <td className="py-4 w-[7.75rem]">{portfolio.views}</td>
                      <td className="py-4 w-[7.75rem]">{portfolio.comments}</td>
                      <td className="py-4 w-[7.75rem]">
                        {portfolio.bookmarks}
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    </table>
  );
}
