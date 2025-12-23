"use client";

import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format } from "path";
import { formatTime } from "@/lib/utils";
import { VotingButtons } from "./VotingButtons";

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
    createdAt: string | Date;
    likes: number;
    dislikes: number;
    userVoteStatus?: "LIKE" | "DISLIKE" | null;
  } | null;
}

export const PromptModal = ({ isOpen, onClose, prompt }: PromptModalProps) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

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

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
            ref={modalRef}
            className="bg-white w-full lg:w-[40%] h-[85%] p-[1rem] rounded-lg overflow-auto"
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
                <p className="text-[#848587]">{formatTime(prompt.createdAt)}</p>
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
                src={
                  prompt.img?.startsWith("http")
                    ? prompt.img
                    : "/images/user-alt-img.jpg"
                }
                width={45}
                height={45}
                alt="user-image"
                className="rounded-[50%] mr-[5px]"
              />
              <div className="flex items-center justify-between w-full">
                <h4>{prompt.userName}</h4>
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
              <p>Full prompt</p>
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
            <div className="mt-[10px] flex justify-end">
              <VotingButtons
                promptId={prompt.id}
                initialLikes={prompt.likes}
                initialDislikes={prompt.dislikes}
                userVoteStatus={prompt.userVoteStatus ?? null}
                isLoggedIn={!!prompt.userName}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
