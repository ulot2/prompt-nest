import { auth } from "@/auth";
import Image from "next/image";
import { UserStats } from "./UserStats";
import { Suspense } from "react";

type UserProfileCardProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function UserProfileCard({ searchParams }: UserProfileCardProps) {
  const session = await auth();
  const params = await searchParams;
  const filter = (params.filter as string) || "published";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-bl-full -mr-16 -mt-16 opacity-50 transition-transform duration-500 group-hover:scale-110" />

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
        <div className="relative">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                width={128}
                height={128}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300 dark:text-gray-600">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full" />
        </div>

        <div className="flex-1 text-center md:text-left pt-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            {session?.user?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
            <span className="text-gray-400 dark:text-gray-600">@</span>
            {session?.user?.email}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              Member since 2024
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-xs font-semibold text-violet-600 dark:text-violet-300 border border-violet-100 dark:border-violet-800/30">
              Prompt Enthusiast
            </span>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <UserStats searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
