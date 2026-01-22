import React from "react";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { WebsiteDetailsSkeleton } from "./WebsiteDetailsSkeleton";
import { FilterSidebarSkeleton } from "./FilterSidebarSkeleton";
import { PromptListSkeleton } from "./PromptListSkeleton";

export const MainPageSkeleton = () => {
  return (
    <div className="">
      <NavbarSkeleton />
      <div className="w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-8 md:py-12 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>

          <div className="w-full max-w-2xl h-14 rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
        </div>
      </div>

      <WebsiteDetailsSkeleton />

      <div className="flex flex-col lg:flex-row relative max-w-[1200px] mx-auto px-4 md:px-0">
        <FilterSidebarSkeleton />

        <div className="flex-1 w-full min-w-0">
          <div className="w-full">
            <div className="px-4 sm:px-2 pt-8 lg:pt-0">
              <PromptListSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
