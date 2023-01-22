import Markdown from "marked-react";
import { Description } from "@/types/portfolio.interface";

export default function DescriptionView({ description }: Description) {
  return (
    <div className="px-large py-small bg-primary-light_gray rounded">
      <Markdown>{description}</Markdown>
    </div>
  );
}
