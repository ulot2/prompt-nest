"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const categories = ["ChatGPT", "Claude", "Gemini", "Grok", "Midjourney"];
const tags = ["Writing", "Development", "Marketing", "Data", "Business"];

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {tags.map((tag) => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-foreground">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
