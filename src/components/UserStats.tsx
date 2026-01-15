import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { FaRegFileAlt } from "react-icons/fa";

type UserStatsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function UserStats({ searchParams }: UserStatsProps) {
  const params = await searchParams;
  const session = await auth();

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
    whereClause.tags = { hasSome: tags };
  }

  const whereCondition =
    filter === "saved"
      ? {
          bookmarks: {
            some: { userId: session?.user?.id },
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

  return (
    <div className="flex items-center gap-4 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <FaRegFileAlt className="text-xl text-gray-700 dark:text-gray-300" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
          {totalPrompts}
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
          {filter === "published" ? "Published Prompts" : "Saved Prompts"}
        </span>
      </div>
    </div>
  );
}
