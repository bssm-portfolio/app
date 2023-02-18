import { Portfolio } from "@/types/portfolio.interface";
import { Portfolio as PortfolioView } from "@/components/";
import { useRouter } from "next/router";

export default function MyPagePortfolioList({
  myPortfolioList,
}: {
  myPortfolioList: Portfolio[];
}) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-[20rem_20rem] gap-12 ml-[4.5rem]">
      {myPortfolioList.map((myPortfolio) => {
        return (
          <PortfolioView
            portfolio={myPortfolio}
            onClick={() => router.push(`/portfolio/${myPortfolio.portfolioId}`)}
            key={myPortfolio.portfolioId}
          />
        );
      })}
    </div>
  );
}
