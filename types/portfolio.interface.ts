import { S3File } from "./file.interface";
import { Member, PortfolioWriter } from "./member.interface";
import { Skill } from "./skill.interface";

export type PortfolioType = "VIDEO" | "URL" | "ALL";
export type PortfolioScope = "PUBLIC" | "PRIVATE" | "PROTECTED";
export type PortfolioListType =
  | "main"
  | "portfolio"
  | "upload"
  | "detail"
  | "search";
export type RecommendStatus = "NONE" | "RECOMMEND";

export type Portfolio = {
  portfolioId: number;
  writer: PortfolioWriter;
  portfolioUrl: string;
  portfolioType: PortfolioType;
  recommendStatus: RecommendStatus;
  title: string;
  description: string;
  bookmarkYn: boolean;
  followYn: boolean;
  scope: PortfolioScope;
  portfolioTheme: PortfolioTheme;
  gitUrl: string;
  video: S3File;
  thumbnail: S3File;
  skillList: Skill[];
  contributorList: Member[];
  bookmarks: number;
  views: number;
  comments: number;
  createdDate: Date;
};

export const enum PortfolioTheme {
  WEB = "WEB",
  APP = "APP",
  EMBEDDED = "EMBEDDED",
  ROBOT = "ROBOT",
}

export type PortfolioForm = {
  title: string;
  description: string;
  videoFileUid: string;
  portfolioUrl: string;
  portfolioTheme: PortfolioTheme;
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
export type PortfolioThemeType = "WEB" | "APP" | "EMBEDDED" | "ROBOT";
export type SearchType =
  | "TITLE"
  | "CREATOR"
  | "CONTRIBUTOR"
  | "CREATOR_AND_CONTRIBUTOR ";

export interface Filter {
  search?: string;
  searchType?: SearchType;
  uploadDateType?: UploadDateType;
  schoolGrade?: SchoolGradeType;
  portfolioThemeType?: PortfolioThemeType;
  sortType?: SortType;
  sortDirectionType?: SortDirectionType;
  recommendStatus?: RecommendStatus;
}

export type SearchFilterPropertyType =
  | "uploadDateType"
  | "schoolGrade"
  | "sortType"
  | "sortDirectionType"
  | "portfolioTheme";

export interface PortfolioList {
  list: Portfolio[];
  pagination: PaginationResponse;
}

export interface CommentWriter {
  memberId: number;
  name: string;
  profileImageUrl: string;
  email: string;
}

export interface Comment {
  writer: CommentWriter;
  commentId: number;
  content: string;
  createdDate: Date;
  editable: boolean;
  deletable: boolean;
  bookmarks: number;
  bookmarkYn: boolean;
  replyList: Comment[];
}

export interface CommentList {
  list: Comment[];
}
export interface Description {
  children: string;
}

export interface CommentForm {
  content: string;
}

export type CheckBoxPropertyType = {
  id?: string;
  value: string;
  label: string;
};

export interface CheckBoxProperty {
  uploadDateType: CheckBoxPropertyType;
  schoolGrade: CheckBoxPropertyType;
  sortType: CheckBoxPropertyType;
  sortDirectionType: CheckBoxPropertyType;
}
