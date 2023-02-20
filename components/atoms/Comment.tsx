import httpClient from "@/apis";
import { RefetchType } from "@/types/index.interface";
import { Comment } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "../common/Avatar";
import Kebab from "../common/KebabMenu";
import EditIcon from "../Icon/EditIcon";
import TrashCanIcon from "../Icon/TrashCanIcon";
import InputButton from "./InputButton";

interface CommentViewProps {
  comment: Comment;
  refetch: RefetchType;
}

export default function CommentView({ comment, refetch }: CommentViewProps) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [originalContent] = useState<string>(comment.content);

  const handleDelete = async (commentId: number) => {
    await httpClient.comment.delete({ data: { commentId } });
    setIsEdit(false);
    refetch();
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
    <div className="flex items-center mb-xlarge">
      <div
        className="relative w-10 h-10 mr-base cursor-pointer"
        onClick={moveToProfile}
      >
        <Avatar
          className="rounded-full"
          imageUrl={comment.writer.profileImageUrl}
        />
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
          <Kebab.Provider>
            <Kebab.Menu>
              <Kebab.Item className="pb-[0.3125rem]">
                <EditIcon className="w-3 h-3 mr-3" />
                <span onClick={() => setIsEdit(true)}>수정</span>
              </Kebab.Item>
              <Kebab.Item className="pt-[0.3125rem]">
                <TrashCanIcon className="w-3 h-3 mr-3" />
                <span onClick={() => handleDelete(comment.commentId)}>
                  삭제
                </span>
              </Kebab.Item>
            </Kebab.Menu>
          </Kebab.Provider>
        )}
      </div>
    </div>
  );
}
