import { Portfolio } from "@/types/portfolio.interface";
import { getFileDownloadUrl } from "@/utils/file";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckBox from "../atoms/CheckBox";
import HamburgerIcon from "../Icon/HamburgerIcon";

interface DataGridProps {
  portfolioList: Portfolio[];
}

export default function DataGrid({ portfolioList }: DataGridProps) {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleSingleCheck = (isChecked: boolean, id: number) => {
    if (isChecked) setCheckedItems((prev) => [...prev, id]);
    else setCheckedItems(checkedItems.filter((el) => el !== id));
  };

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked)
      setCheckedItems(portfolioList.map((portfolio) => portfolio.portfolioId));
    else setCheckedItems([]);
  };

  return (
    <table className="w-full">
      <thead className="border-y border-y-primary-border_gray">
        <tr>
          <th className="flex items-center py-6 pl-14 text-start">
            <CheckBox
              id="select-all"
              className="mr-3"
              onChange={(event) => handleAllCheck(event.target.checked)}
              checked={checkedItems.length === portfolioList.length}
            />
            <label htmlFor="select-all">전체선택</label>
          </th>
          <th className="py-6 w-[7.75rem]">조회수</th>
          <th className="py-6 w-[7.75rem]">댓글</th>
          <th className="py-6 w-[7.75rem]">좋아요</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {portfolioList?.map((portfolio) => (
          <tr
            key={portfolio.portfolioId}
            className="relative border-b border-b-primary-border_gray select-none"
          >
            <HamburgerIcon className="absolute left-[10px] top-2/4 -translate-y-2/4 cursor-pointer" />
            <td className="flex items-center py-4 pl-14 text-start">
              <CheckBox
                value={portfolio.portfolioId}
                checked={checkedItems.includes(portfolio.portfolioId)}
                onChange={(event) =>
                  handleSingleCheck(event.target.checked, portfolio.portfolioId)
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
            <td className="py-4 w-[7.75rem]">{portfolio.bookmarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
