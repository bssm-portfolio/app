export type MemberRoleType = "ROLE_ADMIN" | "ROLE_MEMBER" | "ROLE_NORMAL";

export interface User {
  memberId: string;
  name: string;
  profileImageUrl: string | null;
  email: string;
  phone: string | null;
  description: string | null;
  memberRoleType: MemberRoleType;
  job: string | null;
}
