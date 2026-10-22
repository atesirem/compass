import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;

// Prerequisites: Postgres running (npm run db:up), migrations applied, base data seeded:
//   npm run db:seed && npm run db:seed-glossary
// The suite builds and starts the production server itself. Test users are created and removed automatically.
export default defineConfig({
  testDir: "./tests/e2e",
  // One worker: the tests share one database and the login rate limiter
  workers: 1,
  fullyParallel: false,
  retries: 0,
  timeout: 60_000,
  reporter: [["list"]],
  globalSetup: "./tests/e2e/global-setup.ts",
  globalTeardown: "./tests/e2e/global-teardown.ts",
  // Turkish browser language: the home page then redirects to /tr like it does for the main audience
  use: { baseURL: `http://localhost:${PORT}`, locale: "tr-TR", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}/tr`,
    timeout: 300_000,
    reuseExistingServer: true,
    env: { SITE_URL: `http://localhost:${PORT}` },
  },
});
