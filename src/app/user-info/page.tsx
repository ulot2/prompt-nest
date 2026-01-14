import { auth } from "@/auth";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { prisma } from "@/lib/db";
import { PromptList } from "@/components/PromptList";
import { UserInfoHeader } from "@/components/UserInfoHeader";
import { Suspense } from "react";
import { FilterSidebar } from "@/components/FilterSidebar";
import { getUniqueCategories, getUniqueTags } from "@/lib/filters";

export default async function UserInfo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <UserInfoHeader />
      <Suspense
        fallback={
          <div className=" bg-black w-[200px] py-[0.5rem] flex justify-center items-center gap-2 mx-auto mt-[2rem] rounded-lg shadow-md">
            <AiOutlineLoading3Quarters className="animate-spin text-[16px] text-white" />
            <p className="text-white">Loading user details...</p>
          </div>
        }
      >
        <GetUserDetails searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const promptPerPage = 5;

async function GetUserDetails({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const sort = (params.sort as string) || "newest";
  const categories = params.category
    ? (params.category as string).split(",")
    : [];
  const tags = params.tag ? (params.tag as string).split(",") : [];

  const whereClause: any = {};

  if (categories.length > 0) {
    whereClause.category = { in: categories };
  }

  if (tags.length > 0) {
    whereClause.tags = {
      hasSome: tags,
    };
  }

  let orderByClause: any = { createdAt: "desc" };

  if (sort === "trending") {
    orderByClause = { likes: "desc" };
  } else if (sort === "toprated") {
    orderByClause = { dislikes: "desc" };
  }

  const session = await auth();
  const userId = session?.user?.id;

  const page = Number(params.page) || 1;
  const skip = (page - 1) * promptPerPage;

  const totalPrompts = await prisma.prompt.count({
    where: {
      userId: session?.user?.id,
    },
  });

  const prompts = await prisma.prompt.findMany({
    orderBy: orderByClause,
    select: {
      likes: true,
      dislikes: true,
      id: true,
      category: true,
      title: true,
      description: true,
      fullPrompt: true,
      tags: true,
      img: true,
      userName: true,
      userId: true,
      createdAt: true,
      votes: userId
        ? {
            where: { userId },
            select: { type: true },
          }
        : true,
    },
    where: {
      ...whereClause,
      userId: session?.user?.id,
    },
    take: promptPerPage,
    skip: skip,
  });

  const totalPages = Math.ceil(totalPrompts / promptPerPage);

  type PromptFromDB = (typeof prompts)[0];

  const promptsWithStatus = prompts.map((prompt: PromptFromDB) => ({
    ...prompt,
    userVoteStatus:
      Array.isArray(prompt.votes) && prompt.votes.length > 0
        ? prompt.votes[0].type
        : null,
  }));

  const availableCategories = (await getUniqueCategories()) as string[];
  const availableTags = (await getUniqueTags()) as string[];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0 mt-8">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-bl-full -mr-16 -mt-16 opacity-50 transition-transform duration-500 group-hover:scale-110" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
          {/* Avatar Section */}
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
            {/* Online Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full" />
          </div>

          {/* Info Section */}
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

          {/* Stats Section */}
          <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <FaRegFileAlt className="text-xl text-gray-700 dark:text-gray-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
                {totalPrompts}
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                Published Prompts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        <FilterSidebar categories={availableCategories} tags={availableTags} />
        <div className="flex-1 w-full min-w-0">
          <PromptList
            session={session}
            prompts={promptsWithStatus}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
