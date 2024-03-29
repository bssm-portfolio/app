import { test } from "@playwright/test";

test("검색 기능 테스트", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("검색").click();
  await page.getByPlaceholder("검색").fill("test");
  await page.getByPlaceholder("검색").press("Enter");
  await page.locator("div").filter({ hasText: "필터" }).nth(4).click();
});
