import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";

export default function PortfolioList() {
  const router = useRouter();
  const moveDetail = () => router.push("/portfolio/123");
  const { data } = usePortfolioList();

  return (
    <div className="flex gap-12 flex-wrap">
      {data.map((portfolio) => (
        <Portfolio
          portfolio={portfolio}
          onClick={moveDetail}
          key={portfolio.portfolioId}
        />
      ))}
    </div>
  );
}
