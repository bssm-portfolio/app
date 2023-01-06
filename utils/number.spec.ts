import { getKoreanDate, getTimeAgo } from "./date";

test("koreanDate test - before 2000", () => {
  expect(getKoreanDate(new Date("December 17, 1995"))).toBe("1995년 12월 17일");
});

test("koreanDate test - after 2000", () => {
  expect(getKoreanDate(new Date("December 17, 2005"))).toBe("2005년 12월 17일");
});

test("timeAgo test - before 2000", () => {
  expect(getTimeAgo(new Date("December 17, 1995"))).toBe("27년 전");
});

test("timeAgo test - after 2000", () => {
  expect(getTimeAgo(new Date("December 17, 2005"))).toBe("17년 전");
});

test("timeAgo test - now", () => {
  expect(getTimeAgo(new Date())).toBe("방금");
});

test("timeAgo test - future", () => {
  expect(getTimeAgo(new Date("December 17, 2025"))).toBe("3년 후");
});
