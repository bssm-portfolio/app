import httpClient from "@/apis";
import {
  Comment,
  Filter,
  PaginationRequest,
  PortfolioList,
} from "@/types/portfolio.interface";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface CommentList {
  list: Comment[];
}

const usePortfolioList = (pagination: PaginationRequest, filter: Filter) => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PortfolioList>(
      ["portfolioList"],
      ({ pageParam = 1 }) =>
        httpClient.portfolio
          .search({ pagination: { ...pagination, page: pageParam }, filter })
          .then((r) => r.data),
      {
        getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
      },
    );

  return {
    pages: data?.pages ?? [{ list: [] }],
    pageParams: data?.pageParams ?? [],
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
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

export {
  usePortfolioList,
  usePortfolioListById,
  useCommentList,
  useMyPortfolioList,
};
