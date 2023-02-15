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
    <div className="bg-red-100 w-full h-full">
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
