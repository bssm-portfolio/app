import { Option } from "@/components/common/Select";
import { PortfolioTheme } from "@/types/portfolio.interface";

interface Config {
  baseURL: string;
  nodeEnv: "development" | "production" | "test";
  clientUrl: string;
  serviceName: string;
  defaultThumbnail: "/assets/images/defaultThumbnail.png";
  defaultProfile: "/assets/images/defaultProfile.png";
  defaultLogo: "/assets/images/logo.png";
  portfolioThemeOptions: Option[];
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NODE_ENV) throw new Error("no node env");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: typeof window !== "undefined" ? window.location.origin : "",
    serviceName: "BSSM Portfolio",
    defaultThumbnail: "/assets/images/defaultThumbnail.png",
    defaultProfile: "/assets/images/defaultProfile.png",
    defaultLogo: "/assets/images/logo.png",
    portfolioThemeOptions: [
      { label: "웹", value: PortfolioTheme.WEB },
      { label: "앱", value: PortfolioTheme.APP },
      { label: "임베디드", value: PortfolioTheme.EMBEDDED },
      { label: "로봇", value: PortfolioTheme.ROBOT },
    ],
  };
};

export default createConfig();
