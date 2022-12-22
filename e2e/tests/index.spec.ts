import { test, expect } from "@playwright/test";

test("Mainpage should have searchbar", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("button")).toContainText("검");
});
