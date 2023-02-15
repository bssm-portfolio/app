interface Config {
  baseURL: string;
  nodeEnv: "development" | "production" | "test";
}

const createConfig: () => Config = () => {
  console.log("PROCESS ENV : ", process.env);
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error("no api server url");
  if (!process.env.NODE_ENV) throw new Error("no node env ");

  return {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    nodeEnv: process.env.NODE_ENV,
  };
};

export default createConfig();
