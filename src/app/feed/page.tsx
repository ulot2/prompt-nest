"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import { unstable_cache as cache } from "next/cache";
import { getUniqueTags, getUniqueCategories } from "@/lib/filters";

import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { FilterSidebar } from "@/components/FilterSidebar";
import WebsiteDetails from "@/components/WebsiteDetails";
import { SearchPrompt } from "@/components/SearchPrompt";
import { MainPageSkeleton } from "@/components/MainPageSkeleton";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <Suspense fallback={<MainPageSkeleton />}>
        <GetPrompts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const promptPerPage = 10;

const getTotalPrompts = cache(
  async () => prisma.prompt.count(),
  ["promptCount"],
  { revalidate: 300 },
);

const getTotalUsers = cache(async () => prisma.user.count(), ["userCount"], {
  revalidate: 300,
});

async function GetPrompts({
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

  const searchQuery = (params.search as string) || "";

  const whereClause: any = {};

  if (categories.length > 0) {
    whereClause.category = { in: categories };
  }

  if (tags.length > 0) {
    whereClause.tags = {
      hasSome: tags,
    };
  }

  if (searchQuery) {
    whereClause.OR = [
      {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      {
        tags: {
          hasSome: [searchQuery],
        },
      },
    ];
  }

  let orderByClause: any = { createdAt: "desc" };

  if (sort === "trending") {
    orderByClause = { likes: "desc" };
  } else if (sort === "toprated") {
    orderByClause = { dislikes: "desc" };
  }

  const session = await auth();
  const userId = session?.user?.id;

  const totalUsers = await getTotalUsers();
  const totalPromptsCount = await getTotalPrompts();

  const page = Number(params.page) || 1;

  const totalPrompts = await prisma.prompt.count({
    where: whereClause,
  });
  const prompts = await prisma.prompt.findMany({
    where: whereClause,
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
      votes: {
        where: { userId: userId ?? "" },
        select: { type: true },
      },
      bookmarks: {
        where: { userId: userId ?? "" },
        select: { id: true },
      },
    },
    take: promptPerPage,
    skip: (page - 1) * promptPerPage,
  });
  const totalPages = Math.ceil(totalPrompts / promptPerPage);

  type PromptFromDB = (typeof prompts)[0];

  const promptsWithStatus = prompts.map((prompt: PromptFromDB) => ({
    ...prompt,
    userVoteStatus:
      Array.isArray(prompt.votes) && prompt.votes.length > 0
        ? prompt.votes[0].type
        : null,
    isBookmarked:
      Array.isArray(prompt.bookmarks) && prompt.bookmarks.length > 0,
  }));

  const availableCategories = (await getUniqueCategories()) as string[];
  const availableTags = (await getUniqueTags()) as string[];

  return (
    <div className="">
      <Navbar session={session} />
      <SearchPrompt resultsCount={totalPrompts} />

      <WebsiteDetails
        totalUsers={totalUsers}
        totalPrompts={totalPromptsCount}
      />
      <div className="flex flex-col lg:flex-row relative max-w-[1200px] mx-auto px-4 md:px-0">
        <FilterSidebar categories={availableCategories} tags={availableTags} />

        <PromptList
          session={session}
          prompts={promptsWithStatus}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
