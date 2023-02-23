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
import {
  COMMENT_KEY,
  MY_PORTFOLIO_LIST_KEY,
  PORTFOLIO_KEY,
  PORTFOLIO_LIST_BY_ID_KEY,
  PORTFOLIO_LIST_KEY,
} from "../key";

interface CommentList {
  list: Comment[];
}

const usePortfolioList = (pagination: PaginationRequest, filter?: Filter) => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PortfolioList>(
      [PORTFOLIO_LIST_KEY],
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
  const { data, refetch } = useQuery<PortfolioList>(
    [MY_PORTFOLIO_LIST_KEY],
    () =>
      httpClient.portfolio.self({ params: { size: 100 } }).then((r) => r.data),
  );
  return {
    pagination: data?.pagination || null,
    list: data?.list || [],
    refetch,
  };
};

const usePortfolioListById = (portfolioId?: number) => {
  const { data } = useQuery<PortfolioList>(
    [PORTFOLIO_LIST_BY_ID_KEY, portfolioId],
    () =>
      httpClient.portfolioMember
        .getById({ params: { id: portfolioId, size: 100 } })
        .then((r) => r.data),
    { enabled: !!portfolioId },
  );
  return data || { pagination: null, list: [] };
};

const useCommentList = (portfolioId?: number) => {
  const { data, refetch } = useQuery<CommentList>(
    [COMMENT_KEY, portfolioId],
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
    [PORTFOLIO_KEY, portfolioId],
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
