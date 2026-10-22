import "server-only";
import { headers } from "next/headers";

// Nonce generated per request in src/proxy.ts; needed for our own inline <script> tags
export async function getNonce(): Promise<string | undefined> {
  return (await headers()).get("x-nonce") ?? undefined;
}
