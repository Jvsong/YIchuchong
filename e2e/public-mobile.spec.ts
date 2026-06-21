import { expect, test } from "@playwright/test";

test("mobile navigation locks scrolling and closes with Escape", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /导航|navigation|menu/i });

  await menuButton.click();

  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("body")).toHaveClass(/nav-open/);
  await expect(page.getByRole("navigation", { name: /主导航|main/i })).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("body")).not.toHaveClass(/nav-open/);
});

const routes = [
  "/",
  "/devices",
  "/devices/auto-feeder",
  "/locator",
  "/wiki",
  "/wiki/golden-retriever",
  "/news",
  "/news/n01",
  "/boarding",
  "/walking",
  "/partners",
  "/ai-care",
  "/advice",
  "/fun",
  "/about",
];

for (const route of routes) {
  test(`${route} has no unexpected horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));

    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
}
