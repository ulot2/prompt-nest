import Link from "next/link";
import { SiNextdotjs, SiPrisma, SiGithub } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 backdrop-blur-sm py-12 mt-auto">
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl tracking-tight">
                PromptNest
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
              Discover, share, and improve AI prompts. Join our community of
              creators and prompt engineers.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/ulot2/prompt-nest"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <SiGithub className="text-xl" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/feed"
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Latest Prompts
                </Link>
              </li>
              {/* Assuming generic login/signup for now, or use auth logic later if needed to hide/show */}
              <li>
                <Link
                  href="/login" // Or check if we have a specific route, usually handled by NextAuth
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Login / Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} PromptNest. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Built with
            </span>
            <SiNextdotjs className="hidden sm:inline" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              &
            </span>
            <SiPrisma className="hidden sm:inline text-indigo-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
