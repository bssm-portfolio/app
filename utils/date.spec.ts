import { getKoreanDate, getTimeAgo, isISODateString } from "./date";

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

test("isISODateString test", () => {
  expect(isISODateString(new Date().toISOString())).toBe(true);
});

test("isISODateString test", () => {
  expect(isISODateString(new Date().toString())).toBe(false);
});

test("isISODateString test", () => {
  expect(isISODateString(new Date().toLocaleDateString())).toBe(false);
});

test("isISODateString test", () => {
  expect(isISODateString("ㅇㅇㅇㅇ")).toBe(false);
});

test("isISODateString test", () => {
  expect(isISODateString("2012-01-01T17:52:10Z")).toBe(true);
});

test("isISODateString test", () => {
  expect(isISODateString("2012-01-01T17:52:10")).toBe(true);
});

test("isISODateString test", () => {
  expect(isISODateString("2012-01-01T17:52")).toBe(true);
});

test("isISODateString test", () => {
  expect(isISODateString("2012-01-01T17:52:10.37488")).toBe(true);
});

test("isISODateString test", () => {
  expect(
    isISODateString(
      "2012-01-01T17:52:10.3749999999999999999999999999999999999988Z",
    ),
  ).toBe(true);
});

test("isISODateString test", () => {
  expect(isISODateString("2012-01-01T17:52:10.23-12:00")).toBe(true);
});
