"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import { createPrompt } from "@/actions/actions";
import { toast } from "react-hot-toast";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SubmitPrompt = ({ isOpen, closeModal }: ModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createPrompt(formData);
      closeModal();
      toast.success("Prompt submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit prompt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      >
        <motion.div
          ref={modalRef}
          className="bg-white dark:bg-gray-900 w-full lg:w-[40%] h-[85%] p-[1.3rem] rounded-lg overflow-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] font-semibold text-gray-900 dark:text-white">
              Submit Prompt
            </h1>
            <button
              type="button"
              className="text-[25px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer"
              onClick={closeModal}
            >
              <IoIosClose />
              <p className="sr-only">Close</p>
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[14px]">
            {
              "Share your favorite AI prompt with the community. Make sure it's useful and well-documented!"
            }
          </p>
          {/* submit prompt form */}
          <form onSubmit={handleSubmit} className="mt-[1rem]">
            <div>
              <label
                htmlFor="promptTitle"
                className="block font-semibold text-gray-900 dark:text-gray-200"
              >
                Title
              </label>
              <input
                type="text"
                name="promptTitle"
                id="promptTitle"
                placeholder="E.g., Professional Email Writer"
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-[14px] flex items-center focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 shadow-sm py-[0.5rem] px-[0.75rem] mt-[0.3rem] mb-[1rem] rounded-lg border border-transparent dark:border-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="promptDescription"
                className="block font-semibold text-gray-900 dark:text-gray-200"
              >
                Description
              </label>
              <textarea
                name="promptDescription"
                placeholder="Brief description of what this prompt does..."
                className="w-full h-24 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 shadow-sm py-[0.5rem] px-[0.75rem] mt-[0.3rem] mb-[1rem] rounded-lg border border-transparent dark:border-gray-700"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="promptCategory"
                className="block font-semibold text-gray-900 dark:text-gray-200"
              >
                Category
              </label>
              <input
                type="text"
                name="promptCategory"
                id="promptCategory"
                placeholder="E.g., ChatGPT, Gemini, Claude"
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-[14px] flex items-center focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 shadow-sm py-[0.5rem] px-[0.75rem] mt-[0.3rem] mb-[1rem] rounded-lg border border-transparent dark:border-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="fullPrompt"
                className="block font-semibold text-gray-900 dark:text-gray-200"
              >
                Full Prompt
              </label>
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                name="fullPrompt"
                placeholder="Paste your complete prompt here..."
                className="w-full whitespace-pre-wrap font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 shadow-sm py-[0.5rem] px-[0.75rem] mt-[0.3rem] mb-[1rem] rounded-lg border border-transparent dark:border-gray-700"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="promptCategory"
                className="block font-semibold text-gray-900 dark:text-gray-200"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="promptTags"
                id="promptTags"
                placeholder="E.g., email, professional, marketing"
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-[14px] flex items-center focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 shadow-sm py-[0.5rem] px-[0.75rem] mt-[0.3rem] mb-[1rem] rounded-lg border border-transparent dark:border-gray-700"
              />
            </div>

            <div className="flex justify-end gap-[10px]">
              <button
                type="button"
                className="border border-gray-300 dark:border-gray-600 font-semibold w-[80px] p-[0.3rem] rounded-lg cursor-pointer transform duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black dark:bg-white text-white dark:text-black text-[14px] px-[10px] items-center gap-[2%] font-semibold rounded-lg cursor-pointer transform duration-200 hover:scale-105 hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg shadow-black/20 dark:shadow-white/20"
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <span className="inline-block animate-pulse">.</span>
                    <span className="inline-block animate-pulse [animation-delay:0.2s]">
                      .
                    </span>
                    <span className="inline-block animate-pulse [animation-delay:0.4s]">
                      .
                    </span>
                  </>
                ) : (
                  "Submit Prompt"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
