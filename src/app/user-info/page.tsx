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
    <div>
      <div className="w-full max-w-[600px] mx-auto bg-white mt-[2rem] p-[2rem] rounded-lg shadow-md">
        <div className="flex gap-[2rem]">
          <div className="h-[102px] rounded-[50%] w-[102px] border-4 border-white shadow-lg">
            {session?.user?.image && (
              <Image
                className="rounded-[50%]"
                src={session.user.image ?? ""}
                width={100}
                height={100}
                alt="avatar"
              />
            )}
          </div>
          <div>
            <p className="text-2xl font-semibold">{session?.user?.name}</p>
            <p className="text-[#848587] mb-[0.6rem]">{session?.user?.email}</p>
            <p className="text-[#848587] mb-[0.8rem]">
              Member of the community curated AI prompts
            </p>
            <hr className="border-gray-300 mb-[0.8rem]" />
            <div>
              <h2 className="text-[20px]">{totalPrompts}</h2>
              <p className="flex items-center text-[#848587]">
                <FaRegFileAlt />
                <span>Prompts</span>
              </p>
            </div>
          </div>
        </div>
      </div>
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
