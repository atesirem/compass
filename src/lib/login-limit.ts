import "server-only";
import { headers } from "next/headers";
import { db } from "@/lib/db";

const WINDOW_MINUTES = 15;
// Same account from the same address: stops guessing against one account without letting a stranger
// lock the real admin out from a different address
const MAX_FAILED_PER_EMAIL_AND_IP = 5;
// Same account from anywhere: slows down distributed guessing (and makes a lockout attack expensive)
const MAX_FAILED_PER_EMAIL = 30;
// One address trying many accounts (credential stuffing)
const MAX_FAILED_PER_IP = 20;

export const MAX_EMAIL_LENGTH = 254;

// The first x-forwarded-for entry is only trustworthy when the hosting platform overwrites the header
// (Vercel does). Behind a proxy that appends to it, put the proxy's own IP handling or edge rate limiting in front.
export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown").slice(0, 64);
}

function windowStart(): Date {
  return new Date(Date.now() - WINDOW_MINUTES * 60_000);
}

// True when too many recent failed attempts exist
export async function isLoginBlocked(email: string, ip: string): Promise<boolean> {
  const since = windowStart();
  const [byEmailAndIp, byEmail, byIp] = await Promise.all([
    db.loginAttempt.count({ where: { email, ip, success: false, createdAt: { gte: since } } }),
    db.loginAttempt.count({ where: { email, success: false, createdAt: { gte: since } } }),
    db.loginAttempt.count({ where: { ip, success: false, createdAt: { gte: since } } }),
  ]);
  return byEmailAndIp >= MAX_FAILED_PER_EMAIL_AND_IP || byEmail >= MAX_FAILED_PER_EMAIL || byIp >= MAX_FAILED_PER_IP;
}

export async function recordLoginAttempt(email: string, ip: string, success: boolean): Promise<void> {
  await db.loginAttempt.create({ data: { email, ip, success } });
  if (success) {
    // A good login resets the counters for that account and address
    await db.loginAttempt.deleteMany({ where: { email, ip, success: false } });
  }
  // Prune old rows now and then instead of on every attempt (keeps the table small without extra writes)
  if (Math.random() < 0.05) {
    await db.loginAttempt.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 24 * 3_600_000) } } });
  }
}

export const LOGIN_WINDOW_MINUTES = WINDOW_MINUTES;
