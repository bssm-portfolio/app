// import { urlState } from "@/store";
// import { useRecoilState } from "recoil";
// import { Button } from "@/components";

import SideMenuItem from "../atoms/SideMenuItem";

export default function SideMenu() {
  // const [url, setUrl] = useRecoilState(urlState);
  return (
    <div>
      <h2 className="text-[16px] font-bold">추천 프로젝트</h2>
      <SideMenuItem />
      {/* <Button
        className="bg-blue-50 p-10"
        onClick={() => setUrl("https://www.nexon.com/Home/Game")}
      >
        nexon
      </Button>
      <Button
        className="bg-blue-50 p-10"
        onClick={() =>
          setUrl(
            "https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0",
          )
        }
      >
        naver blog
      </Button>
      <Button
        className="bg-blue-50 p-10"
        onClick={() => setUrl("https://comic.naver.com/webtoon/weekday")}
      >
        naver webtoon
      </Button>
      <div>
        url 입력해서 되는지 테스트 : 선택된 url : {url}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { testurl } = e.target as unknown as {
              testurl: { value: string };
            };
            if (testurl?.value) setUrl(testurl.value);
          }}
        >
          <input name="testurl" />
          <input type="submit" value="입력한 url 띄우기" />
        </form>
      </div> */}
    </div>
  );
}
