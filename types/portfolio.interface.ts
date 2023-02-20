import { S3File } from "./file.interface";
import { PortfolioWriter } from "./member.interface";

export type PortfolioType = "VIDEO" | "URL" | "ALL";
type PortfolioScope = "PUBLIC" | "PRIVATE" | "PROTECTED";
export type PortfolioListType = "main" | "portfolio" | "upload" | "detail";

export type Portfolio = {
  portfolioId: number;
  writer: PortfolioWriter;
  portfolioUrl: string;
  portfolioType: PortfolioType;
  title: string;
  description: string;
  bookmarkYn: boolean;
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

export interface PaginationRequest {
  page?: number;
  size?: number;
}

export interface PaginationResponse {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

type SortType = "UPLOAD_DATE";
type SortDirectionType = "ASC" | "DESC";

export interface Filter {
  search?: string;
  uploadDateType?: string;
  schoolGrade?: number;
  sortType?: SortType;
  sortDirectionType?: SortDirectionType;
}

export interface PortfolioList {
  list: Portfolio[];
  pagination: PaginationResponse;
}

export interface Comment {
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
export interface Description {
  description: string;
}
