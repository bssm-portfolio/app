export type MemberRoleType = "ROLE_NORMAL";

export interface Member {
  memberId: number;
  name: string;
  profileImageUrl: string;
  email: string;
  description: string | null;
  memberRoleType: MemberRoleType;
  job: string | null;
  phone: string | null;
}

export type PortfolioWriter = Omit<
  Member,
  "description" | "job" | "phone" | "memberRoleType"
>;
export type OAuthPlatform = "kakao" | "google" | "bsm";

export interface Token {
  token: string;
  validity: string;
}

export interface Bsm {
  authCode: string;
}
