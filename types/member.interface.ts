export type MemberRoleType = "ROLE_ADMIN" | "ROLE_MEMBER" | "ROLE_NORMAL";
export const enum MemberType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  EMPTY = "EMPTY",
}

export interface Member {
  memberId: number;
  name: string;
  profileImageUrl: string;
  email: string;
  description: string | null;
  memberRoleType: MemberRoleType;
  memberType: MemberType;
  job: string | null;
  phone: string | null;
  portfolioCount: number;
  followerCount: number;
  followingCount: number;
  followYn: boolean;
  schoolGrade: number;
  schoolClass: number;
  schoolNumber: number;
  admissionYear: number;
  belong: string;
}

export type PortfolioWriter = Omit<
  Member,
  | "description"
  | "job"
  | "phone"
  | "memberRoleType"
  | "portfolioCount"
  | "followerCount"
  | "followingCount"
  | "followYn"
>;
