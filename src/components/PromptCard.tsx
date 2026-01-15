import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { VotingButtons } from "./VotingButtons";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineSparkles, HiOutlineTag } from "react-icons/hi2";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deletePrompt, editPrompt } from "@/actions/actions";
import toast from "react-hot-toast";
import { EditPrompt } from "./EditPromptModal";
import { useRouter } from "next/dist/client/components/navigation";
import { ShareButtons } from "./ShareButtons";
import { RiRobot2Line } from "react-icons/ri";

type PromptCardProps = {
  id: number;
  category: string;
  title: string;
  description: string;
  fullPrompt: string;
  tags: string[];
  img: string;
  userName: string;
  userId: string;
  votes: number;
  createdAt: string;
  likes: number;
  dislikes: number;
  userVoteStatus: "LIKE" | "DISLIKE" | null;
  isBookmarked?: boolean;
};

type Prompt = {
  prompt: PromptCardProps;
  setSelectedPrompt: React.Dispatch<React.SetStateAction<{}>>;
  session: any;
  userVoteStatus: "LIKE" | "DISLIKE" | null;
};

// Category color mapping for visual variety (using inline styles for Tailwind JIT compatibility)
const getCategoryClasses = (category: string) => {
  const categories: Record<string, string> = {
    Writing:
      "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 border-violet-100 dark:border-violet-800/30",
    Coding:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/30",
    Marketing:
      "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 border-rose-100 dark:border-rose-800/30",
    Business:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300 border-amber-100 dark:border-amber-800/30",
    Education:
      "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-300 border-sky-100 dark:border-sky-800/30",
    Creative:
      "bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-100 dark:border-fuchsia-800/30",
  };
  return (
    categories[category] ||
    "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800/30"
  );
};

export const PromptCard = ({
  prompt,
  setSelectedPrompt,
  session,
  userVoteStatus,
}: Prompt) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(prompt.isBookmarked);
  const router = useRouter();

  const isLoggedIn = !!session?.user;
  const categoryClasses = getCategoryClasses(prompt.category);

  const handleEdit = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this prompt?"
    );
    setIsDeleting(true);
    if (!confirm) {
      setIsDeleting(false);
      return;
    }
    if (confirm) {
      try {
        await deletePrompt(prompt.id);
        router.refresh();
        toast.success("Prompt deleted successfully");
        setIsDeleting(false);
      } catch (error) {
        toast.error("Failed to delete prompt");
      }
    }
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error("Please login to save prompts");
      return;
    }

    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);

    try {
      const response = await fetch("/api/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to bookmark");
      }

      toast.success(
        newStatus
          ? "Prompt saved to bookmarks"
          : "Prompt removed from bookmarks"
      );
      router.refresh();
    } catch (error) {
      setIsBookmarked(!newStatus);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="group relative w-full h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-none hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-transparent to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative px-5 pt-5 pb-3 flex justify-between items-start shrink-0">
        <div className="flex gap-2 items-center flex-wrap">
          <div
            className={`flex items-center gap-1.5 py-1 px-3 rounded-full transition-all duration-200 group-hover:shadow-sm border ${categoryClasses}`}
          >
            <RiRobot2Line className="w-3.5 h-3.5" />
            <span className="font-medium text-xs tracking-wide">
              {prompt.category}
            </span>
          </div>

          {session?.user?.id === prompt.userId && (
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
              <button
                className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 cursor-pointer"
                type="button"
                onClick={handleEdit}
                title="Edit prompt"
              >
                <FiEdit2 className="text-sm" />
              </button>
              <button
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-200 cursor-pointer"
                type="button"
                onClick={handleDelete}
                title="Delete prompt"
              >
                <FiTrash2
                  className={`text-sm ${isDeleting ? "animate-pulse" : ""}`}
                />
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPrompt(prompt);
          }}
          className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg"
          title="Quick View"
        >
          <MdOutlineRemoveRedEye className="text-lg" />
        </button>
      </div>

      <Link
        href={`/prompt/${prompt.id}`}
        className="relative cursor-pointer flex-grow flex flex-col px-5"
      >
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-snug line-clamp-2 group-hover:text-indigo-900 dark:group-hover:text-indigo-300 transition-colors duration-200">
          {prompt.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mt-2 flex-grow">
          {prompt.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {prompt.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-md text-xs font-medium border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors duration-150"
            >
              {tag}
            </span>
          ))}
          {prompt.tags.length > 4 && (
            <span className="text-gray-400 dark:text-gray-500 text-xs px-1.5 py-0.5">
              +{prompt.tags.length - 4}
            </span>
          )}
        </div>
      </Link>

      <div className="relative border-t border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 group-hover:bg-gray-50/80 dark:group-hover:bg-gray-800/80 transition-colors duration-200">
        <div className="flex justify-between items-center px-5 py-3">
          <Link href={`/profile/${prompt.userId}`}>
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <Image
                  src={
                    prompt.img?.startsWith("http")
                      ? prompt.img
                      : "/images/user-alt-img.jpg"
                  }
                  width={32}
                  height={32}
                  alt="user-image"
                  className="rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm object-cover"
                />
                {/* <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white dark:ring-gray-800" /> */}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight truncate">
                  {prompt.userName}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 leading-tight">
                  Creator
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ShareButtons
              title={`Check out this prompt: ${prompt.title}`}
              text={prompt.description}
              size="sm"
            />
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isBookmarked
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                  : "text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              }`}
              title={isBookmarked ? "Remove from bookmarks" : "Save prompt"}
            >
              {isBookmarked ? (
                <FaBookmark className="text-lg" />
              ) : (
                <FaRegBookmark className="text-lg" />
              )}
            </button>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1" />
            <VotingButtons
              promptId={prompt.id}
              initialLikes={prompt.likes}
              initialDislikes={prompt.dislikes}
              userVoteStatus={prompt.userVoteStatus}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <EditPrompt
          isOpen={isEditing}
          closeModal={handleClose}
          prompt={prompt}
        />
      )}
    </div>
  );
};
