import { PortfolioType } from "@/types/portfolio.interface";

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
  return (
    <div className="w-full">
      {type === "URL" && (
        <iframe
          className="w-full h-full"
          src={portfolioUrl}
          title="portfolio"
        />
      )}
      {type === "VIDEO" && (
        <video src={videoUrl} controls className="w-full">
          <track default kind="captions" srcLang="ko" src={videoUrl} />
        </video>
      )}
      {type === "ALL" && (
        <div className="flex flex-wrap">
          <iframe
            className="w-full h-full"
            src={portfolioUrl}
            title="portfolio"
          />
          <video src={videoUrl} controls className="w-full" crossOrigin="true">
            <track default kind="captions" srcLang="ko" src={videoUrl} />
          </video>
        </div>
      )}
    </div>
  );
}
