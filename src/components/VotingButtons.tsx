"use client";

import { useState, useTransition } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { updateUserVote } from "@/actions/actions";
import toast from "react-hot-toast";

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

    startTransition(async () => {
      try {
        await updateUserVote(promptId, newVoteType);
      } catch (error: any) {
        toast.error(
          error.message || "Failed to submit vote. Please try again."
        );
        setHasUpVoted(prevVoteStatus === "LIKE");
        setHasDownVoted(prevVoteStatus === "DISLIKE");
        setLikeCount(initialLikes);
        setDislikeCount(initialDislikes);
      }
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

    startTransition(async () => {
      try {
        await updateUserVote(promptId, newVoteType);
      } catch (error: any) {
        toast.error(
          error.message || "Failed to submit vote. Please try again."
        );
        setHasUpVoted(prevVoteStatus === "LIKE");
        setHasDownVoted(prevVoteStatus === "DISLIKE");
        setLikeCount(initialLikes);
        setDislikeCount(initialDislikes);
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200
          ${
            isLoggedIn
              ? "hover:bg-indigo-50 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          } 
          ${
            hasUpVoted && isLoggedIn
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-500"
          }
        `}
        onClick={handleUpVote}
        disabled={!isLoggedIn}
      >
        {hasUpVoted && isLoggedIn ? (
          <AiFillLike className="text-base text-indigo-600" />
        ) : (
          <AiOutlineLike className="text-base" />
        )}
        <span
          className={`text-xs font-semibold ${
            hasUpVoted && isLoggedIn ? "text-indigo-600" : ""
          }`}
        >
          {likeCount}
        </span>
      </button>
      <button
        type="button"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200
          ${
            isLoggedIn
              ? "hover:bg-rose-50 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }
          ${
            hasDownVoted && isLoggedIn
              ? "bg-rose-50 text-rose-600"
              : "text-gray-500"
          }
        `}
        onClick={handleDownVote}
        disabled={!isLoggedIn}
      >
        {hasDownVoted && isLoggedIn ? (
          <AiFillDislike className="text-base text-rose-600" />
        ) : (
          <AiOutlineDislike className="text-base" />
        )}
        <span
          className={`text-xs font-semibold ${
            hasDownVoted && isLoggedIn ? "text-rose-600" : ""
          }`}
        >
          {dislikeCount}
        </span>
      </button>
    </div>
  );
};
