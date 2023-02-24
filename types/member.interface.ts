export type MemberRoleType = "ROLE_ADMIN" | "ROLE_MEMBER" | "ROLE_NORMAL";

export interface Member {
  memberId: number;
  name: string;
  profileImageUrl: string;
  email: string;
  description: string | null;
  memberRoleType: MemberRoleType;
  job: string | null;
  phone: string | null;
  portfolioCount: number;
  followerCount: number;
  followingCount: number;
  followYn: boolean;
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
