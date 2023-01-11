import { isISODateString } from "@/utils/date";
import { AxiosRequestConfig, AxiosResponse } from "axios";

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

export const requestInterceptors = (requestConfig: AxiosRequestConfig) => {
  const urlParams = requestConfig.url?.split("/:") || [];
  if (urlParams.length < 2) return requestConfig;

  const paramParsedUrl = urlParams
    ?.map((paramKey) => {
      return requestConfig.params[paramKey];
    })
    .join("/");

  urlParams?.forEach((paramKey: string) => {
    // eslint-disable-next-line no-param-reassign
    delete requestConfig.params[paramKey];
  }, {});

  return {
    ...requestConfig,
    url: paramParsedUrl,
  };
};

export const responseInterceptors = (originalResponse: AxiosResponse) => {
  return {
    ...originalResponse,
    data: getDateParsedData(originalResponse.data),
  };
};
