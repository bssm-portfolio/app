import httpClient from "@/apis";
import fixture from "@/fixtures";
import {
  CommentList,
  Filter,
  PaginationRequest,
  Portfolio,
  PortfolioList,
} from "@/types/portfolio.interface";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import KEY from "../key";

const usePortfolioList = (pagination: PaginationRequest, filter?: Filter) => {
  const { data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<PortfolioList>(
      [KEY.PORTFOLIO_LIST, filter],
      ({ pageParam = 0 }) =>
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

  const customHasNextPage =
    (data?.pageParams[data.pageParams.length - 1] || 1) <
    (data?.pages[0].pagination.totalPages || 0);

  return {
    pages: data?.pages || [{ list: [] }],
    isFetchingNextPage,
    customHasNextPage,
    fetchNextPage,
  };
};

const useMyPortfolioList = () => {
  const { data, isError } = useQuery<PortfolioList>(
    [KEY.MY_PORTFOLIO_LIST],
    () =>
      httpClient.portfolio.self({ params: { size: 100 } }).then((r) => r.data),
  );
  return {
    pagination: data?.pagination || null,
    list: data?.list || [],
    isError,
  };
};

const usePortfolioListById = (portfolioId?: number, isMypage?: boolean) => {
  const getPortfolioList = () => {
    if (isMypage)
      return () =>
        httpClient.portfolio
          .self({ params: { size: 100 } })
          .then((r) => r.data);
    return () =>
      httpClient.portfolioMember
        .getById({ params: { id: portfolioId, size: 100 } })
        .then((r) => r.data);
  };

  const { data } = useQuery<PortfolioList>(
    [KEY.PORTFOLIO_LIST_BY_ID, portfolioId, isMypage],
    getPortfolioList(),
    { enabled: !!portfolioId },
  );
  return data || { pagination: null, list: [] };
};

const useCommentList = (portfolioId?: number) => {
  const { data, refetch } = useQuery<CommentList>(
    [KEY.COMMENT, portfolioId],
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
    [KEY.PORTFOLIO, portfolioId],
    () =>
      httpClient.portfolio
        .getById({ params: { id: portfolioId } })
        .then((r) => r.data),
    { enabled: !!portfolioId },
  );
  return { data: data || fixture.portfolio };
};

const useRecommendPortfolio = () => {
  const { data } = useQuery(["recommendPortfolio"], () =>
    httpClient.portfolio
      .search({
        pagination: { size: 6, page: 0 },
        filter: {
          recommendStatus: "RECOMMEND",
        },
      })
      .then((r) => r.data),
  );
  return { data };
};

export {
  usePortfolio,
  usePortfolioList,
  usePortfolioListById,
  useCommentList,
  useMyPortfolioList,
  useRecommendPortfolio,
};
