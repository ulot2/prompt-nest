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

export async function updateLike(promptId: number, change: 1 | -1) {
  await prisma.prompt.update({
    where: { id: promptId },
    data: {
      likes: {
        increment: change,
      },
    },
  });
  revalidatePath("/");
}

export async function updateDislike(promptId: number, change: 1 | -1) {
  await prisma.prompt.update({
    where: { id: promptId },
    data: {
      dislikes: {
        increment: change,
      },
    },
  });
  revalidatePath("/");
}
