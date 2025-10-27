import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { login } from "@/lib/actions/auth";

export const Signup = () => {
  return (
    <form>
      <p className="mt-[1rem] text-gray-400 text-center mb-[1rem]">
        Create an account to start sharing prompts
      </p>
      {/* social login buttons */}
      <div className="w-full flex flex-col gap-[1rem] justify-between">
        <button
          type="button"
          className="flex justify-center items-center gap-[1rem] border border-gray-300 py-[0.5rem] px-[4rem] rounded-lg hover:bg-[#e9ebef] transition cursor-pointer"
          onClick={() => login("google")}
        >
          <FcGoogle />
          <span>Sign up with Google</span>
        </button>
        <button
          type="button"
          className="flex justify-center items-center gap-[1rem] border border-gray-300 py-[0.5rem] px-[4rem] rounded-lg hover:bg-[#e9ebef] transition cursor-pointer"
          onClick={() => login("github")}
        >
          <FaGithub />
          <span>Sign up with Github</span>
        </button>
      </div>
    </form>
  );
};
