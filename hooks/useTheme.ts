"use client";

import { useState, useCallback } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    return stored ?? current;
  });

  const setTheme = useCallback((newTheme: "dark" | "light") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
