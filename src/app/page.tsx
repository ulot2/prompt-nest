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
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <Suspense
        fallback={
          <div className=" bg-black w-[200px] py-[0.5rem] flex justify-center items-center gap-2 mx-auto mt-[2rem] rounded-lg shadow-md">
            <AiOutlineLoading3Quarters className="animate-spin text-[16px] text-white" />
            <p className="text-white">Loading prompts...</p>
          </div>
        }
      >
        <GetPrompts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const promptPerPage = 5;

const getTotalPrompts = cache(
  async () => prisma.prompt.count(),
  ["promptCount"],
  { revalidate: 300 }
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
      votes: userId
        ? {
            where: { userId },
            select: { type: true },
          }
        : true,
    },
    take: promptPerPage,
    skip: (page - 1) * promptPerPage,
  });
  const totalPages = Math.ceil(totalPrompts / promptPerPage);

  const promptsWithStatus = prompts.map((prompt) => ({
    ...prompt,
    userVoteStatus: prompt.votes.length > 0 ? prompt.votes[0].type : null,
  }));

  const availableCategories = await getUniqueCategories();
  const availableTags = await getUniqueTags();

  return (
    <div className="">
      <Navbar session={session} />
      <SearchPrompt />

      <WebsiteDetails
        totalUsers={totalUsers}
        totalPrompts={totalPromptsCount}
      />
      <div className="flex">
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
