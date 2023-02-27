import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { PortfolioList } from "./portfolio.interface";

export type RefetchType = <TPageData>(
  options?: RefetchOptions & RefetchQueryFilters<TPageData>,
) => Promise<QueryObserverResult>;

export type FetchNextPageType = (
  options?: FetchNextPageOptions | undefined,
) => Promise<InfiniteQueryObserverResult<PortfolioList, unknown>>;
