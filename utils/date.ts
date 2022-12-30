import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";
TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

export const getKoreanDate = (
  date: Date,
  options = {
    year: "2-digit",
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

export const getTimeAgo = (date: Date) => {
  return timeAgo.format(date);
};
