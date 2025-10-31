"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { Categories } from "@/components/Categories";
import WebsiteDetails from "@/components/WebsiteDetails";
import { unstable_cache as cache } from "next/cache";

const promptPerPage = 5;

const getTotalPrompts = cache(
  async () => prisma.prompt.count(),
  ["promptCount"],
  { revalidate: 300 }
);

const getTotalUsers = cache(async () => prisma.user.count(), ["userCount"], {
  revalidate: 300,
});

export default async function Home({
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
      <WebsiteDetails
        totalUsers={totalUsers}
        totalPrompts={totalPromptsCount}
      />
      {/* <Categories /> */}
      <PromptList
        session={session}
        prompts={prompts}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}
