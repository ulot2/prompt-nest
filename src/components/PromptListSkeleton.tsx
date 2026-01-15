import React from "react";

export const PromptListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-full h-[400px] flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-24 h-6 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          </div>

          {/* Content Section */}
          <div className="flex-grow space-y-3">
            <div className="w-3/4 h-7 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="space-y-2 mt-4">
              <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
              <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
              <div className="w-2/3 h-4 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6 mt-4">
            <div className="w-16 h-6 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
            <div className="w-20 h-6 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
            <div className="w-14 h-6 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="space-y-1">
                <div className="w-20 h-3 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="w-12 h-3 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
