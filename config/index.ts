interface Config {
  baseURL: string;
  clientUrl: string;
  nodeEnv: "development" | "production" | "test";
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NEXT_PUBLIC_CLIENT_URL) throw new Error("no clinet url ");
  if (!process.env.NODE_ENV) throw new Error("no node env ");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
  };
};

export default createConfig();
