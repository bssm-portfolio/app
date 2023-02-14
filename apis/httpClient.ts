import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import config from "@/config";
import { requestInterceptors, responseInterceptors } from "@/utils/api";
import { Storage } from "@/models/storage";

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: { Token?: string };
}

export class HttpClient {
  private api: AxiosInstance;

  private static clientConfig: HttpClientConfig;

  constructor(url: string, axiosConfig: HttpClientConfig) {
    this.api = axios.create({
      ...axiosConfig,
      baseURL: `${axiosConfig.baseURL}${url}`,
    });
    HttpClient.clientConfig = { headers: { Token: "" } };
    this.setting();
  }

  get(requestConfig?: AxiosRequestConfig) {
    return this.api.get("/", { ...HttpClient.clientConfig, ...requestConfig });
  }

  getById(id: number, requestConfig?: AxiosRequestConfig) {
    return this.api.get(`/${id}`, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  search(requestConfig?: AxiosRequestConfig) {
    return this.api.get("/search", {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  post(data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.post("", data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  put(data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.put("/", data, {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  delete(requestConfig?: AxiosRequestConfig) {
    return this.api.delete("/", {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  self(requestConfig?: AxiosRequestConfig) {
    return this.api.get("/self", {
      ...HttpClient.clientConfig,
      ...requestConfig,
    });
  }

  private setting() {
    HttpClient.setCommonInterceptors(this.api);
  }

  static setAccessToken() {
    const accessToken = Storage.getItem("ACCESS_TOKEN");
    HttpClient.clientConfig.headers = {
      ...HttpClient.clientConfig.headers,
      Token: accessToken || undefined,
    };
  }

  static removeAccessToken() {
    Storage.setItem("ACCESS_TOKEN", "");
  }

  private static setCommonInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(requestInterceptors);
    instance.interceptors.response.use(responseInterceptors);
  }
}

const axiosConfig: HttpClientConfig = {
  baseURL: config.baseURL,
  timeout: 2500,
};

export default {
  portfolio: new HttpClient("/api/portfolio", axiosConfig),
  oauth: new HttpClient("/api/login/oauth2", axiosConfig),
  skill: new HttpClient("/api/skill", axiosConfig),
  member: new HttpClient("/api/member", axiosConfig),
  comment: new HttpClient("/api/comment", axiosConfig),
};
