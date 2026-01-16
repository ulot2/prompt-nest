"use client";

import { useState } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiX,
  FiTrendingUp,
  FiStar,
  FiClock,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { motion } from "motion/react";
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
    setIsOpen(false);
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
    setIsOpen(false);
  };

  const handleClearAll = () => {
    router.push("/");
    setIsOpen(false);
  };

  const hasActiveFilters =
    searchParams.get("sort") ||
    searchParams.get("category") ||
    searchParams.get("tag");

  const activeFilterCount = [
    searchParams.get("category")?.split(",").filter(Boolean).length || 0,
    searchParams.get("tag")?.split(",").filter(Boolean).length || 0,
  ].reduce((a, b) => a + b, 0);

  const sortOptions = [
    {
      value: "trending",
      label: "Trending",
      icon: <FiTrendingUp className="w-4 h-4" />,
    },
    {
      value: "newest",
      label: "Newest",
      icon: <FiClock className="w-4 h-4" />,
    },
    {
      value: "toprated",
      label: "Top Rated",
      icon: <FiStar className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-full lg:w-56 shrink-0 relative">
      <div className="lg:hidden px-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <FiFilter className="text-gray-700 dark:text-gray-300 text-sm" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Filters
            </span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <FiChevronDown
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={
          isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.2 }}
        className="overflow-hidden absolute top-full left-0 right-0 z-20 lg:static lg:!block lg:!h-auto lg:!opacity-100 "
      >
        <div className="p-4 lg:p-0 lg:pr-6 lg:sticky lg:top-0">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg shadow-gray-100/50 dark:shadow-none lg:shadow-none lg:bg-transparent lg:border-none lg:backdrop-blur-none p-5 lg:p-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="hidden lg:flex p-2 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <FiFilter className="text-gray-700 dark:text-gray-300" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
              </div>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleClearAll}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <FiX className="text-sm" />
                  Clear all
                </motion.button>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">
                Sort By
              </h3>
              <div className="space-y-1.5">
                {sortOptions.map((option) => {
                  const isSelected =
                    searchParams.get("sort") === option.value ||
                    (option.value === "newest" && !searchParams.get("sort"));
                  return (
                    <label
                      key={option.value}
                      className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                            ${
                              isSelected
                                ? "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
                            }
                          `}
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleSortChange(option.value)}
                        className="sr-only"
                      />
                      <span className="text-sm">{option.icon}</span>
                      <span
                        className={`text-sm font-medium ${
                          isSelected
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {option.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          layoutId="sortIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-gray-900 dark:bg-white"
                        />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent mb-6" />

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">
                Category
              </h3>
              <div className="space-y-1.5">
                {categories.length > 0 ? (
                  categories.map((category) => {
                    const isChecked =
                      searchParams
                        .get("category")
                        ?.split(",")
                        .includes(category) || false;
                    return (
                      <label
                        key={category}
                        className={`
                              flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                              ${
                                isChecked
                                  ? "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
                              }
                            `}
                      >
                        <div
                          className={`
                                w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all duration-200
                                ${
                                  isChecked
                                    ? "bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100"
                                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                                }
                              `}
                        >
                          {isChecked && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 text-white dark:text-gray-900"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() =>
                            handleCheckboxChange("category", category)
                          }
                        />
                        <span
                          className={`text-sm font-medium ${
                            isChecked
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <div className="flex items-center gap-2 px-3 py-3 text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <HiOutlineSparkles className="text-gray-300" />
                    No categories yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
