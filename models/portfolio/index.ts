import httpClient from "@/apis";
import fixture from "@/fixtures";
import { PortfolioList } from "@/types/portfolio.interface";
import { useQuery } from "@tanstack/react-query";

const usePortfolioList = () => {
  const { data } = useQuery<PortfolioList>(["portfolioList"], () =>
    httpClient.portfolio.search({}).then((d) => d.data),
  );
  return data || { pagination: null, list: [] };
};

const usePortfolio = () => {
  return { data: fixture.portfolio };
};

const useCommentList = () => {
  return { data: fixture.commentList };
};

export { usePortfolioList, usePortfolio, useCommentList };
