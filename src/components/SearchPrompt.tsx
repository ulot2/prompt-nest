"use client";

import { IoIosSearch } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type SearchPromptProps = {
  resultsCount?: number;
};

export const SearchPrompt = ({ resultsCount }: SearchPromptProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div className="max-w-[900px] mx-auto">
      <div className="mt-[1rem]">
        <h1 className="text-2xl font-bold text-center lg:text-left">
          Discover Powerful AI Prompts
        </h1>
        <p className="text-gray-600 text-center lg:text-left">
          Community-curated prompts for ChatGPT, Claude, Gemini, and more. Find
          the perfect prompt for your needs.
        </p>
      </div>
      <form onSubmit={handleSearch} className="mt-[1rem]">
        <div className="w-[350px] flex items-center mx-auto gap-[0.5rem] border border-gray-300 rounded-lg focus-within:border-gray-600">
          <IoIosSearch className="text-gray-400 ml-2" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-full rounded-lg focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 mr-2 text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* {searchQuery && resultsCount !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Found {resultsCount} {resultsCount === 1 ? "prompt" : "prompts"} for "
          {searchQuery}"
        </p>
      )} */}
    </div>
  );
};
