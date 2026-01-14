"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IoIosArrowRoundBack, IoIosAdd } from "react-icons/io";
import { SubmitPrompt } from "./SubmitPrompt";

export const UserInfoHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors duration-300">
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center py-4 px-4 md:px-0">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-200">
              <IoIosArrowRoundBack className="text-xl" />
            </div>
            <span className="font-medium text-sm">Back to Home</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold shadow-lg shadow-gray-900/20 dark:shadow-none hover:shadow-gray-900/30 transition-all duration-300"
          >
            <IoIosAdd className="text-xl" />
            <span>Submit prompt</span>
          </motion.button>
        </div>
      </div>
      <SubmitPrompt isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
