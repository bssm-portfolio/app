import { test } from "@playwright/test";

test("portfolio should render", async ({ page }) => {
  await page.goto("http://localhost:3000/portfolio/1");
});
