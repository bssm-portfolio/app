export type OAuthPlatform = "kakao" | "google" | "bsm";

export interface Token {
  token: string;
  validity: string;
}

export interface Bsm {
  authCode: string;
}
