import { Portfolio } from "@/types/portfolio.interface";
import { Portfolio as PortfolioView } from "@/components/";
import { useRouter } from "next/router";

interface ProfilePagePortfolioListProps {
  portfolioList: Portfolio[];
  isMypage?: boolean;
}

export default function ProfilePagePortfolioList({
  portfolioList,
  isMypage,
}: ProfilePagePortfolioListProps) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-12 ml-[4.5rem]">
      {portfolioList.map((portfolio) => {
        return (
          <PortfolioView
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            key={portfolio.portfolioId}
          />
        );
      })}
      {isMypage && <div>더보기</div>}
    </div>
  );
}
