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
  console.log("date :", typeof date);
  console.log("date :", date);
  if (!date.getDay) return "invalid date";
  return new Intl.DateTimeFormat("ko-KR", options).format(
    date.getTimezoneOffset(),
  );
};

export const getTimeAgo = (date: Date) => {
  if (!date.getDay) return "invalid date";
  return timeAgo.format(date);
};

export const isISODateString = (value: string) => {
  const isISODateStringRegExp =
    /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):?([0-5][0-9])?(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/;
  return isISODateStringRegExp.test(value);
};

export const getDateParsedData = (data: unknown): any => {
  if (data === null || data === undefined || typeof data !== "object") {
    return data;
  }

  return Object.entries(data).reduce((acc: any, item: any) => {
    const [key, value] = item;
    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map((v) => getDateParsedData(v)),
      };
    }

    if (isISODateString(value)) return { ...acc, [key]: new Date(value) };

    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
