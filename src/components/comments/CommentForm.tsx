"use client";

import { addComment } from "@/actions/actions";
import { useRef, useTransition } from "react";
import toast from "react-hot-toast";

export function CommentForm({
  promptId,
  onSuccess,
  autoFocus,
}: {
  promptId: number;
  onSuccess?: () => void;
  autoFocus?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    const text = formData.get("comment") as string;
    if (!text?.trim()) return;

    startTransition(async () => {
      try {
        await addComment(promptId, text);
        formRef.current?.reset();
        toast.success("Comment added");
        if (onSuccess) onSuccess();
      } catch (error) {
        toast.error("Failed to add comment. Make sure you are logged in.");
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="mb-8">
      <div className="relative">
        <textarea
          name="comment"
          placeholder="What do you think about this prompt?"
          className="w-full min-h-[100px] p-3 md:p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-y text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
          required
          autoFocus={autoFocus}
        />
        <div className="absolute bottom-3 right-3">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </form>
  );
}
