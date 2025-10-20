import Image from "next/image";
import React from "react";
import { VotingButtons } from "./VotingButtons";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";

type Promptss = {
  id: number;
  category: string;
  title: string;
  description: string;
  tag1: string;
  tag2: string;
  tag3: string;
  img: string;
  userName: string;
};

type Prompt = {
  prompt: Promptss;
};

export const PromptCard = ({ prompt }: Prompt) => {
  return (
    <div className="w-full border border-gray-300 rounded-[1.2rem] bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="px-[1.2rem] pt-[1.2rem] mb-[0.2rem] flex justify-between">
        <div className="bg-[#e6e7f7] border border-[#adb0f7] py-[0.1rem] px-[1rem] rounded-[200px]">
          <Link href={`/prompt/${prompt.id}`}>
            <h1 className="text-[#343ad1] font-semibold text-[13px]">
              {prompt.category}
            </h1>
          </Link>
        </div>
        <div className="flex items-center text-[#848587]">
          <MdOutlineRemoveRedEye />
          <span className="ml-[2px]">5689</span>
        </div>
      </div>
      <h1 className="px-[1.2rem]">{prompt.title}</h1>
      <p className="px-[1.2rem] text-[#848587]">{prompt.description}</p>
      <div className="px-[1.2rem] flex gap-[0.5rem] my-[2rem]">
        <div className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]">
          {prompt.tag1}
        </div>
        <div className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]">
          {prompt.tag2}
        </div>
        <div className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]">
          {prompt.tag3}
        </div>
      </div>
      <hr className="border border-gray-100 " />
      <div className="flex justify-between items-center px-[1.2rem] py-[1rem]">
        <div className="flex items-center">
          <Image
            src={prompt.img}
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
    </div>
  );
};
