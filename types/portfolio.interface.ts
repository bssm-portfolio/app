import { S3File } from "./file.interface";
import { MemberWithoutIntroduction } from "./member.interface";

type PortfolioType = "VIDEO" | "URL";
type PortfolioScope = "PUBLIC" | "PRIVATE" | "PROTECTED";

export type Portfolio = {
  portfolioId: number;
  writer: MemberWithoutIntroduction;
  portfolioType: PortfolioType;
  title: string;
  description: string;
  scope: PortfolioScope;
  portfolioUrl: string;
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

export interface Comment {
  commentId: number;
  userProfile: string;
  userName: string;
  content: string;
  createdDate: Date;
}
