import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { RefetchType } from "@/types/index.interface";
import { Comment } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "../common/Avatar";
import Kebab from "../common/KebabMenu";
import { EmptyHeartIcon } from "../Icon";
import EditIcon from "../Icon/EditIcon";
import FilledHeartIcon from "../Icon/FilledHeartIcon";
import TrashCanIcon from "../Icon/TrashCanIcon";
import InputButton from "./InputButton";

interface CommentViewProps {
  comment: Comment;
  refetch: RefetchType;
}

export default function CommentView({ comment, refetch }: CommentViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openToast } = useOverlay();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isReplyListOpen, setIsReplyListOpen] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [originalContent] = useState<string>(comment.content);

  const handleDelete = async (commentId: number) => {
    await httpClient.comment.delete({ data: { commentId } });
    setIsEdit(false);
    refetch();
  };

  const handleLike = () => {
    httpClient.comment
      .bookmark({ commentId: comment.commentId })
      .then(() => queryClient.invalidateQueries([KEY.COMMENT]))
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  const handleReplyListOpen = () => {
    setIsReplyListOpen((prev) => !prev);
  };

  const moveToProfile = () =>
    router.push(`/profile/${comment.writer.memberId}`);

  const handleEditComplete = async (commentId: number) => {
    await httpClient.comment.put({
      commentId,
      content: editContent,
    });
    setIsEdit(false);
    refetch();
  };

  const handleEditCancel = () => {
    setEditContent(originalContent);
    setIsEdit(false);
  };

  return (
    <div className="flex flex-col justify-start mb-xlarge">
      <div className="flex items-center">
        <div
          className="relative w-10 h-10 mr-base cursor-pointer"
          onClick={moveToProfile}
        >
          <Avatar imageUrl={comment.writer.profileImageUrl} />
        </div>

        <div className="w-full flex justify-between">
          <div className="w-full">
            <div className="flex items-center">
              <span
                className="font-bold text-small mr-xsmall cursor-pointer"
                onClick={moveToProfile}
              >
                {comment.writer.name}
              </span>
              <span>·</span>
              <span className="ml-1 text-primary-dark_gray text-xsmall">
                {getTimeAgo(comment.createdDate)}
              </span>
            </div>
            {isEdit ? (
              <div className="relative">
                <input
                  type="text"
                  className="w-full border-b border-b-primary-border_gray mb-1 pb-3 pr-8 focus:outline-none"
                  value={editContent}
                  onChange={(event) => {
                    setEditContent(event.target.value);
                  }}
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
              <p className="text-middle">{comment.content}</p>
            )}
          </div>

          {comment.editable && !isEdit && (
            <Kebab.Provider className="z-10">
              <Kebab.Menu className="rounded">
                <Kebab.Item
                  className="pb-[0.3125rem] rounded-t"
                  onClick={() => setIsEdit(true)}
                >
                  <EditIcon className="w-3 h-3 mr-3" />
                  <span>수정</span>
                </Kebab.Item>
                <Kebab.Item
                  className="pt-[0.3125rem] rounded-b"
                  onClick={() => handleDelete(comment.commentId)}
                >
                  <TrashCanIcon className="w-3 h-3 mr-3" />
                  <span>삭제</span>
                </Kebab.Item>
              </Kebab.Menu>
            </Kebab.Provider>
          )}
        </div>
      </div>
      <div className="flex mt-2.5 gap-2.5">
        <InputButton
          varient="secondary"
          onClick={handleLike}
          className="flex items-center gap-1.5"
        >
          {comment.bookmarkYn ? <FilledHeartIcon /> : <EmptyHeartIcon />}
          {comment.bookmarks}
        </InputButton>

        <InputButton className="font-normal" onClick={handleReplyListOpen}>
          답글
        </InputButton>
      </div>
      {/* <div>{comment.replyList.map((reply) => )}</div> */}
      {!!comment.replyList.length && isReplyListOpen && <div>djawnstlr</div>}
    </div>
  );
}
