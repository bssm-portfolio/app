import { test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1080 } });

test("Mainpage should have searchbar", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("검색이 가능합니다.");
  await page.getByRole("img", { name: "사용자 아바타" }).click();
  // await page.getByRole("button", { name: "upload +" }).click();
});

// test("업로드 form이 정상동작 해야한다.", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("button", { name: "upload +" }).click();
//   await page.getByRole("button", { name: "다음" }).click();
//   await page.getByRole("heading", { name: "제목" });
//   await page.getByRole("heading", { name: "설명" });
//   await page.getByRole("heading", { name: "기술스택(중복선택 가능)" });
//   await page.getByRole("heading", { name: "참여자 아이디" });
//   await page.getByRole("heading", { name: "Github 주소" });
//   await page.getByPlaceholder("제목").click();
//   await page.getByPlaceholder("제목").fill("제목입력가능해야합니다.");
//   await page.getByPlaceholder("제목").click();
//   await page.getByPlaceholder("설명").fill("설명입력가능해야합니다");
//   await page.getByPlaceholder("#해시태그").click();
//   await page
//     .getByPlaceholder("#해시태그")
//     .fill("참여자아이디 입력가능해야합니다.");
//   await page.getByPlaceholder("#해시태그").click();
//   await page
//     .getByPlaceholder("https://github.com/")
//     .fill("깃헙주소 입력가능해야합니다.");
//   await page.getByRole("button", { name: "이전" }).click();
// });

// login 테스트 추가 후 사용
// 로그인 해야 upload + 를 누를 수 있음.
// test("마지막 페이지 테스트", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("button", { name: "upload +" }).click();
//   await page.getByRole("button", { name: "다음" }).dblclick();
//   await page.getByRole("heading", { name: "공개범위" }).click();
//   await page.locator("label").filter({ hasText: "전체" }).click();
//   await page.getByLabel("전체").check();
//   await page.getByText("누구나 볼 수 있습니다.").click();
//   await page.getByLabel("일부").check();
//   await page.getByText("일부").click();
//   await page.getByText("링크가 있으면 누구든 볼 수 있습니다.").click();
//   await page.getByLabel("비공개").check();
//   await page.getByText("비공개").click();
//   await page.getByText("나와 내가 선택한 사람만 볼 수 있습니다.").click();
// });
