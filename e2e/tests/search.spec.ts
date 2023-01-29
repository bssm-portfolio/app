import { test } from "@playwright/test";

test("검색 기능 테스트", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("검색").click();
  await page.getByPlaceholder("검색").fill("안녕하세요");
  await page.getByPlaceholder("검색").click();
  await page.getByPlaceholder("검색").press("Enter");
  await page.locator("div").filter({ hasText: "필터" }).nth(4).click();
  await page
    .getByText(
      "포트폴리오4박정호Amazon Route 53Amazon WorkDocs조회수 0회 · 1일 전포트폴리오3박정호Amazon ConnectAmazo",
    )
    .click();
  await page.getByRole("heading", { name: "추천 프로젝트" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "팔로잉" }).click();
  await page.getByRole("button", { name: "공유" }).click();
  await page.locator(".inline").click();
  await page
    .getByText("Amazon ConnectAmazon Elastic Container Registry (ECR)")
    .first()
    .click();
  await page
    .getByText(
      "포트폴리오3박정호Amazon ConnectAmazon Elastic Container Registry (ECR)조회수 0회 · 2023년 1월 ",
    )
    .click();
  await page.getByText("조회수 0회 · 2023년 1월 28일").click();
});
