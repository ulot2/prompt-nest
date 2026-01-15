import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { promptId } = body;

    if (!promptId) {
      return NextResponse.json(
        { error: "Prompt ID is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id; // Correct property is id, not userId depending on session shape, but usually id in next-auth v5 with prisma adapter

    // Check if bookmark exists
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_promptId: {
          userId: userId!,
          promptId: Number(promptId),
        },
      },
    });

    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });
      return NextResponse.json({ isBookmarked: false }, { status: 200 });
    } else {
      // Add bookmark
      await prisma.bookmark.create({
        data: {
          userId: userId!,
          promptId: Number(promptId),
        },
      });
      return NextResponse.json({ isBookmarked: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
