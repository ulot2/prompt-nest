"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Suspense } from "react";
import { unstable_cache as cache } from "next/cache";

import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { FilterSidebar } from "@/components/FilterSidebar";
import WebsiteDetails from "@/components/WebsiteDetails";
import { SearchPrompt } from "@/components/SearchPrompt";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default async function Home() {
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
        <GetPrompts searchParams={{}} />
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
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const totalUsers = await getTotalUsers();
  const totalPromptsCount = await getTotalPrompts();

  const page = Number(searchParams.page) || 1;
  const totalPrompts = await prisma.prompt.count();

  const prompts = await prisma.prompt.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalPages = Math.ceil(totalPrompts / promptPerPage);

  const promptsWithStatus = prompts.map((prompt) => ({
    ...prompt,
    userVoteStatus: prompt.votes.length > 0 ? prompt.votes[0].type : null,
  }));

  return (
    <div className="">
      <Navbar session={session} />
      <SearchPrompt />

      <WebsiteDetails
        totalUsers={totalUsers}
        totalPrompts={totalPromptsCount}
      />
      <div className="flex">
        <FilterSidebar />

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
