import React from "react";
import { Portfolio } from "@/components";
import { useRouter } from "next/router";

export default function PortfolioList() {
  const router = useRouter();
  const moveDetail = () => router.push("/portfolio/123");
  return (
    <div className="flex gap-4 flex-wrap">
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
      <Portfolio onClick={moveDetail} />
    </div>
  );
}
