"use client";

import { useState, useEffect, useCallback, startTransition } from "react";

export function useTheme() {
  // Must match the server-rendered <html className="dark"> to avoid hydration mismatch.
  // Real preference is read from localStorage after mount in useEffect.
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const resolved = stored ?? current;

    // Sync DOM class (external system) — no setState here
    if (resolved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Deferred state update — avoids synchronous cascading renders
    startTransition(() => setThemeState(resolved));
  }, []);


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
