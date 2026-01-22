import { Navbar } from "@/components/layout/Navbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import WebsiteDetails from "@/components/landing/WebsiteDetails";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { PixelGridBackground } from "@/components/landing/PixelGridBackground";
import { prisma } from "@/lib/db";
import { auth } from "../auth";
import { PromptList } from "@/components/prompts/PromptList";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineFire } from "react-icons/hi2";
import { Suspense } from "react";
import { MainPageSkeleton } from "@/components/skeletons/MainPageSkeleton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PixelGridBackground />
      <Suspense fallback={<MainPageSkeleton />}>
        <LandingContent />
      </Suspense>
    </div>
  );
}

async function LandingContent() {
  const session = await auth();
  const userId = session?.user?.id;

  const totalPrompts = await prisma.prompt.count();
  const totalUsers = await prisma.user.count();

  // Fetch trending prompts
  const trendingPrompts = await prisma.prompt.findMany({
    orderBy: { likes: "desc" },
    take: 4,
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
  });

  type PromptFromDB = (typeof trendingPrompts)[0];

  const promptsWithStatus = trendingPrompts.map((prompt: PromptFromDB) => ({
    ...prompt,
    userVoteStatus:
      Array.isArray(prompt.votes) && prompt.votes.length > 0
        ? prompt.votes[0].type
        : null,
    isBookmarked:
      Array.isArray(prompt.bookmarks) && prompt.bookmarks.length > 0,
  }));

  return (
    <>
      <Navbar session={session} />

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        <LandingHero session={session} />

        <WebsiteDetails totalPrompts={totalPrompts} totalUsers={totalUsers} />

        <FeaturesSection />

        <section className="w-full max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <HiOutlineFire className="text-orange-600 dark:text-orange-400 text-xl" />
                </div>
                <span className="text-orange-600 dark:text-orange-400 font-semibold tracking-wide uppercase text-sm">
                  Trending Now
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Top Rated Prompts
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
                Discover the most popular prompts voted by the community.
                Don&apos;t just take our word for it, copy and try them out.
              </p>
            </div>

            <Link
              href="/feed?sort=trending"
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all duration-300 group"
            >
              View all trending
              <HiOutlineArrowRight className="text-lg group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="relative">
            <PromptList
              session={session}
              prompts={promptsWithStatus}
              currentPage={1}
              totalPages={1}
            />
          </div>
        </section>

        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
