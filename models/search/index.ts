import httpClient from "@/apis";
import { PortfolioList } from "@/types/portfolio.interface";
import { useQuery } from "@tanstack/react-query";

const useSearch = (keyword: string) => {
  const { data } = useQuery<PortfolioList>(
    ["search", keyword],
    () =>
      httpClient.portfolio.search({ params: { keyword } }).then((d) => d.data),
    {
      enabled: keyword !== "",
    },
  );
  return data || { pagination: null, list: [] };
};

export default useSearch;
