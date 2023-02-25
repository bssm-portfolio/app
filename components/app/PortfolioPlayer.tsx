import { PortfolioType } from "@/types/portfolio.interface";

interface PortfolioProps {
  url: string;
  type: PortfolioType;
}

export default function PortfolioPlayer({ url, type }: PortfolioProps) {
  return (
    <div className="w-full">
      {type === "URL" && (
        <iframe className="w-full h-full" src={url} title="portfolio" />
      )}
      {type === "VIDEO" && (
        <video src={url} controls className="w-full">
          <track default kind="captions" srcLang="ko" src={url} />
        </video>
      )}
      {type === "ALL" && (
        <div className="flex">
          <iframe className="w-full h-full" src={url} title="portfolio" />
          <video src={url} controls className="w-full">
            <track default kind="captions" srcLang="ko" src={url} />
          </video>
        </div>
      )}
    </div>
  );
}
