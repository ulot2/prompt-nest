"use client";

import { useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

export const VotingButtons = () => {
  const [voteCount, setVoteCount] = useState(0);
  const [hasUpVoted, setHasUpVoted] = useState(false);

  const handleUpVote = () => {
    if (!hasUpVoted) {
      setVoteCount(voteCount + 1);
      setHasUpVoted(true);
    }
  };

  const handleDownVote = () => {
    if (hasUpVoted) {
      setVoteCount(voteCount - 1);
      setHasUpVoted(false);
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
      >
        <BiUpvote />
        <span className="sr-only">UpVote</span>
      </button>
      <p>{voteCount}</p>
      <button
        type="button"
        className={`text-[18px] hover:bg-[#e9ebef] p-[0.3rem] rounded-lg transition ${
          !hasUpVoted ? "text-[red]" : "text-gray-500"
        }`}
        onClick={handleDownVote}
      >
        <BiDownvote />
        <span className="sr-only">DownVote</span>
      </button>
    </div>
  );
};
