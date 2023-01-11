interface PortfolioProps {
  url: string;
}

export default function PortfolioPlayer({ url }: PortfolioProps) {
  return (
    <div className="w-full h-[31.25rem]">
      <iframe className="w-full h-full" src={url} title="portfolio">
        portfolio 가 들어가야 할 곳
      </iframe>
    </div>
  );
}
