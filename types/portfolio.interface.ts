import { S3File } from "./file.interface";
import { PortfolioWriter } from "./member.interface";
import { Skill } from "./skill.interface";

export type PortfolioType = "VIDEO" | "URL" | "ALL";
export type PortfolioScope = "PUBLIC" | "PRIVATE" | "PROTECTED";
export type PortfolioListType =
  | "main"
  | "portfolio"
  | "upload"
  | "detail"
  | "search";

export type Portfolio = {
  portfolioId: number;
  writer: PortfolioWriter;
  portfolioUrl: string;
  portfolioType: PortfolioType;
  title: string;
  description: string;
  bookmarkYn: boolean;
  followYn: boolean;
  scope: PortfolioScope;
  gitUrl: string;
  video: S3File;
  thumbnail: S3File;
  skillList: Skill[];
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
  skillList: Skill[];
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

export type UploadDateType =
  | "AN_HOUR_AGO"
  | "TODAY"
  | "THIS_WEEK"
  | "THIS_MONTH"
  | "THIS_YEAR";
export type SortType =
  | "UPLOAD_DATE"
  | "BOOKMARKS"
  | "COMMENTS"
  | "RANK"
  | "VIEWS"
  | "ALL";
export type SortDirectionType = "ASC" | "DESC";
export type SchoolGradeType = 1 | 2 | 3;

export interface Filter {
  search?: string;
  uploadDateType?: UploadDateType;
  schoolGrade?: SchoolGradeType;
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
