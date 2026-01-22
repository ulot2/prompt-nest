"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  IoIosLogIn,
  IoIosAdd,
  IoIosMenu,
  IoIosClose,
  IoIosLogOut,
} from "react-icons/io";
import { PiFeatherFill } from "react-icons/pi";
import { SubmitPrompt } from "@/components/prompts/SubmitPrompt";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useState } from "react";
import { Session } from "next-auth";
import Image from "next/image";
import { logout } from "@/lib/actions/auth";
import toast from "react-hot-toast";

interface NavbarProps {
  session: Session | null;
}

export const Navbar = ({ session }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100/80 dark:border-gray-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-300">
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center py-3 px-4 md:px-0">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-gray-100 flex items-center justify-center shadow-lg shadow-gray-900/20 group-hover:shadow-gray-900/30 transition-all duration-300 group-hover:scale-105 border border-gray-800 dark:border-gray-200">
                <PiFeatherFill className="text-white dark:text-gray-900 text-xl -rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                PromptNest
              </h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                Community AI prompts
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {!session?.user && (
              <Link href="/auth/login">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 font-medium text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                >
                  <IoIosLogIn className="text-lg" />
                  <span>Login</span>
                </motion.button>
              </Link>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer overflow-hidden bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              onClick={() => {
                if (session?.user) {
                  openModal();
                } else {
                  toast.error("Please login first to submit a prompt");
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <IoIosAdd className="relative text-white dark:text-gray-900 text-lg" />
              <span className="relative text-white dark:text-gray-900">
                Submit prompt
              </span>
            </motion.button>

            {session?.user && (
              <div className="flex items-center gap-2 ml-1">
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

                <Link href="/user-info">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="relative">
                      <Image
                        className="rounded-full ring-2 ring-white"
                        src={session.user.image ?? "/images/user-alt-img.jpg"}
                        width={26}
                        height={26}
                        alt="avatar"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
                    </div>
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
                      Profile
                    </span>
                  </motion.div>
                </Link>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium text-sm border border-transparent hover:border-rose-200 dark:hover:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-200 cursor-pointer"
                  onClick={() => logout()}
                >
                  <IoIosLogOut className="text-lg" />
                  <span>Sign out</span>
                </motion.button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {session?.user && (
              <Link href="/user-info">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Image
                    className="rounded-full ring-2 ring-gray-100 shadow-sm"
                    src={session.user.image ?? "/images/user-alt-img.jpg"}
                    width={36}
                    height={36}
                    alt="avatar"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
                </motion.div>
              </Link>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <IoIosClose className="text-2xl" />
              ) : (
                <IoIosMenu className="text-2xl" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute left-0 right-0 md:hidden z-50 mx-4 mt-2"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="flex flex-col p-4 gap-2">
                  {session?.user ? (
                    <>
                      <Link
                        href="/user-info"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-100 dark:border-violet-800/30">
                          <div className="relative">
                            <Image
                              className="rounded-full ring-2 ring-white shadow-sm"
                              src={
                                session.user.image ?? "/images/user-alt-img.jpg"
                              }
                              width={40}
                              height={40}
                              alt="avatar"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {session.user.name ?? "Profile"}
                            </span>
                            <span className="text-xs text-gray-500">
                              View your profile
                            </span>
                          </div>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-200"
                      >
                        <IoIosLogOut className="text-xl" />
                        <span className="font-medium">Sign out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                        <IoIosLogIn className="text-xl" />
                        <span className="font-medium">Login</span>
                      </div>
                    </Link>
                  )}

                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      if (session?.user) {
                        openModal();
                        setIsMobileMenuOpen(false);
                      } else {
                        toast.error("Please login first to submit a prompt");
                      }
                    }}
                    className="relative flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold shadow-lg shadow-gray-900/20 dark:shadow-none hover:shadow-gray-900/30 transition-all duration-300"
                  >
                    <IoIosAdd className="text-xl" />
                    <span>Submit prompt</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SubmitPrompt isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
