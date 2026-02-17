"use client";

import { useState } from "react";
import { PromptCard } from "./PromptCard";
import { PromptModal } from "@/components/modals/PromptModal";
import { Pagination } from "@/components/shared/Pagination";
import { motion } from "motion/react";
import { HiOutlineBookmark } from "react-icons/hi2";

export const PromptList = ({
  prompts,
  session,
  currentPage,
  totalPages,
  mode = "feed",
}: {
  prompts: any[];
  session: any;
  currentPage: number;
  totalPages: number;
  mode?: "feed" | "saved" | "created";
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<any | null>(null);

  if (prompts.length === 0) {
    let emptyTitle = "No prompts found";
    let emptyDescription =
      "We couldn't find any prompts matching your criteria. Try adjusting your filters or search terms.";

    if (mode === "saved") {
      emptyTitle = "No saved prompts";
      emptyDescription =
        "You haven't saved any prompts yet. Bookmark prompts you like to find them here easily.";
    } else if (mode === "created") {
      emptyTitle = "No created prompts";
      emptyDescription =
        "You haven't created any prompts yet. Share your creativity with the world!";
    }

    return (
      <div className="w-full">
        <div className="max-w-[900px] mx-auto mt-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl border border-gray-100 dark:border-gray-800"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
              <HiOutlineBookmark className="text-3xl text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {emptyTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              {emptyDescription}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="sm:px-2 pt-8 lg:pt-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {prompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <PromptCard
                session={session}
                prompt={prompt}
                setSelectedPrompt={setSelectedPrompt}
                userVoteStatus={prompt.userVoteStatus || null}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </motion.div>
      )}

      <PromptModal
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        prompt={selectedPrompt}
        session={session}
      />
    </div>
  );
};
