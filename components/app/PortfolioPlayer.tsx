import { PortfolioType } from "@/types/portfolio.interface";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";

interface PortfolioProps {
  type: PortfolioType;
  portfolioUrl?: string;
  videoUrl?: string;
}

export default function PortfolioPlayer({
  portfolioUrl,
  videoUrl,
  type,
}: PortfolioProps) {
  const [selected, setSelected] = useState<"web" | "video">(
    type === "URL" ? "web" : "video",
  );
  useEffect(() => {
    setSelected(type === "URL" ? "web" : "video");
  }, [type]);

  return (
    <div className="w-full relative">
      <div className="flex items-end gap-1">
        <Button
          className={classNames(
            "h-10 disabled:bg-slate-600 disabled:text-white disabled:cursor-not-allowed rounded-b-none rounded-t-2xl",
            {
              "!bg-blue !text-white !h-11": selected === "web",
              "hover:bg-slate-300": selected !== "web",
            },
          )}
          varient="secondary"
          disabled={type === "VIDEO"}
          onClick={() => setSelected("web")}
        >
          웹
        </Button>
        <Button
          className={classNames(
            "h-10 disabled:bg-slate-600 disabled:text-white disabled:cursor-not-allowed rounded-b-none rounded-t-2xl",
            {
              "!bg-blue !text-white !h-11": selected === "video",
              "hover:bg-slate-300": selected !== "video",
            },
          )}
          varient="secondary"
          disabled={type === "URL"}
          onClick={() => setSelected("video")}
        >
          동영상
        </Button>
      </div>
      {selected === "web" && (
        <iframe
          className="w-full h-[50rem]"
          src={portfolioUrl}
          title="portfolio"
        />
      )}
      {selected === "video" && (
        <video src={videoUrl} controls className="w-full">
          <track default kind="captions" srcLang="ko" src={videoUrl} />
        </video>
      )}
    </div>
  );
}
