import { S3File } from "./file.interface";
import { MemberWithoutIntroduction } from "./member.interface";

export type PortfolioType = "VIDEO" | "URL";
type PortfolioScope = "PUBLIC" | "PRIVATE" | "PROTECTED";
export type PortfolioSidebarType = "main" | "portfolio";

export type Portfolio = {
  portfolioId: number;
  writer: MemberWithoutIntroduction;
  portfolioUrl: string;
  portfolioType: PortfolioType;
  title: string;
  description: string;
  scope: PortfolioScope;
  gitUrl: string;
  video: S3File;
  thumbnail: S3File;
  skillList: string[];
  contributorList: MemberWithoutIntroduction[];
  bookmarks: number;
  views: number;
  comments: number;
  createdDate: Date;
};

interface Pagination {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

export interface PortfolioList {
  list: Portfolio[];
  pagination: Pagination;
}

export interface Comment {
  commentId: number;
  userProfile: string;
  userName: string;
  content: string;
  createdDate: Date;
}

export interface Description {
  description: string;
}
