import { test } from "@playwright/test";

test("403 test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/portfolio/128");
  await page.getByRole("heading", { name: "비공개 포트폴리오입니다." }).click();
  await page.getByRole("button", { name: "홈으로 이동" }).click();
  await page.goto("http://localhost:3000/portfolio/130");
  await page.getByRole("heading", { name: "비공개 포트폴리오입니다." }).click();
  await page.getByRole("button", { name: "홈으로 이동" }).click();
  await page.getByRole("heading", { name: "SOFTWARE MEISTER" }).click();
});
