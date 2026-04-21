"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useTheme } from "@/hooks/useTheme";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  const isAdminPage = pathname?.startsWith('/admin');

  // Always call hooks unconditionally before any early returns
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  if (isAdminPage) return null;


  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={cn(
            "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl transition-all duration-300",
            "bg-background/40 backdrop-blur-xl border border-border shadow-primary/5",
            "hover:border-primary/30 hover:shadow-primary/10 hover:bg-background/60",
            "text-muted-foreground hover:text-primary"
          )}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <HiSun size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                <HiMoon size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
