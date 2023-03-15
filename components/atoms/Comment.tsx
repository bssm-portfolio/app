import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Comment } from "@/types/portfolio.interface";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import { DownIcon, EmptyHeartIcon } from "../Icon";
import FilledHeartIcon from "../Icon/FilledHeartIcon";
import CommentContent from "./CommentContent";
import InputButton from "./InputButton";

interface CommentViewProps {
  comment: Comment;
}

export default function CommentView({ comment }: CommentViewProps) {
  const queryClient = useQueryClient();
  const { openToast } = useOverlay();
  const [isReplyListOpen, setIsReplyListOpen] = useState<boolean>(false);

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

          <InputButton className="font-normal">답글</InputButton>
        </div>

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
            <CommentContent comment={reply} isReply />
          ))}
      </div>
    </div>
  );
}
