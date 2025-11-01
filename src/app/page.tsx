"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { FilterSidebar } from "@/components/FilterSidebar";
import WebsiteDetails from "@/components/WebsiteDetails";
import { unstable_cache as cache } from "next/cache";
import { SearchPrompt } from "@/components/SearchPrompt";
import { Suspense } from "react";
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

  const totalUsers = await getTotalUsers();
  const totalPromptsCount = await getTotalPrompts();

  const page = Number(searchParams.page) || 1;

  const totalPrompts = await prisma.prompt.count();

  const prompts = await prisma.prompt.findMany({
    take: promptPerPage,
    skip: (page - 1) * promptPerPage,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPages = Math.ceil(totalPrompts / promptPerPage);

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
          prompts={prompts}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
