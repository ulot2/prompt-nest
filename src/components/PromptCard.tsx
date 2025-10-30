import Image from "next/image";
import React, { useState } from "react";
import { VotingButtons } from "./VotingButtons";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { deletePrompt, editPrompt } from "@/actions/actions";
import toast from "react-hot-toast";
import { EditPrompt } from "./EditPromptModal";
import { useRouter } from "next/dist/client/components/navigation";

type PromptCardProps = {
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

type Prompt = {
  prompt: PromptCardProps;
  setSelectedPrompt: React.Dispatch<React.SetStateAction<{}>>;
  session: any;
};

export const PromptCard = ({ prompt, setSelectedPrompt, session }: Prompt) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleEdit = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this prompt?"
    );
    setIsDeleting(true);
    if (!confirm) {
      setIsDeleting(false);
      return;
    }
    if (confirm) {
      try {
        await deletePrompt(prompt.id);
        router.refresh();
        toast.success("Prompt deleted successfully");
        setIsDeleting(false);
      } catch (error) {
        toast.error("Failed to delete prompt");
      }
    }
  };

  return (
    <div className="w-full h-[290px] border border-gray-300 rounded-[1.2rem] bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="px-[1.2rem] pt-[1.2rem] mb-[0.2rem] flex justify-between">
        <div className="flex gap-[0.5rem] items-center">
          <div className="bg-[#e6e7f7] border border-[#adb0f7] py-[0.1rem] px-[1rem] rounded-[200px]">
            <h1 className="text-[#343ad1] font-semibold text-[13px]">
              {prompt.category}
            </h1>
          </div>
          {session?.user?.id === prompt.userId && (
            <div>
              <button
                className="border border-gray-300 px-[0.4rem] rounded-lg text-[12px] hover:bg-gray-100 transition cursor-pointer"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="border border-gray-300 px-[0.4rem] ml-[0.5rem] rounded-lg text-[12px] hover:bg-gray-100 transition cursor-pointer"
                type="button"
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center text-[#848587] sr-only">
          <MdOutlineRemoveRedEye />
          <span className="ml-[2px]">5689</span>
        </div>
      </div>
      <div onClick={() => setSelectedPrompt(prompt)} className="cursor-pointer">
        <div>
          <h1 className="px-[1.2rem]">{prompt.title}</h1>
        </div>
        <p className="px-[1.2rem] text-[#848587]">{prompt.description}</p>
        <div className="px-[1.2rem] flex gap-[0.5rem] my-[2rem]">
          {prompt.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <hr className="border border-gray-100 " />
      <div className="flex justify-between items-center px-[1.2rem] py-[1rem]">
        <div className="flex items-center">
          <Image
            src={
              prompt.img?.startsWith("http")
                ? prompt.img
                : "/images/user-alt-img.jpg"
            }
            width={30}
            height={30}
            alt="user-image"
            className="rounded-[50%] mr-[5px]"
          />
          <p>{prompt.userName}</p>
        </div>
        <div>
          <VotingButtons />
        </div>
      </div>
      {isEditing && (
        <EditPrompt
          isOpen={isEditing}
          closeModal={handleClose}
          prompt={prompt}
        />
      )}
    </div>
  );
};
