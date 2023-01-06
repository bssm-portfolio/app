import fixture from "@/fixtures";

const usePortfolioList = () => {
  return { data: fixture.portfolioList };
};

const usePortfolio = () => {
  return { data: fixture.portfolio };
};

const useCommentList = () => {
  return { data: fixture.commentList };
};

export { usePortfolioList, usePortfolio, useCommentList };
