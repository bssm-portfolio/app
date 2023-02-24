import { MainLayout } from "@/layouts";
import MainPortfolioList from "@/components/main/MainPortfolioList";
import MainTitle from "@/components/main/MainTitle";
import MainFilter from "@/components/main/MainFilter";

export default function Home() {
  return (
    <MainLayout
      app={<MainPortfolioList />}
      title={<MainTitle />}
      filter={<MainFilter />}
    />
  );
}
