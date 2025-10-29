"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { IoIosLogIn, IoIosAdd } from "react-icons/io";
import { SubmitPrompt } from "./SubmitPrompt";
import { useState } from "react";
import { Session } from "next-auth";
import Image from "next/image";
import { div } from "motion/react-client";
import { logout } from "@/lib/actions/auth";

interface NavbarProps {
  session: Session | null;
}

export const Navbar = ({ session }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="border-b border-gray-300 bg-white">
      <div className="w-full max-w-[900px] mx-auto flex justify-between items-center my-[0.5rem]">
        <div className="cursor-pointer">
          <h1 className="text-2xl font-bold">PromptNest</h1>
          <p className="text-[10px] text-[#aeb0af] font-bold">
            Community AI prompts
          </p>
        </div>
        <div className="flex gap-[4%]">
          {session?.user ? (
            ""
          ) : (
            <Link href="/auth/login">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex justify-center items-center gap-[5px] border border-gray-300 font-semibold w-[100px] p-[0.3rem] rounded-lg cursor-pointer transform  duration-200 hover:scale-105 hover:bg-[#e9ebef] transition"
              >
                <IoIosLogIn />
                Login
              </motion.button>
            </Link>
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-black text-white flex justify-center items-center gap-[2%] w-[160px] font-semibold  rounded-lg cursor-pointer transform  duration-200 hover:scale-105 hover:bg-[#2f3030] transition"
            onClick={openModal}
          >
            <IoIosAdd />
            Submit prompt
          </motion.button>
          <div>
            {session?.user && (
              <div className="flex gap-[10px] items-center">
                <Link href="/user-info">
                  <div className="flex border border-gray-300 py-[0.3rem] px-[0.5rem] rounded-lg gap-[5px] items-center hover:bg-gray-100 transition cursor-pointer">
                    <Image
                      className="rounded-[50%]"
                      src={session.user.image ?? ""}
                      width={23}
                      height={23}
                      alt="avatar"
                    />
                    <span>Profile</span>
                  </div>
                </Link>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="border border-gray-300 w-[100px] py-[0.3rem] px-[1rem] rounded-lg gap-[5px] items-center hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => logout()}
                >
                  Sign out
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
      <SubmitPrompt isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
