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
  createdDate: string;
  editable: boolean;
}

interface CommentList {
  list: Comment[];
}

const useCommentList = (id: number) => {
  const { data } = useQuery<CommentList>(["comment", id], () =>
    httpClient.comment.getById({ params: id }).then((d) => d.data),
  );
  return data || { list: [] };
};

export { usePortfolioList, usePortfolio, useCommentList };
