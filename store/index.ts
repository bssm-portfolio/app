import { atom } from "recoil";
import fixture from "@/fixtures";
import { Member } from "@/types/oauth.interface";

export { default as modalState } from "./modal";

export const emptyUser: Member = {
  memberId: 0,
  name: "user",
  email: "test@test.com",
  profileImageUrl: fixture.avatarUrl,
  description: null,
  memberRoleType: "ROLE_NORMAL",
  job: null,
  phone: null,
};

export const userState = atom<Member>({
  key: "user",
  default: emptyUser,
});

export const urlState = atom({
  key: "portfolioUrl",
  default: "https://comic.naver.com/webtoon/weekday",
});
