import { S3File } from "./file.interface";
import { PortfolioWriter } from "./member.interface";

export type PortfolioType = "VIDEO" | "URL";
type PortfolioScope = "PUBLIC" | "PRIVATE" | "PROTECTED";
export type PortfolioListType = "main" | "portfolio" | "upload";

export type Portfolio = {
  portfolioId: number;
  writer: PortfolioWriter;
  portfolioUrl: string;
  portfolioType: PortfolioType;
  title: string;
  description: string;
  scope: PortfolioScope;
  gitUrl: string;
  video: S3File;
  thumbnail: S3File;
  skillList: string[];
  contributorList: PortfolioWriter[];
  bookmarks: number;
  views: number;
  comments: number;
  createdDate: Date;
};

export type PortfolioForm = {
  title: string;
  description: string;
  videoFileUid: string;
  portfolioUrl: string;
  thumbnailFileUid: string;
  portfolioScope: PortfolioScope;
  portfolioType: PortfolioType;
  gitUrl: string;
  skillList: string[];
  contributorIdList: number[];
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
