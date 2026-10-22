"use client";

import { useEffect } from "react";

// Registers the offline service worker. Skipped in development so cached files never hide code changes.
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      // Registration failure only disables offline support
    });
  }, []);

  return null;
}
