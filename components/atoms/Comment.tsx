import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Comment, CommentForm } from "@/types/portfolio.interface";
import { getErrorProperty } from "@/utils/input";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useReducer } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Avatar from "../common/Avatar";
import { DownIcon, EmptyHeartIcon } from "../Icon";
import FilledHeartIcon from "../Icon/FilledHeartIcon";
import CommentContent from "./CommentContent";
import InputButton from "./InputButton";

interface CommentViewProps {
  comment: Comment;
  profileImageUrl: string;
  isEmptyUser: boolean;
  portfolioId: number;
}

export default function CommentView({
  comment,
  profileImageUrl,
  isEmptyUser,
  portfolioId,
}: CommentViewProps) {
  const queryClient = useQueryClient();
  const { openToast } = useOverlay();
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [isReplyListOpen, toggleReplyListOpen] = useReducer(
    (state) => !state,
    false,
  );
  const [isCommentFormOpen, toggleCommentForm] = useReducer(
    (state) => !state,
    false,
  );

  const handleLike = () => {
    httpClient.comment
      .bookmark({ commentId: comment.commentId })
      .then(() => queryClient.invalidateQueries([KEY.COMMENT]))
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  const onValid: SubmitHandler<CommentForm> = async (submitData) => {
    await httpClient.comment.post({
      portfolioId,
      parentId: comment.commentId,
      ...submitData,
    });
    reset();
    queryClient.invalidateQueries([KEY.COMMENT]);
  };

  const onInValid: SubmitErrorHandler<CommentForm> = (inValidData) => {
    openToast(
      `${getErrorProperty<CommentForm>(inValidData)}을(를) 확인해주세요.`,
      {
        type: "danger",
      },
    );
  };

  const handleReplyListOpen = () => toggleReplyListOpen();
  const handlesetCommentFormOpen = () => toggleCommentForm();

  return (
    <div className="flex flex-col mb-[22px]">
      <CommentContent comment={comment} />

      <div className="ml-14">
        <div className="flex mt-2.5 gap-2.5">
          <InputButton
            varient="secondary"
            onClick={handleLike}
            className="flex items-center gap-1.5 font-normal"
          >
            {comment.bookmarkYn ? <FilledHeartIcon /> : <EmptyHeartIcon />}
            {comment.bookmarks}
          </InputButton>

          <InputButton
            className="font-normal"
            onClick={handlesetCommentFormOpen}
          >
            답글
          </InputButton>
        </div>

        {isCommentFormOpen && (
          <form
            className="flex mt-base relative"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="w-full flex items-center mt-2.5">
              <Avatar imageUrl={profileImageUrl} width={30} height={30} />
              <input
                type="text"
                className="w-full pr-14 ml-base border-b-[0.0625rem] border-b-border-gray outline-none disabled:bg-white disabled:cursor-not-allowed"
                placeholder={
                  !isEmptyUser ? "답글 추가.." : "로그인이 필요합니다."
                }
                {...register("content", {
                  required: "답글 내용은 필수 항목입니다.",
                })}
                disabled={isEmptyUser}
              />
              <InputButton
                className="absolute top-1 right-1"
                onClick={handleSubmit(onValid, onInValid)}
                disabled={isEmptyUser}
              >
                입력
              </InputButton>
            </div>
          </form>
        )}

        {!!comment.replyList.length && (
          <div
            className="select-none flex items-center cursor-pointer mt-2.5"
            onClick={handleReplyListOpen}
          >
            답글 {comment.replyList.length}개
            <DownIcon
              className={classNames("ml-1.5 rotate-180", {
                "!rotate-0": !isReplyListOpen,
              })}
            />
          </div>
        )}
        {isReplyListOpen &&
          comment.replyList.map((reply) => (
            <CommentContent comment={reply} isReply key={reply.commentId} />
          ))}
      </div>
    </div>
  );
}
