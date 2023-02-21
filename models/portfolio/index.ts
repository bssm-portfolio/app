import httpClient from "@/apis";
import fixture from "@/fixtures";
import {
  Comment,
  Filter,
  PaginationRequest,
  Portfolio,
  PortfolioList,
} from "@/types/portfolio.interface";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface CommentList {
  list: Comment[];
}

const usePortfolioList = (pagination: PaginationRequest, filter?: Filter) => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PortfolioList>(
      ["portfolioList"],
      ({ pageParam = 1 }) =>
        httpClient.portfolio
          .search({
            pagination: { ...pagination, page: pageParam },
            filter: filter || {},
          })
          .then((r) => r.data),
      {
        getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
      },
    );

  return {
    pages: data?.pages ?? [{ list: [] }],
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
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

const usePortfolio = (portfolioId?: number) => {
  const { data } = useQuery<Portfolio>(
    ["comment", portfolioId],
    () =>
      httpClient.portfolio
        .getById({ params: { id: portfolioId } })
        .then((r) => r.data),
    { enabled: !!portfolioId },
  );
  return { data: data || fixture.portfolio };
};

export {
  usePortfolio,
  usePortfolioList,
  usePortfolioListById,
  useCommentList,
  useMyPortfolioList,
};
