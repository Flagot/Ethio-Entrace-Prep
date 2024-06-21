import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/home", label: "Home", short: "H" },
  { to: "/home", label: "Practice", short: "P" },
  { to: "/home", label: "Progress", short: "R" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    [
      "flex items-center rounded-md px-2 py-1.5 text-sm transition-all",
      isActive
        ? "border-(--color-border) bg-(--color-input-bg) text-(--color-text)"
        : "border-0 bg-transparent text-(--color-text)",
      isOpen ? "justify-start gap-3" : "justify-center",
    ].join(" ");

  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 border-r border-(--color-border) bg-(--color-surface) transition-all duration-200 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-full flex-col p-3">
        <div className="mb-4 flex items-center justify-between">
          <div className={`${isOpen ? "block" : "hidden"}`}>
            <p className="text-sm font-semibold tracking-tight">Exam Prep</p>
            <p className="text-xs text-(--color-muted)">Student Platform</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-md border border-(--color-border) bg-(--color-input-bg) px-2 py-1 text-xs text-(--color-text) hover:bg-(--color-bg)"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? "<<" : ">>"}
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navItemClass}>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-(--color-border) text-xs">
                {item.short}
              </span>
              <span className={isOpen ? "block" : "hidden"}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div
          className="relative mt-auto border-t border-(--color-border) pt-3"
          onMouseEnter={() => setIsProfileMenuOpen(true)}
          onMouseLeave={() => setIsProfileMenuOpen(false)}
        >
          {isProfileMenuOpen && (
            <div className="absolute bottom-0 left-full z-30 ml-2 w-56 rounded-md border border-(--color-border) bg-(--color-surface) p-2 shadow-sm">
              <div className="space-y-2">
                <ThemeToggle className="w-full rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm text-(--color-text) transition hover:bg-(--color-bg)" />
                <LogoutButton className="w-full rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-primary) hover:text-(--color-on-primary) disabled:cursor-not-allowed disabled:opacity-70" />
              </div>
            </div>
          )}

          <button
            type="button"
            className="mb-3 w-full rounded-md border border-(--color-border) bg-(--color-input-bg) p-3 text-left"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            aria-expanded={isProfileMenuOpen}
            aria-label="Open profile menu"
          >
            <p className={`text-sm font-medium ${isOpen ? "block" : "hidden"}`}>Student</p>
            <p className={`text-xs text-(--color-muted) ${isOpen ? "block" : "hidden"}`}>exam learner</p>
            <p className={`text-center text-xs text-(--color-muted) ${isOpen ? "hidden" : "block"}`}>U</p>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
