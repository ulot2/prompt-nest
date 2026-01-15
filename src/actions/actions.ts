"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createPrompt(formData: FormData) {
  const session = await auth();

  await prisma.prompt.create({
    data: {
      title: formData.get("promptTitle") as string,
      description: formData.get("promptDescription") as string,
      fullPrompt: formData.get("fullPrompt") as string,
      category: formData.get("promptCategory") as string,
      tags: (formData.get("promptTags") as string)
        .split(",")
        .map((tag) => tag.trim()),
      img: session?.user?.image || "/images/user-alt-img.jpg",
      userName: session?.user?.name || "anonymous",
      userId: session?.user?.id,
    },
  });
  revalidatePath("/");
}

export async function editPrompt(formData: FormData, promptId: number) {
  await prisma.prompt.update({
    where: { id: promptId },
    data: {
      title: formData.get("promptTitle") as string,
      description: formData.get("promptDescription") as string,
      fullPrompt: formData.get("fullPrompt") as string,
      category: formData.get("promptCategory") as string,
      tags: (formData.get("promptTags") as string)
        .split(",")
        .map((tag) => tag.trim()),
    },
  });
}

export async function deletePrompt(promptId: number) {
  await prisma.prompt.delete({
    where: { id: promptId },
  });
}

export async function updateUserVote(
  promptId: number,
  newVoteType: "LIKE" | "DISLIKE" | "NONE"
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User must be logged in to vote.");
  }

  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_promptId: {
        userId,
        promptId,
      },
    },
  });

  await prisma.$transaction(
    async (
      tx: Omit<
        typeof prisma,
        | "$connect"
        | "$disconnect"
        | "$on"
        | "$transaction"
        | "$use"
        | "$extends"
      >
    ) => {
      if (existingVote) {
        await tx.vote.delete({
          where: { id: existingVote.id },
        });

        if (existingVote.type === "LIKE") {
          await tx.prompt.update({
            where: { id: promptId },
            data: { likes: { decrement: 1 } },
          });
        } else if (existingVote.type === "DISLIKE") {
          await tx.prompt.update({
            where: { id: promptId },
            data: { dislikes: { decrement: 1 } },
          });
        }
      }

      if (newVoteType !== "NONE") {
        if (!existingVote || existingVote.type !== newVoteType) {
          await tx.vote.create({
            data: {
              userId,
              promptId,
              type: newVoteType,
            },
          });

          if (newVoteType === "LIKE") {
            await tx.prompt.update({
              where: { id: promptId },
              data: { likes: { increment: 1 } },
            });
          } else if (newVoteType === "DISLIKE") {
            await tx.prompt.update({
              where: { id: promptId },
              data: { dislikes: { increment: 1 } },
            });
          }
        }
      }
    }
  );

  revalidatePath("/");
}

export async function getPrompt(promptId: number) {
  const session = await auth();
  const userId = session?.user?.id;

  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId },
    include: {
      votes: userId ? { where: { userId } } : false, // Only fetch user's vote if logged in
    },
  });

  if (!prompt) return null;

  return {
    ...prompt,
    userVoteStatus:
      Array.isArray(prompt.votes) && prompt.votes.length > 0
        ? prompt.votes[0].type
        : null,
  };
}
