"use client";

import { useState } from "react";
import { PromptCard } from "./PromptCard";
import { PromptModal } from "./PromptModal";

export const PromptList = ({
  prompts,
  session,
}: {
  prompts: any[];
  session: any;
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
      <PromptModal
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        prompt={selectedPrompt}
      />
    </div>
  );
};
