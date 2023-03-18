import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Comment, CommentForm } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { getErrorProperty } from "@/utils/input";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useReducer, useRef, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Avatar from "../common/Avatar";
import KebabMenu from "../common/KebabMenu";
import { DownIcon, EmptyHeartIcon } from "../Icon";
import EditIcon from "../Icon/EditIcon";
import FilledHeartIcon from "../Icon/FilledHeartIcon";
import TrashCanIcon from "../Icon/TrashCanIcon";
import InputButton from "./InputButton";

interface CommentViewProps {
  comment: Comment;
  profileImageUrl: string;
  isEmptyUser: boolean;
  portfolioId: number;
  isReply: boolean;
}

export default function CommentView({
  comment,
  profileImageUrl,
  isEmptyUser,
  portfolioId,
  isReply,
}: CommentViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const originalContent = useRef(comment.content);
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

  const moveToProfile = () =>
    router.push(`/profile/${comment.writer.memberId}`);

  const handleEditComplete = async (commentId: number) => {
    await httpClient.comment.put({
      commentId,
      content: editContent,
    });
    setIsEdit(false);
    queryClient.invalidateQueries([KEY.COMMENT]);
  };

  const handleEditCancel = () => {
    setEditContent(originalContent.current);
    setIsEdit(false);
  };

  const handleDelete = async (commentId: number) => {
    await httpClient.comment.delete({ data: { commentId } });
    setIsEdit(false);
    queryClient.invalidateQueries([KEY.COMMENT]);
  };

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
    <div className={classNames("flex flex-col", { "mb-5": !isReply })}>
      <div className="w-full flex justify-between mt-2.5">
        <Avatar
          imageUrl={comment.writer.profileImageUrl}
          className={classNames("w-10 h-10 mr-base cursor-pointer", {
            "w-7.5 h-7.5": isReply,
          })}
          onClick={moveToProfile}
          width={40}
          height={40}
        />
        <div className="w-full flex justify-between items-center">
          <div className="w-full">
            <div className="flex items-center">
              <span
                className={classNames(
                  "font-bold text-xs mr-xsmall cursor-pointer",
                  {
                    "!text-2xs": isReply,
                  },
                )}
                onClick={moveToProfile}
              >
                {comment.writer.name}
              </span>
              <span
                className={classNames(
                  "ml-1 break-all text-primary-dark_gray text-2xs",
                  {
                    "!text-[0.5rem]": isReply,
                  },
                )}
              >
                · {getTimeAgo(comment.createdDate)}
              </span>
            </div>
            {isEdit ? (
              <div className="relative">
                <input
                  type="text"
                  className="w-full border-b pr-24 pb-3 border-b-primary-border_gray mb-1 focus:outline-none"
                  value={editContent}
                  onChange={(event) => setEditContent(event.target.value)}
                />
                <div className="absolute top-0 right-0">
                  <InputButton
                    onClick={handleEditCancel}
                    varient="secondary"
                    className="font-medium mr-2"
                  >
                    취소
                  </InputButton>
                  <InputButton
                    onClick={() => handleEditComplete(comment.commentId)}
                    className="font-medium"
                  >
                    입력
                  </InputButton>
                </div>
              </div>
            ) : (
              <span
                className={classNames("break-all text-sm", {
                  "!text-xs": isReply,
                })}
              >
                {comment.content}
              </span>
            )}
            <div>
              {!isReply && (
                <div className="flex mt-2.5 gap-2.5">
                  <InputButton
                    varient="secondary"
                    onClick={handleLike}
                    className="flex items-center gap-1.5 font-normal"
                  >
                    {comment.bookmarkYn ? (
                      <FilledHeartIcon />
                    ) : (
                      <EmptyHeartIcon />
                    )}
                    {comment.bookmarks}
                  </InputButton>

                  <InputButton
                    className="font-normal"
                    onClick={handlesetCommentFormOpen}
                  >
                    답글
                  </InputButton>
                </div>
              )}

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
                  <CommentView
                    comment={reply}
                    isEmptyUser={isEmptyUser}
                    portfolioId={portfolioId}
                    profileImageUrl={profileImageUrl}
                    isReply
                  />
                ))}
            </div>
          </div>

          {comment.deletable && !isEdit && (
            <KebabMenu.Provider className="ml-2">
              <KebabMenu.Menu className="rounded">
                {comment.editable && (
                  <KebabMenu.Item
                    className="pb-[0.3125rem] rounded-t"
                    onClick={() => setIsEdit(true)}
                  >
                    <EditIcon className="w-3 h-3 mr-3" />
                    <span>수정</span>
                  </KebabMenu.Item>
                )}
                <KebabMenu.Item
                  className="pt-[0.3125rem] rounded-b"
                  onClick={() => handleDelete(comment.commentId)}
                >
                  <TrashCanIcon className="w-3 h-3 mr-3" />
                  <span>삭제</span>
                </KebabMenu.Item>
              </KebabMenu.Menu>
            </KebabMenu.Provider>
          )}
        </div>
      </div>
    </div>
  );
}
