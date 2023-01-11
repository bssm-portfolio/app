import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

export const getKoreanDate = (
  date: Date,
  options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

export const getTimeAgo = (date: Date) => {
  return timeAgo.format(date);
};

export const isISODateString = (value: string) => {
  const isISODateStringRegExp =
    /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/;
  return isISODateStringRegExp.test(value);
};
