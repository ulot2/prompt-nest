"use client";

import { useState } from "react";
import { PromptCard } from "./PromptCard";
import { PromptModal } from "./PromptModal";
import { Pagination } from "./Pagination";

export const PromptList = ({
  prompts,
  session,
  currentPage,
  totalPages,
}: {
  prompts: any[];
  session: any;
  currentPage: number;
  totalPages: number;
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<any | null>(null);

  return (
    <div className="w-full">
      <div className="max-w-[900px] mx-auto mt-8 px-4 sm:px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            session={session}
            prompt={prompt}
            setSelectedPrompt={setSelectedPrompt}
            userVoteStatus={prompt.userVoteStatus || null}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
      <PromptModal
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        prompt={selectedPrompt}
      />
    </div>
  );
};
