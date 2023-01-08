import { test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1080 } });

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

test("업로드 form이 정상동작 해야한다.", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "upload +" }).click();
  await page.getByRole("button", { name: "다음" }).click();
  await page.getByRole("heading", { name: "제목" });
  await page.getByRole("heading", { name: "설명" });
  await page.getByRole("heading", { name: "기술스택(중복선택 가능)" });
  await page.getByRole("heading", { name: "참여자 아이디" });
  await page.getByRole("heading", { name: "Github 주소" });
  await page.getByPlaceholder("제목").click();
  await page.getByPlaceholder("제목").fill("제목입력가능해야합니다.");
  await page.getByPlaceholder("제목").click();
  await page.getByPlaceholder("설명").fill("설명입력가능해야합니다");
  await page.getByPlaceholder("#해시태그").click();
  await page
    .getByPlaceholder("#해시태그")
    .fill("참여자아이디 입력가능해야합니다.");
  await page.getByPlaceholder("#해시태그").click();
  await page
    .getByPlaceholder("https://github.com/")
    .fill("깃헙주소 입력가능해야합니다.");
  await page.getByRole("button", { name: "이전" }).click();
});

test("마지막 페이지 제출 가능", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "다음" }).click();
  await page.getByRole("heading", { name: "공개범위" }).click();
  await page.getByText("전체").click();
  await page.getByText("누구나 볼 수 있습니다.").click();
  await page
    .locator('[id="__next"] div')
    .filter({ hasText: "전체누구나 볼 수 있습니다." })
    .nth(3)
    .click();
  await page
    .locator('[id="__next"] div')
    .filter({ hasText: "일부링크가 있으면 누구든 볼 수 있습니다." })
    .nth(3)
    .click();
  await page
    .locator('[id="__next"] div')
    .filter({ hasText: "비공개나와 내가 선택한 사람만 볼 수 있습니다." })
    .nth(3)
    .click();
  await page.getByRole("radio").nth(1).check();
  await page.getByRole("radio").nth(2).check();
  await page.getByRole("button", { name: "완료" }).click();
});
