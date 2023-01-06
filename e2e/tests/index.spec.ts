import { test } from "@playwright/test";

test("Mainpage should have searchbar", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("검색이 가능합니다.");
  await page.getByRole("button", { name: "upload +" }).click();
  await page
    .locator('[id="__next"] div')
    .filter({
      hasText:
        "업로드동영상 업로드동영상 파일을 드래그 앤 드롭하여 업로드웹 파일 선택웹 파일을 드래그 앤 드롭하여 업로드다음",
    })
    .locator("path")
    .click();
  await page.getByRole("img", { name: "사용자 아바타" }).click();
});
