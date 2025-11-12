"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const AI_TYPES = ["ChatGPT", "Claude", "Gemini", "Grok", "Midjourney"];
const CATEGORIES = ["Writing", "Development", "Marketing", "Data", "Business"];

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "trending";
  const currentAiTypes = searchParams.get("aiType")?.split(",") || [];
  const currentCategories = searchParams.get("category")?.split(",") || [];

  const handleFilterChange = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleMultiSelectChange = useCallback(
    (key: string, value: string) => {
      const currentValues =
        searchParams
          .get(key)
          ?.split(",")
          .filter((v) => v) || [];
      let newValues: string[];

      if (currentValues.includes(value)) {
        newValues = currentValues.filter((v) => v !== value);
      } else {
        newValues = [...currentValues, value];
      }

      const newValueString = newValues.join(",");
      handleFilterChange(key, newValueString);
    },
    [searchParams, handleFilterChange]
  );

  return (
    <aside className="w-50 border-r border-gray-300 p-6 h-fit sticky top-4">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-3">Sort By</h3>
        <div className="space-y-2">
          {(["trending", "newest", "toprated"] as const).map((sort) => (
            <label
              key={sort}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                value={sort}
                checked={currentSort === sort}
                onChange={() => handleFilterChange("sort", sort)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm capitalize">{sort}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-3">AI Type</h3>
        <div className="space-y-2">
          {AI_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={type}
                checked={currentAiTypes.includes(type)}
                onChange={() => handleMultiSelectChange("aiType", type)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={category}
                checked={currentCategories.includes(category)}
                onChange={() => handleMultiSelectChange("category", category)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm text-foreground">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
