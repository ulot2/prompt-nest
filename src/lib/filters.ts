import { prisma } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

export const getUniqueCategories = cache(
  async () => {
    const prompts = await prisma.prompt.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    return prompts
      .map((p) => p.category)
      .filter(Boolean)
      .sort();
  },
  ["uniqueCategories"],
  { revalidate: 3600 }
);

export const getUniqueTags = cache(
  async () => {
    const prompts = await prisma.prompt.findMany({
      select: { tags: true },
    });

    const allTags = prompts.flatMap((p) => p.tags);
    const uniqueTags = [...new Set(allTags)];

    return uniqueTags.filter(Boolean).sort();
  },
  ["unique-tags"],
  { revalidate: 3600 }
);
