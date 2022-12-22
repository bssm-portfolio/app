import { test, expect } from "@playwright/test";

test("portfolio should have items", async ({ page }) => {
  await page.goto("http://localhost:3000/portfolio/1");
  await expect(page.locator("button")).toContainText("nexon");
});
