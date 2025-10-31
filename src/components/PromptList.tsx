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
    <div>
      <div className="max-w-[900px] mx-auto mt-[2rem] flex justify-center gap-[2%] flex-wrap">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="w-[45%] mb-[2%]">
            <PromptCard
              session={session}
              prompt={prompt}
              setSelectedPrompt={setSelectedPrompt}
            />
          </div>
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
