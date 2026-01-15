"use client";

import { useState, useRef, useEffect } from "react";
import { FaTwitter, FaLinkedin, FaLink, FaCheck } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
  size?: "sm" | "md";
  className?: string;
  align?: "left" | "right";
}

export const ShareButtons = ({
  title,
  text,
  url,
  size = "md",
  className = "",
  align = "right",
}: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    typeof window !== "undefined" ? url || window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title}\n\n${text}`);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    e.stopPropagation();

    let href = "";
    if (platform === "twitter") {
      href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    } else if (platform === "linkedin") {
      href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }

    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
      setIsOpen(false);
    }
  };

  const buttonSizeClass = size === "sm" ? "p-1.5" : "p-2";
  const iconSizeClass = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${buttonSizeClass} rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center`}
        title="Share"
      >
        <FiShare2 className={iconSizeClass} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute bottom-full ${
              align === "left" ? "left-0" : "right-0"
            } mb-2 min-w-[150px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50 p-1`}
          >
            <div className="flex flex-col gap-0.5">
              <button
                onClick={(e) => handleShare(e, "twitter")}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
              >
                <FaTwitter className="text-black dark:text-white" />
                <span>Twitter</span>
              </button>

              <button
                onClick={(e) => handleShare(e, "linkedin")}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
              >
                <FaLinkedin className="text-[#0077b5]" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <FaCheck className="text-emerald-500" />
                ) : (
                  <FaLink className="text-gray-500" />
                )}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
