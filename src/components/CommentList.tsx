import { getComments } from "@/actions/actions";
import { auth } from "@/auth";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

export async function CommentList({ promptId }: { promptId: number }) {
  const comments = await getComments(promptId);
  const session = await auth();
  const userId = session?.user?.id;

  /* Logic removed: flattening comments */

  return (
    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
        Discussion ({comments.length})
      </h3>

      <div className="space-y-4 mb-12">
        {comments.map((comment: any) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserIds={userId}
            promptId={promptId}
          />
        ))}

        {comments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No comments yet. Be the first to start the discussion!
          </p>
        )}
      </div>

      {userId ? (
        <CommentForm promptId={promptId} />
      ) : (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center text-sm text-gray-500 dark:text-gray-400">
          Please log in to leave a comment.
        </div>
      )}
    </div>
  );
}
