"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack, IoIosAdd } from "react-icons/io";
import { SubmitPrompt } from "./SubmitPrompt";

export const UserInfoHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="border-b border-gray-300 bg-white">
        <div className="w-full max-w-[900px] mx-auto flex justify-between items-center my-[0.5rem] px-4 md:px-0">
          <div className="flex items-center">
            <IoIosArrowRoundBack />
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => router.back()}
            >
              Back to Home
            </button>
          </div>
          <button
            type="button"
            className="bg-black text-white p-[0.3rem] flex justify-center items-center gap-[2%] w-[160px] font-semibold  rounded-lg cursor-pointer transform  duration-200 hover:scale-105 hover:bg-[#2f3030] transition"
            onClick={openModal}
          >
            <IoIosAdd />
            Submit prompt
          </button>
        </div>
      </div>
      <SubmitPrompt isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
