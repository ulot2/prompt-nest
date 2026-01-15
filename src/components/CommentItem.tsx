"use client";

import { deleteComment } from "@/actions/actions";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

interface CommentItemProps {
  comment: {
    id: number;
    text: string;
    createdAt: Date;
    userId: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
  currentUserIds?: string;
  promptId: number;
}

export function CommentItem({
  comment,
  currentUserIds,
  promptId,
}: CommentItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    startTransition(async () => {
      try {
        await deleteComment(comment.id, promptId);
        toast.success("Comment deleted");
      } catch (error) {
        toast.error("Failed to delete comment");
      }
    });
  };

  const isAuthor = currentUserIds === comment.userId;

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="flex-shrink-0">
        <Image
          src={comment.user.image || "/images/user-alt-img.jpg"}
          alt={comment.user.name || "User"}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {comment.user.name || "Anonymous"}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(comment.createdAt)}
            </span>
          </div>
          {isAuthor && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Delete comment"
            >
              <FaTrash size={14} />
            </button>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap break-words leading-relaxed">
          {comment.text}
        </p>
      </div>
    </div>
  );
}
