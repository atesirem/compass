"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// Chrome/Edge/Android fire this event when the site can be installed; Safari does not
type InstallPromptEvent = Event & { prompt: () => Promise<void> };

export function InstallButton() {
  const t = useTranslations("Nav");
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as InstallPromptEvent);
    };
    const onInstalled = () => setPromptEvent(null);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!promptEvent) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        await promptEvent.prompt();
        setPromptEvent(null);
      }}
      className="inline-flex min-h-11 items-center rounded-full border border-brand-line px-5 text-sm font-semibold text-on-brand transition hover:bg-brand-2"
    >
      {t("install")}
    </button>
  );
}
