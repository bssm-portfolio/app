interface Config {
  baseURL: string;
  nodeEnv: "development" | "production" | "test";
  clientUrl: string;
  serviceName: string;
  defaultThumbnail: "/assets/images/defaultThumbnail.png";
  defaultProfile: "/assets/images/defaultProfile.png";
  defaultLogo: "/assets/images/logo.png";
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NODE_ENV) throw new Error("no node env ");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: typeof window !== "undefined" ? window.location.origin : "",
    serviceName: "BSSM Portfolio",
    defaultThumbnail: "/assets/images/defaultThumbnail.png",
    defaultProfile: "/assets/images/defaultProfile.png",
    defaultLogo: "/assets/images/logo.png",
  };
};

export default createConfig();
