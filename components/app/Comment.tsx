import Image from "next/image";
import React from "react";
import fixture from "@/fixtures";
import { getTimeAgo } from "@/utils/date";

export default function Comment() {
  const commentDataList = fixture.commentList;
  return (
    <div>
      <div className="flex mt-[16px]">
        <Image
          src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
          alt="프로필"
          width={40}
          height={40}
          sizes="100px"
          className="rounded-full "
        />
        <input
          type="text"
          className="w-full ml-[16px] border-b-[1px] border-b-[#D9D9D9] outline-none"
          placeholder="댓글 추가.."
        />
      </div>
      <div className="mt-[36px]">
        {commentDataList.map((commentData) => {
          return (
            <div className="flex items-center mb-[32px]">
              <Image
                className="rounded-full mr-[16px]"
                src={commentData.userProfile}
                alt="프로필 사진"
                width={40}
                height={40}
              />
              <div>
                <div className="flex items-center">
                  <h2 className="font-bold text-[12px] mr-[10px]">
                    {commentData.userName}
                  </h2>
                  ·{" "}
                  <span className="color-[#3A3A3A] text-[10px]">
                    {getTimeAgo(commentData.createdDate)}
                  </span>
                </div>
                <p className="text-[14px]">{commentData.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
