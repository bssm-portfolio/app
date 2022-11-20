import fixture from "@/fixtures";
import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";

interface PortfolioProps {
  onClick?: () => void;
}

export default function Portfolio({ onClick }: PortfolioProps) {
  return (
    <div className="flex flex-col" onClick={onClick}>
      <Image
        src={fixture.portfolioUrl}
        alt="포트폴리오이미지"
        width={400}
        height={300}
      />
      <div className="flex w-full ">
        <Avatar imageUrl={fixture.avatarUrl} />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div>프로젝트이름</div>
            <div className="flex">
              <div>좋아요1개</div>
              <div>조회수1개</div>
            </div>
          </div>
          <div>작성자</div>
        </div>
      </div>
    </div>
  );
}
