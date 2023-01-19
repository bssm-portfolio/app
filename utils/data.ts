import { Portfolio } from "@/types/portfolio.interface";

// eslint-disable-next-line import/prefer-default-export
export const getParsedDataGridList = (portfolioList: Portfolio[]) => {
  return JSON.parse(JSON.stringify(portfolioList));
};
