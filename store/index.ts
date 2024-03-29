import { atom } from "recoil";
import fixture from "@/fixtures";
import { Member, MemberType } from "@/types/member.interface";

export { default as modalState } from "./modal";

export const emptyUser: Member = {
  memberId: 0,
  name: "",
  email: "",
  profileImageUrl: fixture.avatarUrl,
  description: null,
  memberRoleType: "ROLE_NORMAL",
  job: null,
  phone: null,
  memberType: MemberType.EMPTY,
  followerCount: 0,
  followingCount: 0,
  portfolioCount: 0,
  followYn: false,
  schoolGrade: 0,
  schoolClass: 0,
  schoolNumber: 0,
};

export const userState = atom<Member>({
  key: "user",
  default: emptyUser,
});

export const urlState = atom({
  key: "portfolioUrl",
  default: "https://comic.naver.com/webtoon/weekday",
});
