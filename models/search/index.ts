import httpClient from "@/apis";
import {
  Filter,
  PaginationRequest,
  PortfolioList,
} from "@/types/portfolio.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearch = (pagination: PaginationRequest, filter: Filter) => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PortfolioList>(
      ["search"],
      ({ pageParam = 1 }) =>
        httpClient.portfolio
          .search({ pagination: { ...pagination, page: pageParam }, filter })
          .then((r) => r.data),
      {
        getNextPageParam: (lastPage) => lastPage.pagination.page + 1,
        enabled: !!filter.search,
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

export default useSearch;
