import React from "react";
import ReactMarkdown from "react-markdown";
import { Description } from "@/types/portfolio.interface";

export default function DescriptionView({ description }: Description) {
  return (
    <div className="px-large py-small bg-primary-light_gray rounded">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
}
