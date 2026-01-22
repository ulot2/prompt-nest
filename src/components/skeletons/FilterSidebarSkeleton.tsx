import React from "react";

export const FilterSidebarSkeleton = () => {
  return (
    <aside className="w-full lg:w-56 shrink-0 relative hidden lg:block">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        </div>

        <div className="mb-6">
          <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse mb-3 ml-2" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-10 bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-800 mb-6" />

        <div className="mb-6">
          <div className="w-20 h-3 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse mb-3 ml-2" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-full h-10 bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
