"use client";

import { IoIosSearch, IoIosClose } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type SearchPromptProps = {
  resultsCount?: number;
};

export const SearchPrompt = ({ resultsCount }: SearchPromptProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim() !== "") {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 md:px-0 overflow-hidden md:overflow-visible">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-gray-100/40 to-slate-100/40 dark:from-slate-800/20 dark:to-gray-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-gradient-to-br from-gray-100/30 to-slate-100/30 dark:from-slate-800/10 dark:to-gray-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mt-8 md:mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-900 dark:to-gray-900 border border-gray-200/80 dark:border-gray-800 mb-4"
        >
          {/* <HiOutlineSparkles className="text-gray-600 text-sm" /> */}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Community-Powered Prompts
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight"
        >
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Discover Powerful
          </span>
          <br className="md:hidden" />
          <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-200 dark:via-white dark:to-gray-200 bg-clip-text text-transparent">
            {" "}
            AI Prompts
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 mt-4 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Community-curated prompts for{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            ChatGPT
          </span>
          ,{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Claude
          </span>
          ,{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Gemini
          </span>
          , and more. Find the perfect prompt for your needs.
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={handleSearch}
        className="relative mt-8"
      >
        <div
          className={`
            relative w-full max-w-2xl mx-auto
            flex items-center gap-3
            bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
            rounded-2xl
            border-2 transition-all duration-300 ease-out
            ${
              isFocused
                ? "border-gray-400 dark:border-gray-500 shadow-[0_0_0_4px_rgba(0,0,0,0.05)] shadow-gray-200 dark:shadow-gray-900/50"
                : "border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-100/50 dark:shadow-none"
            }
            hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-gray-100/60 dark:hover:shadow-none
          `}
        >
          <div
            className={`pl-5 transition-colors duration-300 ${
              isFocused
                ? "text-gray-800 dark:text-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            <IoIosSearch className="text-xl" />
          </div>

          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search prompts by name, category, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 py-4 pr-4 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                type="button"
                onClick={handleClear}
                className="p-2 mr-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <IoIosClose className="text-xl" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 mr-2 rounded-xl bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold text-sm transition-colors duration-200 shadow-md shadow-gray-900/20 dark:shadow-none"
          >
            <IoIosSearch className="text-lg" />
            <span>Search</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {searchQuery && resultsCount !== undefined && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center"
            >
              Found{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {resultsCount}
              </span>{" "}
              {resultsCount === 1 ? "prompt" : "prompts"} for{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        <span className="text-sm text-gray-400 py-1.5 px-1">Popular:</span>
        {["Writing", "Coding", "Marketing", "Business", "Creative"].map(
          (category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSearchQuery(category);
                const params = new URLSearchParams(searchParams.toString());
                params.set("search", category);
                params.set("page", "1");
                router.push(`?${params.toString()}`);
              }}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:text-gray-800 dark:hover:text-white transition-all duration-200"
            >
              {category}
            </button>
          )
        )}
      </motion.div>
    </div>
  );
};
