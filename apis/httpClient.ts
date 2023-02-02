import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import config from "@/config";
import { AUTH_TOKEN } from "@/config/const";
import { requestInterceptors, responseInterceptors } from "@/utils/api";
import { Bsm } from "@/types/member.interface";

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
}

class HttpClient {
  private api: AxiosInstance;

  constructor(url: string, axiosConfig: HttpClientConfig) {
    this.api = axios.create({
      ...axiosConfig,
      baseURL: `${axiosConfig.baseURL}${url}`,
    });
    this.setting();
  }

  get(requestConfig?: AxiosRequestConfig) {
    return this.api.get("", requestConfig);
  }

  getById(requestConfig?: AxiosRequestConfig) {
    return this.api.get(`/:id`, requestConfig);
  }

  search(requestConfig?: AxiosRequestConfig) {
    return this.api.get("/search", requestConfig);
  }

  post(data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.post("/", data, requestConfig);
  }

  google(data: Bsm, requestConfig?: AxiosRequestConfig) {
    return this.api.post("/bsm", data, requestConfig);
  }

  kakao(data: Bsm, requestConfig?: AxiosRequestConfig) {
    return this.api.post("/bsm", data, requestConfig);
  }

  bsm(data: Bsm, requestConfig?: AxiosRequestConfig) {
    return this.api.post("/bsm", data, requestConfig);
  }

  put(data: unknown, requestConfig?: AxiosRequestConfig) {
    return this.api.put("/", data, requestConfig);
  }

  delete(requestConfig?: AxiosRequestConfig) {
    return this.api.delete("/", requestConfig);
  }

  private setting() {
    HttpClient.setCommonInterceptors(this.api);
  }

  static setAccessToken() {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) throw new Error("no access token");
    axios.defaults.headers.Authorization = token;
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
  oauth: new HttpClient("/api/oauth", axiosConfig),
};
