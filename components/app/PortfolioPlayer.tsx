import { PortfolioType } from "@/types/portfolio.interface";

interface PortfolioProps {
  url: string;
  type: PortfolioType;
}

export default function PortfolioPlayer({ url, type }: PortfolioProps) {
  return (
    <div className="w-full">
      {type === "URL" ? (
        <iframe className="w-full h-full" src={url} title="portfolio">
          portfolio 가 들어가야 할 곳
        </iframe>
      ) : (
        <video src={url} controls className="w-full">
          <track default kind="captions" srcLang="ko" src={url} />
        </video>
      )}
    </div>
  );
}
