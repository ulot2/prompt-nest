"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IoIosMoon, IoIosSunny, IoIosDesktop } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <IoIosSunny className="text-xl" />;
      case "dark":
        return <IoIosMoon className="text-xl" />;
      case "system":
        return <IoIosDesktop className="text-xl" />;
      default:
        return <IoIosDesktop className="text-xl" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-200 border border-transparent hover:border-gray-200 dark:border-gray-700"
        aria-label="Toggle theme"
      >
        {getIcon()}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 ring-1 ring-black/5"
          >
            <div className="p-1 flex flex-col gap-0.5">
              {[
                { name: "Light", value: "light", icon: IoIosSunny },
                { name: "Dark", value: "dark", icon: IoIosMoon },
                { name: "System", value: "system", icon: IoIosDesktop },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setTheme(item.value);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    theme === item.value
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  <item.icon className="text-lg" />
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
