import { expect, type Page } from "@playwright/test";

export async function login(page: Page, user: { email: string; password: string }) {
  await page.goto("/admin/login");
  await page.fill("input[name=email]", user.email);
  await page.fill("input[name=password]", user.password);
  await page.click("button:has-text('Log in')");
  await expect(page.getByText("Needs attention")).toBeVisible();
}

// Next.js renders an empty role="alert" route announcer; ignore it
export function alertOf(page: Page) {
  return page.locator('[role="alert"]:not(#__next-route-announcer__)');
}
