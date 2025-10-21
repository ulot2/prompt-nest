import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center mb-[1rem]">
        <h1 className="text-3xl font-bold">PromptNest</h1>
        <p className="text-gray-600">Join the AI prompt community</p>
      </div>
      <div className="bg-white shadow-xl border-2 border-[#ececf0] w-[40%] px-[2rem] py-[1rem] rounded-xl">
        <div className="bg-[#ececf0] py-[0.4rem] px-[0.8rem] rounded-lg flex justify-between">
          <button
            type="button"
            className="text-[15px] bg-white w-[50%] rounded-lg p-[0.2rem] cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            className="text-[15px] w-[50%] rounded-lg cursor-pointer"
          >
            Sign Up
          </button>
        </div>
        <div>
          <p className="mt-[1rem] text-gray-400 text-center mb-[1rem]">
            Welcome back! Sign in to your account
          </p>
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
        </div>
      </div>
    </div>
  );
}
