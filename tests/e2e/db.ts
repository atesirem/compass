import { PrismaClient } from "@prisma/client";

try {
  process.loadEnvFile(".env");
} catch {
  // DATABASE_URL may already be set in the environment
}

export const db = new PrismaClient();
