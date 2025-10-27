import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { login } from "@/lib/actions/auth";

export const Login = () => {
  return (
    <form>
      <p className="mt-[1rem] text-gray-400 text-center mb-[1rem]">
        Welcome back! Sign in to your account
      </p>
      <div className="w-full flex flex-col gap-[1rem] justify-between">
        <button
          type="button"
          className="flex justify-center items-center gap-[1rem] border border-gray-300 py-[0.5rem] px-[4rem] rounded-lg hover:bg-[#e9ebef] transition cursor-pointer"
          onClick={() => login("google")}
        >
          <FcGoogle />
          <span>Continue with Google</span>
        </button>
        <button
          type="button"
          className="flex justify-center items-center gap-[1rem] border border-gray-300 py-[0.5rem] px-[4rem] rounded-lg hover:bg-[#e9ebef] transition cursor-pointer"
          onClick={() => login("github")}
        >
          <FaGithub />
          <span>Continue with Github</span>
        </button>
      </div>
    </form>
  );
};
