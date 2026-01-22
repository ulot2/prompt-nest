"use client";

import { IoIosSearch, IoIosClose, IoIosRocket } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Session } from "next-auth";

interface LandingHeroProps {
  session: Session | null;
}

export const LandingHero = ({ session }: LandingHeroProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/feed?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/feed");
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 md:pt-32 md:pb-12 flex flex-col items-center justify-center overflow-hidden md:overflow-visible">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-200/40 to-rose-200/40 dark:from-orange-900/20 dark:to-rose-900/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-teal-200/30 to-emerald-200/30 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-orange-200/50 dark:border-white/10 shadow-sm shadow-orange-100/50 dark:shadow-none hover:bg-white/80 dark:hover:bg-white/10 transition-colors duration-300 cursor-default">
          {/* <HiOutlineSparkles className="text-orange-500 dark:text-orange-400 text-sm animate-pulse" /> */}
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wide uppercase text-[11px]">
            The Creative Nest
          </span>
        </span>
      </motion.div>

      <div className="text-center max-w-5xl mx-auto mb-10 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[1.0] text-gray-900 dark:text-white text-balance"
        >
          Find the Perfect <br className="hidden md:block" />
          <span className="italic relative inline-block px-2">
            <span className="relative z-10 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 dark:from-orange-400 dark:via-rose-400 dark:to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              AI Prompt,
            </span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-100/50 dark:bg-orange-900/30 -rotate-1 -z-0 rounded-full blur-[2px]" />
          </span>{" "}
          Every Time!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="pt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Welcome to the nest, a community-powered library of prompts for{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            ChatGPT
          </span>
          ,{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Claude
          </span>
          ,{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Gemini
          </span>{" "}
          and more.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto mb-12 relative z-20 group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 rounded-2xl opacity-20 blur transition duration-500 group-hover:opacity-40" />
        <form
          onSubmit={handleSearch}
          className={`
            relative flex items-center gap-4 px-4 py-2
            bg-white dark:bg-gray-900/90 backdrop-blur-xl
            rounded-2xl border transition-all duration-300 ease-out
            ${
              isFocused
                ? "border-orange-500 ring-4 ring-orange-500/10 dark:ring-orange-400/20 shadow-2xl shadow-orange-500/10"
                : "border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none"
            }
          `}
        >
          <div
            className={`p-2 rounded-xl transition-colors duration-300 ${isFocused ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}
          >
            <IoIosSearch className="text-xl" />
          </div>

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for inspiration..."
            className="flex-1 py-3 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none touch-manipulation"
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <IoIosClose className="text-xl" />
              </motion.button>
            )}
          </AnimatePresence>

          <button
            type="submit"
            aria-label="Search"
            className="hidden sm:flex px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
      >
        <Link href="/feed" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
            <IoIosSearch className="text-xl" />
            Explore collection
          </button>
        </Link>
        {!session?.user && (
          <Link href="/auth/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2">
              <IoIosRocket className="text-xl text-orange-600 dark:text-orange-400" />
              Join the nest
            </button>
          </Link>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 flex flex-wrap justify-center items-center gap-x-3 gap-y-3 max-w-2xl text-center"
      >
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mr-2">
          Trending
        </span>
        {["Writing", "Coding", "Marketing", "SEO", "Midjourney", "DALL-E"].map(
          (tag) => (
            <Link key={tag} href={`/feed?search=${tag}`}>
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1 rounded-full text-xs font-medium bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-500 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 backdrop-blur-sm"
              >
                {tag}
              </motion.button>
            </Link>
          ),
        )}
      </motion.div>
    </div>
  );
};
