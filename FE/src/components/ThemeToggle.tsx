import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "exam-prep-theme";
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeSync() {
  useEffect(() => {
    const initial = getInitialTheme();
    document.documentElement.setAttribute("data-theme", initial);
    localStorage.setItem(THEME_STORAGE_KEY, initial);
  }, []);

  return null;
}

type ThemeToggleProps = {
  className?: string;
};

function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      className={
        className ||
        "rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm text-(--color-text) transition hover:bg-(--color-bg)"
      }
      type="button"
      onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}

export default ThemeToggle;
