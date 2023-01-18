import { Portfolio } from "@/types/portfolio.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CheckBox from "../atoms/CheckBox";

interface DataGridProps {
  portfolioList: Portfolio[];
}

interface Selected {
  portfolioId: string;
  isSelected: boolean;
}

export default function DataGrid({ portfolioList }: DataGridProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Selected[]>([]);

  const selectPortfolio = (portfolioId: string) =>
    setSelected((prev) => [...prev, { portfolioId, isSelected: false }]);

  const moveToPortfolio = (portfolioId: number) =>
    router.push(`/portfolio/${portfolioId}`);

  return (
    <table className="w-full">
      <thead className="border-y border-y-primary-dark_gray">
        <tr>
          <th className="flex items-center py-6 pl-14 text-start">
            <CheckBox id="select-all" className="mr-3" />
            <label htmlFor="select-all">전체선택</label>
          </th>
          <th className="py-6 w-[7.75rem]">조회수</th>
          <th className="py-6 w-[7.75rem]">댓글</th>
          <th className="py-6 w-[7.75rem]">좋아요</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {portfolioList.map((portfolio) => (
          <tr key={portfolio.portfolioId}>
            <td className="flex items-center py-4 pl-14 text-start">
              <CheckBox
                value={portfolio.portfolioId}
                onChange={(event) => selectPortfolio(event.target.value)}
              />
              <div
                className="flex items-center cursor-pointer"
                onClick={() => moveToPortfolio(portfolio.portfolioId)}
              >
                <div className="relative w-[7.5rem] h-[4.2rem] mx-3">
                  <Image
                    className="object-cover rounded"
                    src="https://velog.velcdn.com/images/j1min/post/70786da5-54ae-44cc-a6c7-9e9c60751db0/image.png"
                    alt="펭수"
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
