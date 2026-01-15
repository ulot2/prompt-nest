import { getPrompt } from "@/actions/actions";
import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { CopyButton } from "@/components/CopyButton";
import { ShareButtons } from "@/components/ShareButtons";
import { VotingButtons } from "@/components/VotingButtons";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PromptDetailsSkeleton } from "@/components/PromptDetailsSkeleton";
import { Suspense } from "react";

// Category styling helper (consistent with PromptCard)
const getCategoryClasses = (category: string) => {
  const categories: Record<string, string> = {
    Writing:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
    Coding:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    Marketing:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
    Business:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    Education:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
    Creative:
      "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800",
  };
  return (
    categories[category] ||
    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  );
};

export default function PromptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Suspense fallback={<PromptDetailsSkeleton />}>
        <PromptContent params={params} />
      </Suspense>
    </div>
  );
}

async function PromptContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const promptId = parseInt(id);

  if (isNaN(promptId)) return notFound();

  const prompt = await getPrompt(promptId);
  if (!prompt) return notFound();

  const session = await auth();
  const isLoggedIn = !!session?.user;

  const categoryStyle = getCategoryClasses(prompt.category);

  return (
    <>
      <Navbar session={session} />

      <main className="max-w-[1200px] mx-auto px-4 py-8 md:px-6 lg:py-12">
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">
            {prompt.category}
          </span>
          <span className="mx-2">/</span>
          <span className="truncate max-w-[200px]">{prompt.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border flex items-center gap-1.5 ${categoryStyle}`}
                >
                  <HiOutlineSparkles className="text-sm" />
                  {prompt.category}
                </span>
                {/* <span className="text-gray-400 text-sm flex items-center gap-1">
                  <MdOutlineRemoveRedEye /> 5.6k views
                </span> */}
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-500 text-sm">
                  {formatTime(prompt.createdAt)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
                {prompt.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {prompt.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-md text-sm font-medium border border-gray-200 dark:border-gray-800"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <h2 className="font-semibold text-gray-900 dark:text-gray-200">
                  System Prompt
                </h2>
                <CopyButton text={prompt.fullPrompt} />
              </div>
              <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-black/20">
                <pre className="whitespace-pre-wrap font-mono text-sm md:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                  {prompt.fullPrompt}
                </pre>
              </div>
            </div>

            <div className="lg:hidden flex flex-col gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Rate this prompt
                </span>
                <VotingButtons
                  promptId={prompt.id}
                  initialLikes={prompt.likes}
                  initialDislikes={prompt.dislikes}
                  userVoteStatus={
                    prompt.userVoteStatus as "LIKE" | "DISLIKE" | null
                  }
                  isLoggedIn={isLoggedIn}
                />
              </div>
              <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
              <ShareButtons
                title={`Check out this prompt: ${prompt.title}`}
                text={prompt.description}
                align="left"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Created by
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={
                      prompt.img?.startsWith("http")
                        ? prompt.img
                        : "/images/user-alt-img.jpg"
                    }
                    alt={prompt.userName}
                    width={56}
                    height={56}
                    className="rounded-full ring-4 ring-gray-50 dark:ring-gray-800"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                    {prompt.userName}
                  </p>
                  <p className="text-sm text-gray-500">Creator</p>
                </div>
              </div>
              <Link
                href={`/profile/${prompt.userId}`}
                className="block w-full text-center mt-6 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
              >
                View Profile
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_2px_10px_rgb(0,0,0,0.04)] dark:shadow-none space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Engagement
                </h3>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Was this helpful?
                  </span>
                  <VotingButtons
                    promptId={prompt.id}
                    initialLikes={prompt.likes}
                    initialDislikes={prompt.dislikes}
                    userVoteStatus={
                      prompt.userVoteStatus as "LIKE" | "DISLIKE" | null
                    }
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Share
                </h3>
                <ShareButtons
                  title={`Check out this prompt: ${prompt.title}`}
                  text={prompt.description}
                  align="left"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Prompt Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    {prompt.category}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    {formatTime(prompt.createdAt)}
                  </span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Model</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
