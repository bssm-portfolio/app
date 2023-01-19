import { Portfolio } from "@/types/portfolio.interface";

// eslint-disable-next-line import/prefer-default-export
export const getParsedDataGridItems = (portfolioList: Portfolio[]) => {
  return JSON.parse(JSON.stringify(portfolioList));
};
