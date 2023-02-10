import httpClient from "@/apis";
import fixture from "@/fixtures";
import { PortfolioList } from "@/types/portfolio.interface";
import { useQuery } from "@tanstack/react-query";

const usePortfolioList = () => {
  const { data } = useQuery<PortfolioList>(["portfolioList"], () =>
    httpClient.portfolio.search({}).then((d) => d.data),
  );
  return data || { pagination: null, list: [] };
};

const usePortfolio = () => {
  return { data: fixture.portfolio };
};

interface Comment {
  writer: {
    memberId: number;
    name: string;
    profileImageUrl: string;
    email: string;
  };
  commentId: number;
  content: string;
  createdDate: Date;
  editable: boolean;
}

interface CommentList {
  list: Comment[];
}

const useCommentList = (portfolioId: number) => {
  const { data } = useQuery<CommentList>(["comment", portfolioId], () =>
    httpClient.comment
      .getById({ params: { id: portfolioId } })
      .then((r) => r.data),
  );
  return data || { list: [] };
};

export { usePortfolioList, usePortfolio, useCommentList };
