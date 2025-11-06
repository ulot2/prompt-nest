"use client";

import { useState, useTransition } from "react";
import { BiUpvote } from "react-icons/bi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { updateLike, updateDislike } from "@/actions/actions";

type VotingButtonsProps = {
  promptId: number;
  initialLikes: number;
  initialDislikes: number;
};

export const VotingButtons = ({
  promptId,
  initialLikes,
  initialDislikes,
}: VotingButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);

  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  const handleUpVote = () => {
    if (hasUpVoted) {
      setHasUpVoted(false);
      setLikeCount(likeCount - 1);
      startTransition(() => {
        updateLike(promptId, -1);
      });
    } else {
      setHasUpVoted(true);
      setLikeCount(likeCount + 1);

      if (hasDownVoted) {
        setHasDownVoted(false);
        setDislikeCount(dislikeCount - 1);

        startTransition(async () => {
          await updateLike(promptId, 1);
          await updateDislike(promptId, -1);
        });
      } else {
        startTransition(() => {
          updateLike(promptId, 1);
        });
      }
    }
  };

  const handleDownVote = () => {
    if (hasDownVoted) {
      setHasDownVoted(false);
      setDislikeCount(dislikeCount - 1);
      startTransition(() => {
        updateDislike(promptId, -1);
      });
    } else {
      setHasDownVoted(true);
      setDislikeCount(dislikeCount + 1);

      if (hasUpVoted) {
        setHasUpVoted(false);
        setLikeCount(likeCount - 1);

        startTransition(async () => {
          await updateLike(promptId, -1);
          await updateDislike(promptId, 1);
        });
      } else {
        startTransition(() => {
          updateDislike(promptId, 1);
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-[20px]">
      <button
        type="button"
        className={`flex items-center gap-[5px] ${
          hasUpVoted ? "bg-gray-100" : ""
        } hover:bg-gray-100 p-[0.4rem] rounded-lg cursor-pointer transition`}
        onClick={handleUpVote}
        disabled={isPending}
      >
        {hasUpVoted ? (
          <AiFillLike className="text-[20px]" />
        ) : (
          <AiOutlineLike className="text-[20px]" />
        )}
        <span className="text-[14px] font-semibold">{likeCount}</span>
      </button>
      <button
        type="button"
        className={`flex items-center gap-[5px] ${
          hasDownVoted ? "bg-red-100" : ""
        } hover:bg-gray-100 p-[0.4rem] rounded-lg cursor-pointer transition`}
        onClick={handleDownVote}
        disabled={isPending}
      >
        {hasDownVoted ? (
          <AiFillDislike className="text-[20px] text-red-600" />
        ) : (
          <AiOutlineDislike className="text-[20px]" />
        )}
        <span
          className={`text-[14px] ${
            hasDownVoted ? "font-semibold text-red-600" : ""
          }`}
        >
          {dislikeCount}
        </span>
      </button>
    </div>
  );
};
