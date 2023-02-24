import PortfolioEdit from "@/components/portfolio/edit";
import EditLayout from "@/layouts/PortfolioEdit";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";

export default function Edit() {
  const router = useRouter();
  const { portfolioId } = router.query;

  const seoConfig: NextSeoProps = {
    title: "포트폴리오 정보 수정",
    description: "포트폴리오의 정보를 수정하는 페이지입니다.",
  };

  return (
    <div>
      <NextSeo {...seoConfig} />
      <EditLayout app={<PortfolioEdit portfolioId={Number(portfolioId)} />} />
    </div>
  );
}
