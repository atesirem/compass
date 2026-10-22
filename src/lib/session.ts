import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

// The __Host- prefix makes browsers accept the cookie only over HTTPS, for this exact host, with path /
const COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Host-gg_session" : "gg_session";
const MAX_AGE_SECONDS = 60 * 60 * 8;

export type SessionPayload = { userId: string; role: "ADMIN" | "EDITOR" | "USER" };
export type ReadSession = SessionPayload & { issuedAt: number };

function getKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must be set (min 32 chars)");
  if (process.env.NODE_ENV === "production" && secret.includes("change-me")) throw new Error("AUTH_SECRET is still the example value");
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getKey());

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function readSession(): Promise<ReadSession | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    // Pin the algorithm so a token signed any other way is never accepted
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    if (typeof payload.userId !== "string" || typeof payload.iat !== "number") return null;
    return { userId: payload.userId, role: payload.role as SessionPayload["role"], issuedAt: payload.iat };
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}
