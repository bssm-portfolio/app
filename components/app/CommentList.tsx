import Image from "next/image";
import { useCommentList } from "@/models/portfolio";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { checkInputValueIsNull } from "@/utils/input";
import httpClient from "@/apis";
import useUser from "@/hooks/useUser";
import { CommentForm } from "@/types/portfolio.interface";
import config from "@/config";
import InputButton from "../atoms/InputButton";
import CommentView from "../atoms/Comment";

export default function CommentList({ portfolioId }: { portfolioId?: number }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user: userInfo } = useUser();
  const { list: commentList, refetch } = useCommentList(portfolioId);
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [isWriting, setIsWriting] = useState(false);
  const isEmptyUser = userInfo.memberId === 0;

  const { ref, ...rest } = register("content", {
    required: "댓글 내용은 필수 항목입니다.",
  });

  const onValid: SubmitHandler<CommentForm> = async (submitData) => {
    await httpClient.comment.post({
      portfolioId,
      parentId: null,
      ...submitData,
    });
    reset();
    refetch();
  };

  const handleInput = (event: never) => {
    inputRef.current = event;
    ref(event);
  };

  return (
    <div className="bg-white mt-2 p-3 box-border rounded">
      <form className="flex mt-base relative" onSubmit={handleSubmit(onValid)}>
        <Image
          src={userInfo.profileImageUrl || config.defaultProfile}
          alt="프로필"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          type="text"
          className="w-full ml-base border-b-[0.0625rem] border-b-border-gray outline-none disabled:bg-white disabled:cursor-not-allowed"
          placeholder={!isEmptyUser ? "댓글 추가.." : "로그인이 필요합니다."}
          {...rest}
          ref={handleInput}
          onChange={() => setIsWriting(checkInputValueIsNull(inputRef))}
          disabled={isEmptyUser}
        />
        {isWriting && (
          <InputButton
            type="submit"
            className="absolute top-0 right-1"
            onClick={handleSubmit(onValid)}
            disabled={isEmptyUser}
          >
            입력
          </InputButton>
        )}
      </form>

      <div className="mt-2xlarge">
        {commentList.map((comment) => (
          <CommentView
            comment={comment}
            profileImageUrl={userInfo.profileImageUrl || config.defaultProfile}
            isEmptyUser={isEmptyUser}
            portfolioId={Number(portfolioId)}
            key={comment.commentId}
          />
        ))}
      </div>
    </div>
  );
}
