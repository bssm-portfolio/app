import { urlState } from "@/store";
import { useRecoilState } from "recoil";
import { Button } from "@/components";

export default function SideMenu() {
  const [_, setUrl] = useRecoilState(urlState);
  return (
    <div className="bg-blue-100 w-full h-full flex flex-col gap-2">
      <Button
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
        url 입력해서 되는지 테스트
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { testurl } = e.target as any;
            if (testurl?.value) setUrl(testurl.value);
          }}
        >
          <input name="testurl" />
          <input type="submit" value="입력한 url 띄우기" />
        </form>
      </div>
    </div>
  );
}
