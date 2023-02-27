import { MainLayout } from "@/layouts";
import MainTitle from "@/components/main/MainTitle";
import MainFilter from "@/components/main/MainFilter";
import { usePortfolioList } from "@/models/portfolio";
import { MainPortfolioList } from "@/components";

export default function Home() {
  const { pages, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePortfolioList({ size: 12 });
  return (
    <MainLayout
      app={
        <MainPortfolioList
          pages={pages}
          hasNextPage={hasNextPage || false}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
      title={<MainTitle />}
      filter={<MainFilter />}
    />
  );
}
