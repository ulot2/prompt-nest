import { UserInfoHeader } from "@/components/profile/UserInfoHeader";
import { Suspense } from "react";
import { auth } from "@/auth";
import { UserPromptsList } from "@/components/profile/UserPromptsList";
import { PromptListSkeleton } from "@/components/skeletons/PromptListSkeleton";
import { UserProfileCard } from "@/components/profile/UserProfileCard";
import { UserFilterSidebar } from "@/components/filters/UserFilterSidebar";
import { UserTabs } from "@/components/profile/UserTabs";

export default function UserInfo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <UserInfoHeader />
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0 mt-8">
        {/* Profile Card */}
        <Suspense
          fallback={
            <div className="h-64 w-full bg-gray-100 dark:bg-gray-900 rounded-3xl animate-pulse mb-8" />
          }
        >
          <UserProfileCard searchParams={searchParams} />
        </Suspense>

        {/* Tabs */}
        <Suspense
          fallback={
            <div className="h-10 w-full mb-6 border-b border-gray-200 dark:border-gray-800" />
          }
        >
          <UserTabs searchParams={searchParams} />
        </Suspense>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
          <Suspense
            fallback={
              <div className="w-full lg:w-56 h-[400px] rounded-2xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
            }
          >
            <UserFilterSidebar />
          </Suspense>
          <div className="flex-1 w-full min-w-0">
            <Suspense fallback={<PromptListSkeleton />}>
              <UserPromptsList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
