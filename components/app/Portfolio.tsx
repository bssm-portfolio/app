import { urlState } from "@/store";
import { useRecoilState } from "recoil";

export default function Portfolio() {
  const [url] = useRecoilState(urlState);
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        style={{ border: "2px dashed red" }}
        src={url}
        title="portfolio"
      >
        portfolio 가 들어가야 할 곳
      </iframe>
    </div>
  );
}
