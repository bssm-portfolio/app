import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

export type RefetchType = <TPageData>(
  options?: RefetchOptions & RefetchQueryFilters<TPageData>,
) => Promise<QueryObserverResult>;
