import Markdown from "marked-react";
import { Description } from "@/types/portfolio.interface";

export default function DescriptionView({ children }: Description) {
  return (
    <div className="prose max-w-none">
      <Markdown>{children}</Markdown>
    </div>
  );
}
