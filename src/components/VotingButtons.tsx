"use client";

import { useState, useTransition } from "react";
import { BiUpvote } from "react-icons/bi";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { updateVote } from "@/actions/actions";

type VotingButtonsProps = {
  promptId: number;
  initialVotes: number;
};

export const VotingButtons = ({
  promptId,
  initialVotes,
}: VotingButtonsProps) => {
  const [isPending, startTransition] = useTransition();
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  const handleUpVote = () => {
    if (!hasUpVoted) {
      setHasUpVoted(true);
      setHasDownVoted(false);
      setUpVoteCount(upVoteCount + 1);

      // startTransition(() => {
      //   updateVote(promptId, "up");
      // });
    }
  };

  const handleDownVote = () => {
    if (!hasDownVoted) {
      setHasDownVoted(true);
      setHasUpVoted(false);
      setDownVoteCount(downVoteCount + 1);

      // startTransition(() => {
      //   updateVote(promptId, "down");
      // });
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
      >
        {hasUpVoted ? (
          <AiFillLike className="text-[20px]" />
        ) : (
          <AiOutlineLike className="text-[20px]" />
        )}
        <span className="text-[14px] font-semibold">{upVoteCount}</span>
      </button>
      <button
        type="button"
        className={`flex items-center gap-[5px] ${
          hasDownVoted ? "bg-red-100" : ""
        } hover:bg-gray-100 p-[0.4rem] rounded-lg cursor-pointer transition`}
        onClick={handleDownVote}
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
          {downVoteCount}
        </span>
      </button>
    </div>
  );
};
