interface Config {
  baseURL: string;
  nodeEnv: "development" | "production" | "test";
  clientUrl: string;
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NODE_ENV) throw new Error("no node env ");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: typeof window !== "undefined" ? window.location.origin : "",
  };
};

export default createConfig();
