"use client";

import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8">
      <div className="text-center mb-[1rem]">
        <Link href="">
          <h1 className="text-3xl font-bold dark:text-gray-100">PromptNest</h1>
        </Link>
        <p className="text-gray-600 dark:text-gray-400">
          Join the AI prompt community
        </p>
      </div>
      <div className="bg-white dark:bg-[#0d1117] shadow-xl border-2 border-[#ececf0] dark:border-white/10 lg:w-[40%] md:w-[60%] w-[90%] max-w-md px-[1rem] md:px-[2rem] py-[1rem] rounded-xl">
        {/* <div className="bg-[#ececf0] py-[0.4rem] px-[0.8rem] rounded-lg flex justify-between">
          <button
            type="button"
            className={`text-[15px] ${
              activeTab === "login" ? "bg-white" : ""
            } w-[50%] rounded-lg p-[0.2rem] cursor-pointer`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`text-[15px] ${
              activeTab === "signup" ? "bg-white" : ""
            } w-[50%] rounded-lg p-[0.2rem] cursor-pointer`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div> */}

        {/* login */}
        {/* {activeTab === "login" ? <Login /> : <Signup />} */}
        <Login />
      </div>

      {/* {activeTab === "login" ? (
        <footer className="py-[2rem]">
          <p className="text-[#717182]">
            {"Don't have an account?"}
            <span
              className="text-black font-semibold cursor-pointer hover:underline ml-[0.2rem]"
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </span>
          </p>
        </footer>
      ) : (
        <footer className="py-[2rem]">
          <p className="text-[#717182]">
            Already an account?
            <span
              className="text-black font-semibold cursor-pointer hover:underline ml-[0.2rem]"
              onClick={() => setActiveTab("login")}
            >
              Login
            </span>
          </p>
        </footer>
      )} */}
    </div>
  );
}
