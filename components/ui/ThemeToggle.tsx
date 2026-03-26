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

  if (isAdminPage) return null;

  // Appearance logic: Show after scrolling a bit, or just keep it simple
  // The user says "display from Hero to Contact". 
  // I'll show it after 200px of scroll to keep the initial Hero clean, 
  // and hide it when reaching the very bottom if needed (footer).
  // But for now, let's keep it visible once the user starts moving.
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

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
