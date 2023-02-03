import { atom } from "recoil";
import { User } from "@/types/user.interface";

export { default as modalState } from "./modal";

export const userState = atom<User>({
  key: "user",
  default: {
    memberId: "",
    name: "",
    profileImageUrl: "",
    email: "",
    description: "",
    phone: "",
    job: "",
    memberRoleType: "ROLE_NORMAL",
  },
});

export const urlState = atom({
  key: "portfolioUrl",
  default: "https://comic.naver.com/webtoon/weekday",
});
