"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrolled, setScrolled] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setDirection(y > lastY ? "down" : "up");
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return { scrolled, direction };
}
