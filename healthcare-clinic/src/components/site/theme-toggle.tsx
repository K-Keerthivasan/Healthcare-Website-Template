"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/components/site/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border transition",
        "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-teal-50",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-600 dark:hover:bg-slate-700",
        className,
      )}
    >
      {theme === "dark" ? <Sun size={18} weight="duotone" /> : <Moon size={18} weight="duotone" />}
    </button>
  );
}
