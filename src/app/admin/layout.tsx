import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { getNonce } from "@/lib/nonce";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-space-grotesk" });

export const metadata: Metadata = { title: "Pusula Admin", robots: { index: false, follow: false } };

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const nonce = await getNonce();
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-page font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
