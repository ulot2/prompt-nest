import React from "react";

export const WebsiteDetailsSkeleton = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8 mb-8 md:p-0 px-4">
      <div className="flex flex-wrap justify-center gap-3">
        <div className="bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 pl-3 pr-5 py-2 rounded-full flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="w-12 h-4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 pl-3 pr-5 py-2 rounded-full flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="w-12 h-4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
