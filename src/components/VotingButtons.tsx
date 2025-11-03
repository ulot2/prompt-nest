"use client";

import { useState, useTransition } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
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
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  const handleUpVote = () => {
    if (!hasUpVoted) {
      setHasUpVoted(true);
      setHasDownVoted(false);
      setVoteCount(voteCount + 1);

      startTransition(() => {
        updateVote(promptId, "up");
      });
    }
  };

  const handleDownVote = () => {
    if (!hasDownVoted) {
      setHasDownVoted(true);
      setHasUpVoted(false);
      setVoteCount(voteCount - 1);

      startTransition(() => {
        updateVote(promptId, "down");
      });
    }
  };

  return (
    <div className="flex items-center gap-[10px]">
      <button
        type="button"
        className={`text-[18px] hover:bg-[#e9ebef] p-[0.3rem] rounded-lg transition ${
          hasUpVoted ? "text-[blue]" : "text-gray-500"
        }`}
        onClick={handleUpVote}
        disabled={isPending}
      >
        <BiUpvote />
        <span className="sr-only">UpVote</span>
      </button>
      <p>{voteCount}</p>
      <button
        type="button"
        className={`text-[18px] hover:bg-[#e9ebef] p-[0.3rem] rounded-lg transition ${
          hasDownVoted ? "text-[red]" : "text-gray-500"
        }`}
        onClick={handleDownVote}
        disabled={isPending}
      >
        <BiDownvote />
        <span className="sr-only">DownVote</span>
      </button>
    </div>
  );
};
