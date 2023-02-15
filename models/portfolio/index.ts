import httpClient from "@/apis";
import fixture from "@/fixtures";
import { Comment, PortfolioList } from "@/types/portfolio.interface";
import { useQuery } from "@tanstack/react-query";

interface CommentList {
  list: Comment[];
}

const usePortfolioList = () => {
  const { data } = useQuery<PortfolioList>(["portfolioList"], () =>
    httpClient.portfolio.search({}).then((d) => d.data),
  );
  return data || { pagination: null, list: [] };
};

const useMyPortfolioList = () => {
  const { data } = useQuery<PortfolioList>(["my portfolioList"], () =>
    httpClient.portfolio.self({}).then((d) => d.data),
  );
  return data || { pagination: null, list: [] };
};

const usePortfolio = () => {
  return { data: fixture.portfolio };
};

const useCommentList = (portfolioId?: number) => {
  const { data, refetch } = useQuery<CommentList>(
    ["comment", portfolioId],
    () =>
      httpClient.comment
        .getById({ params: { portfolioId } })
        .then((r) => r.data),
    { enabled: portfolioId != null },
  );
  return { list: data?.list ?? [], refetch };
};

export { usePortfolioList, usePortfolio, useCommentList, useMyPortfolioList };
