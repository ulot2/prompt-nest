"use client";

import { motion } from "motion/react";
import {
  HiOutlineSparkles,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineCloudArrowUp,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineSparkles,
    title: "Discover",
    description:
      "Search and filter through community-curated prompts for ChatGPT, Claude, Gemini, and more.",
    color: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    icon: HiOutlineBookmark,
    title: "Save & Organize",
    description:
      "Bookmark your favorite prompts and keep track of everything you've uploaded (requires login).",
    color: "from-violet-500 to-purple-500",
    delay: 0.2,
  },
  {
    icon: HiOutlineHeart,
    title: "Engage",
    description:
      "Like prompts that work for you and leave comments to help the community improve (requires login).",
    color: "from-rose-500 to-pink-500",
    delay: 0.3,
  },
  {
    icon: HiOutlineShare,
    title: "Share",
    description:
      "Copy prompts instantly or share them with your team, no login required.",
    color: "from-orange-500 to-amber-500",
    delay: 0.4,
  },
  {
    icon: HiOutlineCloudArrowUp,
    title: "Contribute",
    description:
      "Upload your best prompts in seconds and build your reputation as a prompt creator (requires login).",
    color: "from-emerald-500 to-teal-500",
    delay: 0.5,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900/20 dark:to-gray-800/20 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
        >
          Why{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              PromptNest?
            </span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-100/50 dark:bg-orange-900/30 -rotate-1 -z-0 rounded-full blur-[2px]" />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
        >
          The secrets to utilizing the full potential of AI models are right
          prompts. PromptNest is where real people share real prompts that
          actually work. Are you having issues creating the perfect email,
          debugging a code or just brainstorming ideas? PromptNest is where to
          find battle-tested prompts created by people who have been exactly
          where you are.
        </motion.p>
      </div>

      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
        >
          Features Overview
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: feature.delay }}
            className={`
              relative group p-8 rounded-3xl border border-gray-100 dark:border-white/5 
              bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
              hover:bg-white dark:hover:bg-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none
              transition-all duration-300 hover:-translate-y-1
              ${index === 3 || index === 4 ? "lg:col-span-1.5 relative left-0" : ""} 
              /* For the last two items to be centered in a customized way if needed, or simple grid */
            `}
          >
            <div
              className={`
              w-12 h-12 rounded-2xl flex items-center justify-center mb-6
              bg-gradient-to-br ${feature.color} text-white
              shadow-lg shadow-gray-200 dark:shadow-none
              transform group-hover:scale-110 transition-transform duration-300
            `}
            >
              <feature.icon className="text-2xl" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>

            <div className="absolute inset-0 border border-transparent group-hover:border-gray-200 dark:group-hover:border-white/10 rounded-3xl transition-colors duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
