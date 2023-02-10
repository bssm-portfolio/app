import Image from "next/image";
import { getTimeAgo } from "@/utils/date";
import { useCommentList } from "@/models/portfolio";
import { SubmitHandler, useForm } from "react-hook-form";
import httpClient from "@/apis";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

interface CommentForm {
  content: string;
}

export default function CommentList({
  portfolioId = 0,
}: {
  portfolioId: number;
}) {
  const { user } = useUser();
  const { list } = useCommentList(portfolioId);
  const { register, handleSubmit } = useForm<CommentForm>();

  const onValid: SubmitHandler<CommentForm> = async (submitData) => {
    await httpClient.comment.post({
      portfolioId,
      ...submitData,
    });
  };

  return (
    <div>
      <form className="flex mt-base" onSubmit={handleSubmit(onValid)}>
        <Image
          src={user.profileImageUrl}
          alt="프로필"
          width={40}
          height={40}
          sizes="100px"
          className="rounded-full"
        />
        <input
          type="text"
          className="w-full ml-base border-b-[0.0625rem] border-b-border-gray outline-none"
          placeholder="댓글 추가.."
          {...register("content")}
        />
      </form>
      <div className="mt-2xlarge">
        {list.map((comment) => {
          return (
            <div
              className="flex items-center mb-xlarge"
              key={comment.commentId}
            >
              <Image
                className="rounded-full mr-base"
                src={comment.writer.profileImageUrl}
                alt="프로필 사진"
                width={40}
                height={40}
              />
              <div>
                <div className="flex items-center">
                  <h2 className="font-bold text-small mr-xsmall">
                    {comment.writer.name}
                  </h2>
                  ·{" "}
                  <span className="text-primary-dark_gray text-xsmall">
                    {getTimeAgo(new Date(comment.createdDate))}
                  </span>
                </div>
                <p className="text-middle">{comment.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
