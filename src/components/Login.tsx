import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { GoLock } from "react-icons/go";

export const Login = () => {
  return (
    <form>
      <p className="mt-[1rem] text-gray-400 text-center mb-[1rem]">
        Welcome back! Sign in to your account
      </p>
      {/* social login buttons */}
      <div className="w-full flex justify-between">
        <button
          type="button"
          className="flex justify-center items-center gap-[1rem] border border-gray-300 py-[0.5rem] px-[4rem] rounded-lg hover:bg-[#e9ebef] transition cursor-pointer"
        >
          <FcGoogle />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="flex justify-center items-center gap-[1rem] border border-gray-300 px-[4rem] rounded-lg hover:bg-[#e9ebef] transition cursor-pointer"
        >
          <FaGithub />
          <span>Github</span>
        </button>
      </div>
      <div className="flex items-center w-full max-w-xs mx-auto my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-xs font-medium tracking-wider text-gray-400 uppercase">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      {/* Email input */}
      <div>
        <label htmlFor="login-email" className="text-[15px] font-semibold">
          Email
        </label>
        <div className="w-full bg-[#ececf0] flex items-center focus-within:outline-3 focus-within:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg">
          <AiOutlineMail className="text-[#717182] text-[20px]" />
          <input
            type="email"
            name="login-email"
            id="login-email"
            className="w-full outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>
      {/* password input */}
      <div>
        <label htmlFor="login-password" className="text-[15px] font-semibold">
          Password
        </label>
        <div className="w-full bg-[#ececf0] flex items-center focus-within:outline-3 focus-within:outline-gray-300 shadow-sm  py-[0.3rem] pl-[0.5rem] mt-[0.3rem] mb-[1rem] gap-[10px] rounded-lg">
          <GoLock className="text-[#717182] text-[20px]" />
          <input
            type="password"
            name="login-password"
            id="login-password"
            className="w-full outline-none"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        type="button"
        className="w-full cursor-pointer rounded-lg px-4 py-2.5 font-semibold text-white shadow-md bg-gradient-to-r from-gray-700 to-gray-900 transition-all duration-300 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2
  "
      >
        Sign in
      </button>
    </form>
  );
};
