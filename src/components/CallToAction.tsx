"use client";

import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import { motion } from "motion/react";

export function CallToAction() {
  return (
    <section className="relative w-full py-24 md:py-32 px-4 md:px-6 overflow-hidden border-t border-gray-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Minimal Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-medium tracking-wide uppercase">
            <HiOutlineSparkles className="text-orange-500" />
            <span>Join the Community</span>
          </div>

          {/* Clean Typography Heading */}
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 dark:text-white tracking-tight leading-tight">
            Ready to find your <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="relative z-10 text-gray-900 dark:text-white">
                perfect prompt?
              </span>
              {/* Subtle underline highlight */}
              <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-200/50 dark:bg-orange-900/40 -z-0 -rotate-1 rounded-sm" />
            </span>
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Start touring now as a guest, or create an account to save, submit,
            and engage with the community.
          </p>

          {/* Minimal Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/feed" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black rounded-lg font-medium transition-all duration-300 shadow-lg shadow-gray-200/50 dark:shadow-none flex items-center justify-center gap-2">
                Browse Prompts
              </button>
            </Link>

            <Link href="/auth/login" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                Sign Up Free
                <HiOutlineArrowRight className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
