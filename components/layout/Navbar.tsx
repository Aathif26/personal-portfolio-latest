"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import config from "@/content/config.json";
const { navLinks } = config;
import { useActiveSection } from "@/hooks/useActiveSection";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = useActiveSection();
  const ref = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center py-4 px-4 pointer-events-none"
    >
      <motion.nav
        initial={{
          width: "100%",
          maxWidth: "1200px",
          paddingLeft: "32px",
          paddingRight: "32px",
          y: 0,
          borderRadius: "9999px",
        }}
        animate={{
          width: isMobile ? "100%" : (scrolled ? "fit-content" : "100%"),
          maxWidth: isMobile ? "100%" : (scrolled ? "850px" : "1200px"),
          paddingLeft: isMobile ? "16px" : (scrolled ? "24px" : "32px"),
          paddingRight: isMobile ? "16px" : (scrolled ? "24px" : "32px"),
          y: isMobile ? 0 : (scrolled ? 10 : 0),
          borderRadius: isMobile ? "0px" : "9999px"
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between h-14 transition-all duration-700",
          (scrolled || isMobile)
            ? "bg-background/80 backdrop-blur-xl border border-border md:shadow-2xl"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <button
          onClick={() => handleClick("#hero")}
          className="font-display text-lg font-bold tracking-tight text-foreground hover:text-primary transition-all duration-300 mr-8 flex items-center"
        >
          <AnimatePresence mode="wait">
            {scrolled && !isMobile ? (
              <motion.span
                key="logo-ac"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-primary font-bold hover:cursor-pointer"
              >
                AA
              </motion.span>
            ) : (
              <motion.span
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                Aathif<span className="text-primary">.</span>B
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            const isActive = `#${active}` === link.href;
            const isHovered = hovered === link.href;

            return (
              <button
                key={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onClick={() => handleClick(link.href)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 hover:cursor-pointer",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-secondary/50 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>


        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-16 right-0 w-64 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 md:hidden flex flex-col gap-1"
            >
              {navLinks.map((link) => {
                const isActive = `#${active}` === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleClick(link.href)}
                    className={cn(
                      "w-full px-4 py-3 text-sm font-medium rounded-xl text-left transition-all",
                      isActive
                        ? "text-primary bg-primary/5 border border-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
