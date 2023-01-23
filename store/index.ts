import { atom } from "recoil";
import fixture from "@/fixtures";

export { default as modalState } from "./modal";

export const userState = atom({
  key: "user",
  default: {
    name: "user",
    email: "test@test.com",
    avatarUrl: fixture.avatarUrl,
  },
});

export const urlState = atom({
  key: "portfolioUrl",
  default: "https://comic.naver.com/webtoon/weekday",
});
