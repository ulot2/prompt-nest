"use client";

import { deleteComment, editComment } from "@/actions/actions";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CommentForm } from "./CommentForm";

interface CommentItemProps {
  comment: {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
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
  replies = [],
  depth = 0,
}: CommentItemProps & {
  replies?: CommentItemProps["comment"][];
  depth?: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

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

  const handleEdit = () => {
    startTransition(async () => {
      try {
        await editComment(comment.id, promptId, editText);
        setIsEditing(false);
        toast.success("Comment updated");
      } catch (error) {
        toast.error("Failed to update comment");
      }
    });
  };

  const isAuthor = currentUserIds === comment.userId;
  const isReply = depth > 0;

  return (
    <div
      className={
        isReply
          ? "flex gap-3 md:gap-4 py-3"
          : "flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
      }
    >
      <div className="flex-shrink-0">
        <Image
          src={comment.user.image || "/images/user-alt-img.jpg"}
          alt={comment.user.name || "User"}
          width={40}
          height={40}
          className={`rounded-full ${
            isReply ? "w-6 h-6 md:w-8 md:h-8" : "w-8 h-8 md:w-10 md:h-10"
          }`}
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
              {comment.updatedAt > comment.createdAt && (
                <span className="ml-1 text-gray-400 italic">(edited)</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {currentUserIds && !isEditing && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-xs font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Reply
              </button>
            )}
            {isAuthor && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={isPending}
                  className="text-gray-400 hover:text-indigo-500 transition-colors p-1"
                  aria-label="Edit comment"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Delete comment"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="mt-2">
            <label htmlFor="edit-text" className="sr-only">
              Edit Comment
            </label>
            <textarea
              id="edit-text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-y text-sm text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditText(comment.text);
                }}
                disabled={isPending}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={isPending}
                className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap break-words leading-relaxed">
            {comment.text}
          </p>
        )}

        {isReplying && (
          <div className="mt-4">
            <CommentForm
              promptId={promptId}
              parentId={comment.id}
              onSuccess={() => setIsReplying(false)}
              autoFocus
            />
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-800 pl-2 md:pl-4">
            {replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                currentUserIds={currentUserIds}
                promptId={promptId}
                replies={reply.replies}
                depth={(depth || 0) + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
