import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";

export default function MainPortfolioList() {
  const router = useRouter();
  const { list } = usePortfolioList();

  return (
    <div className="flex gap-12 flex-wrap">
      {list.map((portfolio) => (
        <Portfolio
          portfolio={portfolio}
          onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
          key={portfolio.portfolioId}
        />
      ))}
    </div>
  );
}
