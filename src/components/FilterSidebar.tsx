"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";

import { useRouter, useSearchParams } from "next/navigation";

type FilterSidebarProps = {
  categories: string[];
  tags: string[];
};

export function FilterSidebar({ categories, tags }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleCheckboxChange = (
    filterType: "category" | "tag",
    value: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const current = params.get(filterType)?.split(",").filter(Boolean) || [];

    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    if (updated.length > 0) {
      params.set(filterType, updated.join(","));
    } else {
      params.delete(filterType);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push("/");
  };

  return (
    <aside className="w-full lg:w-50 lg:border-r border-gray-300 lg:p-6 h-fit sticky top-4 bg-background z-20 relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 mt-5 ml-5 bg-indigo-600 text-white rounded-lg w-[150px] justify-center"
        >
          <FaFilter />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? "absolute top-[100%] left-4 right-4 shadow-xl  rounded-b-lg p-4 bg-white z-50" : "hidden"} lg:block lg:static lg:p-0 lg:border-none lg:shadow-none lg:bg-transparent`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          {(searchParams.get("sort") ||
            searchParams.get("category") ||
            searchParams.get("tag")) && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-indigo-600 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
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
                  checked={
                    searchParams.get("sort") === sort ||
                    (sort === "newest" && !searchParams.get("sort"))
                  }
                  onChange={() => handleSortChange(sort)}
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
            {categories.length > 0 ? (
              categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-indigo-600"
                    checked={
                      searchParams
                        .get("category")
                        ?.split(",")
                        .includes(category) || false
                    }
                    onChange={() => handleCheckboxChange("category", category)}
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-400">No categories yet</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
