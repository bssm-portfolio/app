import type { PlaywrightTestConfig } from "@playwright/test";

const isDev = process.env.NODE_ENV === "development";
const config: PlaywrightTestConfig = {
  testDir: "e2e",
  use: {
    headless: !isDev,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
  },
  webServer: !isDev
    ? {
        command: "yarn dev",
        url: "http://localhost:3000",
      }
    : undefined,
};

export default config;
