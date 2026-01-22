import React from "react";
import { NavbarSkeleton } from "./NavbarSkeleton";

export const PromptDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <NavbarSkeleton />

      <main className="max-w-[1200px] mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="w-40 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-24 h-6 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>

              <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse mb-4" />

              <div className="space-y-2 mb-8">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="w-16 h-7 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
              <div className="w-20 h-7 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
              <div className="w-14 h-7 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm h-[300px]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <div className="w-32 h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="w-24 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
              </div>
              <div className="p-6 md:p-8 space-y-3">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>

            <div className="lg:hidden h-40 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 animate-pulse" />
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="space-y-2">
                  <div className="w-32 h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="mt-6 w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>

            <div className="hidden lg:block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none space-y-6">
              <div className="space-y-3">
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/50 space-y-4">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="w-16 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="w-24 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
