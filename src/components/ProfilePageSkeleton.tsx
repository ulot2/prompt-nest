import React from "react";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { FilterSidebarSkeleton } from "./FilterSidebarSkeleton";
import { PromptListSkeleton } from "./PromptListSkeleton";

export const ProfilePageSkeleton = () => {
  return (
    <div className="">
      <NavbarSkeleton />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0 mt-8">
        {/* Profile Header Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full text-center md:text-left pt-2 flex flex-col items-center md:items-start">
              <div className="h-9 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-2" />
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4" />

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <div className="w-20 h-6 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                <div className="w-32 h-6 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Stats Card */}
            <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
              <div className="flex flex-col gap-1">
                <div className="w-8 h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="w-24 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
          <FilterSidebarSkeleton />
          <div className="flex-1 w-full min-w-0">
            <PromptListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
