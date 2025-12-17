"use client";

import { useRef, useState, FormEvent, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import { editPrompt } from "@/actions/actions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/dist/client/components/navigation";

type PromptEditProps = {
  id: number;
  category: string;
  title: string;
  description: string;
  fullPrompt: string;
  tags: string[];
  img: string;
  userName: string;
  userId: string;
};

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  prompt: PromptEditProps;
};

export const EditPrompt = ({ isOpen, closeModal, prompt }: ModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [promptTitle, setPromptTitle] = useState(prompt.title);
  const [promptDescription, setPromptDescription] = useState(
    prompt.description
  );
  const [fullPrompt, setFullPrompt] = useState(prompt.fullPrompt);
  const [promptCategory, setPromptCategory] = useState(prompt.category);
  const [promptTags, setPromptTags] = useState(prompt.tags.join(", "));
  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(true);

    const formData = new FormData();
    formData.append("promptTitle", promptTitle);
    formData.append("promptDescription", promptDescription);
    formData.append("fullPrompt", fullPrompt);
    formData.append("promptCategory", promptCategory);
    formData.append("promptTags", promptTags);

    try {
      await editPrompt(formData, prompt.id);
      router.refresh();
      closeModal();
      toast.success("Prompt edited successfully!");
    } catch (error) {
      toast.error("Failed to edit prompt");
    } finally {
      setIsEditing(false);
    }
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
          ref={modalRef}
          className="bg-white w-[40%] h-[85%] p-[1.3rem] rounded-lg overflow-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] font-semibold">Edit Prompt</h1>
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
          <form onSubmit={handleSubmit} className="mt-[1rem]">
            <div>
              <label htmlFor="promptTitle" className="block font-semibold">
                Title
              </label>
              <input
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
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
                value={promptDescription}
                onChange={(e) => setPromptDescription(e.target.value)}
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
                value={promptCategory}
                onChange={(e) => setPromptCategory(e.target.value)}
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
                value={fullPrompt}
                onChange={(e) => setFullPrompt(e.target.value)}
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
                value={promptTags}
                onChange={(e) => setPromptTags(e.target.value)}
                type="text"
                name="promptTags"
                id="promptTags"
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
                type="submit"
                disabled={isEditing}
                className="bg-black text-white text-[14px] px-[10px] items-center gap-[2%] font-semibold  rounded-lg cursor-pointer transform  duration-200 hover:scale-105 transition"
              >
                {isEditing ? (
                  <>
                    Editing
                    <span className="inline-block animate-pulse">.</span>
                    <span className="inline-block animate-pulse [animation-delay:0.2s]">
                      .
                    </span>
                    <span className="inline-block animate-pulse [animation-delay:0.4s]">
                      .
                    </span>
                  </>
                ) : (
                  "Edit Prompt"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
