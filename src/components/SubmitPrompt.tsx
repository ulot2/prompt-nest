"use client";

import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SubmitPrompt = ({ isOpen, closeModal }: ModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  if (!isOpen) {
    return null;
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      >
        <motion.div
          className="bg-white w-[40%] h-[85%] p-[1.3rem] rounded-lg overflow-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] font-semibold">Submit Prompt</h1>
            <button
              type="button"
              className="text-[25px] text-[#848587] hover:text-black transition cursor-pointer"
              onClick={closeModal}
            >
              <IoIosClose />
              <p className="sr-only">Close</p>
            </button>
          </div>
          <p className="text-[#848587] text-[14px]">
            Share your favorite AI prompt with the community. Make sure it's
            useful and well-documented!
          </p>
          {/* submit prompt form */}
          <form className="mt-[1rem]">
            <div>
              <label htmlFor="promptTitle" className="block font-semibold">
                Title
              </label>
              <input
                type="text"
                name="promptTitle"
                id="promptTitle"
                placeholder="E.g., Professional Email Writer"
                className="w-full bg-[#ececf0] placeholder:text-[14px] flex items-center focus:outline-3 focus:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="promptDescription"
                className="block font-semibold"
              >
                Description
              </label>
              <textarea
                name="promptDescription"
                placeholder="Brief description of what this prompt does..."
                className="w-full h-15 bg-[#ececf0] placeholder:text-[14px] resize-none focus:outline-3 focus:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg"
              ></textarea>
            </div>
            <div>
              <label htmlFor="promptCategory" className="block font-semibold">
                Category
              </label>
              <input
                type="text"
                name="promptCategory"
                id="promptCategory"
                placeholder="E.g., ChatGPT, Gemini, Claude"
                className="w-full bg-[#ececf0] flex items-center placeholder:text-[14px] focus:outline-3 focus:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="fullPrompt" className="block font-semibold">
                Full Prompt
              </label>
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                name="fullPrompt"
                placeholder="Paste your complete prompt here..."
                className="w-full whitespace-pre-wrap font-mono text-sm bg-[#ececf0] placeholder:text-[14px] resize-none focus:outline-3 focus:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg"
              ></textarea>
            </div>
            <div>
              <label htmlFor="promptCategory" className="block font-semibold">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="promptCategory"
                id="promptCategory"
                placeholder="E.g., email, professional, marketing"
                className="w-full bg-[#ececf0] flex items-center placeholder:text-[14px] focus:outline-3 focus:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-[10px]">
              <button
                type="button"
                className="border border-gray-300 font-semibold w-[80px] p-[0.3rem] rounded-lg cursor-pointer transform  duration-200 hover:scale-105 hover:bg-[#e9ebef] transition"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-black text-white text-[14px] px-[10px] items-center gap-[2%] font-semibold  rounded-lg cursor-pointer transform  duration-200 hover:scale-105 transition"
              >
                Submit Prompt
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
