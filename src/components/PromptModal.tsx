import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";

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

export const PromptModal = ({ prompt }: Prompt) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[40%] h-[85%] p-[1rem] rounded-lg overflow-auto">
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
          >
            <IoIosClose />
            <p className="sr-only">Close</p>
          </button>
        </div>
        <h1 className="text-2xl font-semibold mt-[0.8rem]">
          {prompt[0].title}
        </h1>
        <p className="text-[13px] text-[#848587] mt-[0.5rem]">
          {prompt[0].description}
        </p>
        <div className="mt-[1.5rem] flex gap-[0.5rem]">
          <Image
            src={prompt[0].img}
            width={45}
            height={45}
            alt="user-image"
            className="rounded-[50%] mr-[5px]"
          />
          <div>
            <h4>{prompt[0].userName}</h4>
            <p className="flex gap-[0.4rem] text-[#848587] text-[15px]">
              <span>324 votes</span> . <span>4212 views</span>
            </p>
          </div>
        </div>
        <div className="flex gap-[0.5rem] my-[1rem]">
          <div className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]">
            {prompt[0].tag1}
          </div>
          <div className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]">
            {prompt[0].tag2}
          </div>
          <div className="bg-[#eceef2] px-[0.7rem] py-[0.1rem] rounded-[200px] text-[13px]">
            {prompt[0].tag3}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Prompt</p>
          <button
            type="button"
            className="flex justify-center items-center gap-[7px] border border-gray-300 hover:bg-[#e9ebef] transition px-[14px] py-[5px] rounded-lg cursor-pointer"
          >
            <FaRegCopy />
            <span>Copy</span>
          </button>
        </div>
        <div className="bg-[#ececf0] mt-[0.7rem] p-[0.7rem] rounded-lg">
          <p>
            I want you to act as a Socratic tutor. Your role is to help me learn
            by asking thought-provoking questions rather than giving me direct
            answers. Topic I want to learn: [TOPIC] My current understanding:
            [BRIEF DESCRIPTION] Please: 1. Start by assessing my current
            knowledge with a few questions 2. Guide me through the concept using
            the Socratic method 3. Ask leading questions that help me discover
            the answer myself 4. Provide hints if I'm stuck, but don't give away
            the answer 5. Encourage critical thinking and deeper understanding
            6. Build on my responses to lead me to new insights 7. Correct
            misconceptions gently through questioning Remember: Your goal is to
            make me think, not to lecture. Ask one question at a time and wait
            for my response. I want you to act as a Socratic tutor. Your role is
            to help me learn by asking thought-provoking questions rather than
            giving me direct answers. Topic I want to learn: [TOPIC] My current
            understanding: [BRIEF DESCRIPTION] Please: 1. Start by assessing my
            current knowledge with a few questions 2. Guide me through the
            concept using the Socratic method 3. Ask leading questions that help
            me discover the answer myself 4. Provide hints if I'm stuck, but
            don't give away the answer 5. Encourage critical thinking and deeper
            understanding 6. Build on my responses to lead me to new insights 7.
            Correct misconceptions gently through questioning Remember: Your
            goal is to make me think, not to lecture. Ask one question at a time
            and wait for my response.
          </p>
        </div>
      </div>
    </div>
  );
};
