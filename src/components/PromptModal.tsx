"use client";

import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: {
    id: number;
    category: string;
    title: string;
    description: string;
    fullPrompt: string;
    tags: string[];
    img: string;
    userName: string;
  } | null;
}

export const PromptModal = ({ isOpen, onClose, prompt }: PromptModalProps) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  const handleCopy = async () => {
    try {
      if (!prompt) return;
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopyError("Failed to copy");
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && prompt && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-[40%] h-[85%] p-[1rem] rounded-lg overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-[0.5rem]">
                <div className="bg-[#e6e7f7] border border-[#adb0f7] py-[0.1rem] px-[1rem] rounded-[200px]">
                  <h1 className="text-[#343ad1] font-semibold text-[13px]">
                    chatgpt
                  </h1>
                </div>
                <p className="text-[#848587]">6 days ago</p>
              </div>
              <button
                type="button"
                className="text-[25px] text-[#848587] hover:text-black transition cursor-pointer"
                onClick={onClose}
              >
                <IoIosClose />
                <p className="sr-only">Close</p>
              </button>
            </div>

            <h1 className="text-2xl font-semibold mt-[0.8rem]">
              {prompt.title}
            </h1>
            <p className="text-[13px] text-[#848587] mt-[0.5rem]">
              {prompt.description}
            </p>

            <div className="mt-[1.5rem] flex gap-[0.5rem]">
              <Image
                src={prompt.img}
                width={45}
                height={45}
                alt="user-image"
                className="rounded-[50%] mr-[5px]"
              />
              <div>
                <h4>{prompt.userName}</h4>
                <p className="flex gap-[0.4rem] text-[#848587] text-[15px]">
                  <span>324 votes</span> . <span>4212 views</span>
                </p>
              </div>
            </div>

            <div className="flex gap-[0.5rem] my-[1rem]">
              {prompt.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]"
                >
                  {tag}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <p>Prompt</p>
              <button
                type="button"
                className="flex justify-center items-center gap-[7px] border border-gray-300 hover:bg-[#e9ebef] transition px-[14px] py-[5px] rounded-lg cursor-pointer"
                onClick={handleCopy}
              >
                {!copied ? <FaRegCopy /> : <IoCheckmark />}
                <span>{!copied ? "Copy" : "Copied"}</span>
              </button>
            </div>

            <div className="bg-[#ececf0] mt-[0.7rem] p-[0.7rem] rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {prompt.fullPrompt}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
