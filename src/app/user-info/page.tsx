import { auth } from "@/auth";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { prisma } from "@/lib/db";
import { PromptList } from "@/components/PromptList";
import { UserInfoHeader } from "@/components/UserInfoHeader";
import { Suspense } from "react";

export default async function UserInfo() {
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
        <GetUserDetails searchParams={{}} />
      </Suspense>
    </div>
  );
}

const promptPerPage = 5;

async function GetUserDetails({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const page = Number(searchParams.page) || 1;
  const skip = (page - 1) * promptPerPage;

  const totalPrompts = await prisma.prompt.count({
    where: {
      userId: session?.user?.id,
    },
  });

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
    where: {
      userId: session?.user?.id,
    },
    take: promptPerPage,
    skip: skip,
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
      <PromptList
        session={session}
        prompts={promptsWithStatus}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}
