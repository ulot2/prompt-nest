import Link from "next/link";

type UserTabsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function UserTabs({ searchParams }: UserTabsProps) {
  const params = await searchParams;
  const filter = (params.filter as string) || "published";

  return (
    <div className="flex items-center gap-6 mb-6 border-b border-gray-200 dark:border-gray-800">
      <Link
        href="?filter=published"
        className={`pb-3 text-sm font-medium transition-colors relative ${
          filter === "published"
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        }`}
      >
        Published
        {filter === "published" && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
        )}
      </Link>
      <Link
        href="?filter=saved"
        className={`pb-3 text-sm font-medium transition-colors relative ${
          filter === "saved"
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        }`}
      >
        Saved Prompts
        {filter === "saved" && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
        )}
      </Link>
    </div>
  );
}
