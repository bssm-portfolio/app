import { test, expect } from "@playwright/test";

test("Mainpage should have searchbar", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "검" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("검색이 가능합니다.");
  await page.getByRole("img", { name: "사용자 아바타" }).click();
});
