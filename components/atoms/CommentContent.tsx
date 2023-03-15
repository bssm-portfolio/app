import classNames from "classnames";
import httpClient from "@/apis";
import KEY from "@/models/key";
import { Comment } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Avatar from "../common/Avatar";
import InputButton from "./InputButton";
import Kebab from "../common/KebabMenu";
import TrashCanIcon from "../Icon/TrashCanIcon";
import EditIcon from "../Icon/EditIcon";

interface CommentContentProps {
  comment: Comment;
  isReply?: boolean;
}

export default function CommentContent({
  comment,
  isReply = false,
}: CommentContentProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const originalContent = useRef(comment.content);

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
    await httpClient.comment.delete({}, { commentId });
    setIsEdit(false);
    queryClient.invalidateQueries([KEY.COMMENT]);
  };

  return (
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
              className={classNames("ml-1 text-primary-dark_gray text-2xs", {
                "!text-[0.5rem]": isReply,
              })}
            >
              · {getTimeAgo(comment.createdDate)}
            </span>
          </div>

          {isEdit ? (
            <div className="relative">
              <input
                type="text"
                className="w-full border-b border-b-primary-border_gray mb-1 pb-3 pr-8 focus:outline-none"
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
            <p
              className={classNames("text-sm", {
                "!text-xs": isReply,
              })}
            >
              {comment.content}
            </p>
          )}
        </div>

        {comment.deletable && !isEdit && (
          <Kebab.Provider className="z-10">
            <Kebab.Menu className="rounded">
              {comment.editable && (
                <Kebab.Item
                  className="pb-[0.3125rem] rounded-t"
                  onClick={() => setIsEdit(true)}
                >
                  <EditIcon className="w-3 h-3 mr-3" />
                  <span>수정</span>
                </Kebab.Item>
              )}
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
  );
}
