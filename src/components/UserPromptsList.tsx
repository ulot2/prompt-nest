import { prisma } from "@/lib/db";
import { PromptList } from "@/components/PromptList";
import { auth } from "@/auth";
import { getUniqueCategories, getUniqueTags } from "@/lib/filters";

type UserPromptsListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const promptPerPage = 5;

export async function UserPromptsList({ searchParams }: UserPromptsListProps) {
  const params = await searchParams;

  const sort = (params.sort as string) || "newest";
  const categories = params.category
    ? (params.category as string).split(",")
    : [];
  const tags = params.tag ? (params.tag as string).split(",") : [];
  const filter = (params.filter as string) || "published";

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

  const whereCondition =
    filter === "saved"
      ? {
          bookmarks: {
            some: {
              userId: session?.user?.id,
            },
          },
        }
      : {
          userId: session?.user?.id,
        };

  const totalPrompts = await prisma.prompt.count({
    where: {
      ...whereCondition,
      ...whereClause,
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
      votes: {
        where: { userId: userId ?? "" },
        select: { type: true },
      },
      bookmarks: {
        where: { userId: userId ?? "" },
        select: { id: true },
      },
    },
    where: {
      ...whereClause,
      ...whereCondition,
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
    isBookmarked:
      Array.isArray(prompt.bookmarks) && prompt.bookmarks.length > 0,
  }));

  return (
    <PromptList
      session={session}
      prompts={promptsWithStatus}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
