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

test("public controls provide phone-sized touch targets", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 640, "Phone-only touch target contract");
  await page.goto("/wiki");
  const undersized = await page.locator("button, input, select, textarea").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.height < 44;
      })
      .map((element) => ({
        label: element.getAttribute("aria-label") ?? element.textContent?.trim() ?? element.tagName,
        height: Math.round(element.getBoundingClientRect().height),
      })),
  );

  expect(undersized).toEqual([]);
});

test("mobile filters scroll without compressing their labels", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 640, "Phone-only filter behavior");
  await page.goto("/wiki");

  for (const selector of [".segmented", ".chip-row"]) {
    const filter = page.locator(selector);
    await expect(filter).toBeVisible();
    await expect(filter).toHaveCSS("overflow-x", "auto");
    const shrinkValues = await filter.locator("button").evaluateAll((buttons) =>
      buttons.map((button) => getComputedStyle(button).flexShrink),
    );
    expect(shrinkValues.every((value) => value === "0")).toBe(true);
  }
});

test("product detail actions become full-width on narrow phones", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 640, "Phone-only action layout");
  await page.goto("/devices/auto-feeder");
  const actionRow = page.locator(".product-detail-actions");
  const primaryAction = actionRow.locator(".pill");

  const widths = await Promise.all([
    actionRow.evaluate((element) => element.getBoundingClientRect().width),
    primaryAction.evaluate((element) => element.getBoundingClientRect().width),
  ]);

  expect(widths[1]).toBeGreaterThanOrEqual(widths[0] - 2);
});
