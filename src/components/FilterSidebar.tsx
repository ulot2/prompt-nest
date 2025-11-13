"use client";

import { useRouter, useSearchParams } from "next/navigation";

type FilterSidebarProps = {
  categories: string[];
  tags: string[];
};

export function FilterSidebar({ categories, tags }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <aside className="w-50 border-r border-gray-300 p-6 h-fit sticky top-4">
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

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-indigo-600"
                  checked={
                    searchParams.get("tag")?.split(",").includes(tag) || false
                  }
                  onChange={() => handleCheckboxChange("tag", tag)}
                />
                <span className="text-sm text-foreground">{tag}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-400">No tags yet</p>
          )}
        </div>
      </div>
    </aside>
  );
}
