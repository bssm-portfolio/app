import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";
import LoginPopup from "../common/Login";

export default function PortfolioList() {
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
      <LoginPopup />
    </div>
  );
}
