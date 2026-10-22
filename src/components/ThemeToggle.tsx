"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The theme lives on <html data-theme>, set before first paint by the inline script in the layout
function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  return attr === "dark" || attr === "light" ? attr : systemTheme();
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const t = useTranslations("Nav");
  return <ThemeToggleButton labelToLight={t("switchToLight")} labelToDark={t("switchToDark")} />;
}

export function ThemeToggleButton({
  labelToLight,
  labelToDark,
  className = "text-on-brand-muted hover:bg-brand-2 hover:text-white",
}: {
  labelToLight: string;
  labelToDark: string;
  className?: string;
}) {
  // Server snapshot is "light"; the real value is read on the client without a hydration mismatch
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light" as Theme);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? labelToLight : labelToDark}
      className={`flex size-11 items-center justify-center rounded-full transition ${className}`}
    >
      {theme === "dark" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
