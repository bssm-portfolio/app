import { Portfolio } from "@/types/portfolio.interface";

export const getParsedDataGridList = (portfolioList: Portfolio[]) => {
  return JSON.parse(JSON.stringify(portfolioList));
};

export const reorder = (
  dataGridList: Portfolio[],
  startIdx: number,
  endIdx: number,
): Portfolio[] => {
  const [targetItem] = dataGridList.splice(startIdx, 1);
  dataGridList.splice(endIdx, 0, targetItem);
  return dataGridList;
};
