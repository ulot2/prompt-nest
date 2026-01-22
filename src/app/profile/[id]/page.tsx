"use server";

import { auth } from "@/auth";
import Image from "next/image";
import { ProfilePageSkeleton } from "@/components/skeletons/ProfilePageSkeleton";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaRegFileAlt } from "react-icons/fa";
import { prisma } from "@/lib/db";
import { PromptList } from "@/components/prompts/PromptList";

import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { getUniqueCategories, getUniqueTags } from "@/lib/filters";
import { Navbar } from "@/components/layout/Navbar";
import { notFound } from "next/navigation";
import { Suspense } from "react"; // Re-added Suspense as it's used in the component

export default async function UserProfile({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <Suspense fallback={<ProfilePageSkeleton />}>
        <ProfileContent params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ProfileContent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const userId = id;

  if (!userId) return notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) return notFound();

  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      <GetUserProfileDetails
        userId={userId}
        user={user}
        searchParams={searchParams}
        session={session}
      />
    </>
  );
}

const promptPerPage = 5;

async function GetUserProfileDetails({
  userId,
  user,
  searchParams,
  session,
}: {
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  session: any;
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

  // const session = await auth(); // Session passed as prop
  const currentUserId = session?.user?.id;

  const page = Number(params.page) || 1;
  const skip = (page - 1) * promptPerPage;

  const totalPrompts = await prisma.prompt.count({
    where: {
      userId: userId,
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
      votes: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { type: true },
          }
        : true,
    },
    where: {
      ...whereClause,
      userId: userId,
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
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-bl-full -mr-16 -mt-16 opacity-50 transition-transform duration-500 group-hover:scale-110" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {user.image ? (
                <Image
                  src={user.image}
                  width={128}
                  height={128}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300 dark:text-gray-600">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              {user.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
              {/* <span className="text-gray-400 dark:text-gray-600">@</span>
              {user.email}{" "} */}
              {/* Maybe mask email for privacy? Keeping as is for now matching user-info */}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                Member
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-xs font-semibold text-violet-600 dark:text-violet-300 border border-violet-100 dark:border-violet-800/30">
                Prompt Enthusiast
              </span>
            </div>
          </div>

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
