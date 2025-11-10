"use client";

import { useState, useTransition } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { updateUserVote } from "@/actions/actions";

type VotingButtonsProps = {
  promptId: number;
  initialLikes: number;
  initialDislikes: number;
  userVoteStatus: "LIKE" | "DISLIKE" | null;
  isLoggedIn: boolean;
};

export const VotingButtons = ({
  promptId,
  initialLikes,
  initialDislikes,
  userVoteStatus,
  isLoggedIn,
}: VotingButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);

  const [hasUpVoted, setHasUpVoted] = useState(userVoteStatus === "LIKE");
  const [hasDownVoted, setHasDownVoted] = useState(
    userVoteStatus === "DISLIKE"
  );

  const handleUpVote = () => {
    let newVoteType: "LIKE" | "DISLIKE" | "NONE";
    let newLikeCount = likeCount;
    let newDislikeCount = dislikeCount;

    if (hasUpVoted) {
      newVoteType = "NONE";
      newLikeCount--;
    } else if (hasDownVoted) {
      newVoteType = "LIKE";
      newLikeCount++;
      newDislikeCount--;
    } else {
      newVoteType = "LIKE";
      newLikeCount++;
    }

    setHasUpVoted(newVoteType === "LIKE");
    setHasDownVoted(false);
    setLikeCount(newLikeCount);
    setDislikeCount(newDislikeCount);

    const prevVoteStatus = userVoteStatus;

    startTransition(() => {
      updateUserVote(promptId, newVoteType).catch(() => {
        setHasUpVoted(prevVoteStatus === "LIKE");
        setHasDownVoted(prevVoteStatus === "DISLIKE");
        setLikeCount(initialLikes);
        setDislikeCount(initialDislikes);
      });
    });
  };

  const handleDownVote = () => {
    let newVoteType: "LIKE" | "DISLIKE" | "NONE";
    let newLikeCount = likeCount;
    let newDislikeCount = dislikeCount;

    if (hasDownVoted) {
      newVoteType = "NONE";
      newDislikeCount--;
    } else if (hasUpVoted) {
      newVoteType = "DISLIKE";
      newLikeCount--;
      newDislikeCount++;
    } else {
      newVoteType = "DISLIKE";
      newDislikeCount++;
    }

    setHasUpVoted(false);
    setHasDownVoted(newVoteType === "DISLIKE");
    setLikeCount(newLikeCount);
    setDislikeCount(newDislikeCount);

    const prevVoteStatus = userVoteStatus;

    startTransition(() => {
      updateUserVote(promptId, newVoteType).catch(() => {
        setHasUpVoted(prevVoteStatus === "LIKE");
        setHasDownVoted(prevVoteStatus === "DISLIKE");
        setLikeCount(initialLikes);
        setDislikeCount(initialDislikes);
      });
    });
  };

  return (
    <div className="flex items-center gap-[20px]">
      <button
        type="button"
        className={`flex items-center gap-[5px] p-[0.4rem] rounded-lg cursor-pointer transition 
          ${isLoggedIn ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"} 
          ${hasUpVoted && isLoggedIn ? "bg-gray-100" : ""}
        `}
        onClick={handleUpVote}
        disabled={!isLoggedIn || isPending}
      >
        {hasUpVoted && isLoggedIn ? (
          <AiFillLike className="text-[20px]" />
        ) : (
          <AiOutlineLike className="text-[20px]" />
        )}
        <span className="text-[14px] font-semibold">{likeCount}</span>
      </button>
      <button
        type="button"
        className={`flex items-center gap-[5px] p-[0.4rem] rounded-lg cursor-pointer transition 
          ${isLoggedIn ? "hover:bg-red-100" : "opacity-50 cursor-not-allowed"}
          ${hasDownVoted && isLoggedIn ? "bg-red-100" : ""}
        `}
        onClick={handleDownVote}
        disabled={!isLoggedIn || isPending}
      >
        {hasDownVoted && isLoggedIn ? (
          <AiFillDislike className={"text-[20px] text-red-600"} />
        ) : (
          <AiOutlineDislike className="text-[20px]" />
        )}
        <span
          className={`text-[14px] ${
            hasDownVoted && isLoggedIn ? "font-semibold text-red-600" : ""
          }`}
        >
          {dislikeCount}
        </span>
      </button>
    </div>
  );
};
