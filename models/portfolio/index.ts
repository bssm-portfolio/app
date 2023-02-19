import fixture from "@/fixtures";
import httpClient from "@/apis";
import {
  Comment,
  Pagination,
  PortfolioList,
} from "@/types/portfolio.interface";
import { useQuery } from "@tanstack/react-query";

interface CommentList {
  list: Comment[];
}

const usePortfolioList = (pagination?: Pagination) => {
  const { data } = useQuery<PortfolioList>(
    ["portfolioList", pagination],
    () =>
      httpClient.portfolio.search({ params: pagination }).then((r) => r.data),
    { enabled: pagination !== fixture.defaultPagination },
  );

  return (
    data || {
      pagination: fixture.defaultPagination,
      list: [],
    }
  );
};

const useMyPortfolioList = () => {
  const { data } = useQuery<PortfolioList>(["my portfolioList"], () =>
    httpClient.portfolio.self({}).then((r) => r.data),
  );
  return data || { pagination: null, list: [] };
};

const usePortfolioListById = (portfolioId?: number) => {
  const { data } = useQuery<PortfolioList>(
    ["get portfolioList by id", portfolioId],
    () =>
      httpClient.portfolioMember
        .getById({ params: { id: portfolioId } })
        .then((r) => r.data),
    { enabled: !!portfolioId },
  );
  return data || { pagination: null, list: [] };
};

const useCommentList = (portfolioId?: number) => {
  const { data, refetch } = useQuery<CommentList>(
    ["comment", portfolioId],
    () =>
      httpClient.comment
        .getById({ params: { id: portfolioId } })
        .then((r) => r.data),
    { enabled: !!portfolioId },
  );
  return { list: data?.list ?? [], refetch };
};

export {
  usePortfolioList,
  usePortfolioListById,
  useCommentList,
  useMyPortfolioList,
};
