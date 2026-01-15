import React from "react";

export const NavbarSkeleton = () => {
  return (
    <div className="sticky top-0 z-50">
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100/80 dark:border-gray-800/80">
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center py-3 px-4 md:px-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="flex flex-col gap-1">
              <div className="w-24 h-5 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="w-20 h-9 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            <div className="w-32 h-9 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
