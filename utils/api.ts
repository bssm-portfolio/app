import { getDateParsedData } from "@/utils/date";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const requestInterceptors = (requestConfig: AxiosRequestConfig) => {
  const urlParams = requestConfig.url?.split("/:") || [];
  if (urlParams.length < 2) return requestConfig;

  const paramParsedUrl = urlParams
    ?.map((paramKey) => {
      const { params } = requestConfig;
      if (paramKey in params) return params[paramKey];
      return paramKey;
    })
    .join("/");

  urlParams?.forEach((paramKey: string) => {
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
