import Image from "next/image";
import React from "react";
import fixture from "@/fixtures";
import { getTimeAgo } from "@/utils/date";

export default function Comment() {
  const commentDataList = fixture.commentList;
  return (
    <div>
      <div className="flex mt-base">
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
          className="w-full ml-base border-b-[0.0625rem] border-b-border-gray outline-none"
          placeholder="댓글 추가.."
        />
      </div>
      <div className="mt-2xlarge">
        {commentDataList.map((commentData) => {
          return (
            <div className="flex items-center mb-xlarge">
              <Image
                className="rounded-full mr-base"
                src={commentData.userProfile}
                alt="프로필 사진"
                width={40}
                height={40}
              />
              <div>
                <div className="flex items-center">
                  <h2 className="font-bold text-small mr-xsmall">
                    {commentData.userName}
                  </h2>
                  ·{" "}
                  <span className="text-primary-dark_gray text-xsmall">
                    {getTimeAgo(commentData.createdDate)}
                  </span>
                </div>
                <p className="text-middle">{commentData.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
