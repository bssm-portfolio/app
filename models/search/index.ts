import httpClient from "@/apis";
import {
  Filter,
  PaginationRequest,
  PortfolioList,
} from "@/types/portfolio.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearch = (pagination: PaginationRequest, filter: Filter) => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<PortfolioList>(
      ["search"],
      () =>
        httpClient.portfolio.search({ pagination, filter }).then((r) => r.data),
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
  };
};

export default useSearch;
