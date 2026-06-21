# Public Mobile Responsive Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every public Epet page usable and polished on phones and tablets, then safely publish the verified build to the existing Aliyun server without losing production content or secrets.

**Architecture:** Keep the existing Next.js components and global CSS system. Add behavior only where CSS is insufficient (mobile navigation), consolidate mobile overrides into a final public responsive section, and add browser-level regression checks for overflow and navigation behavior. Deploy the exact verified Git commit through the existing Nginx → PM2 → Next.js architecture after backing up persistent production files.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, CSS, Vitest, Playwright, Git, PM2, Nginx, SSH

---

## File map

- Modify `package.json`: add the mobile browser test command and Playwright development dependency.
- Modify `package-lock.json`: lock the Playwright dependency.
- Create `playwright.config.ts`: configure local browser verification against the Next.js development server.
- Create `e2e/public-mobile.spec.ts`: verify public-route overflow and mobile navigation behavior.
- Modify `src/components/Header.tsx`: add route-close, Escape-close, scroll-lock, dialog semantics, and stable mobile menu identity.
- Modify `src/app/globals.css`: add final shared and page-specific responsive rules without changing brand color tokens.
- Create `docs/deployment/2026-06-21-mobile-release.md`: record the released commit, backup path, process name, checks, and rollback point.

## Task 1: Establish responsive browser regression tests

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `e2e/public-mobile.spec.ts`

- [ ] **Step 1: Install the browser test dependency**

Run:

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

Expected: `package.json` and `package-lock.json` include `@playwright/test`, and Chromium installs successfully.

- [ ] **Step 2: Add the browser test script**

Add this entry inside `package.json` → `scripts`:

```json
"test:e2e:mobile": "playwright test e2e/public-mobile.spec.ts"
```

- [ ] **Step 3: Create the Playwright configuration**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile-375", use: { ...devices["iPhone 13 Mini"] } },
    { name: "mobile-390", use: { ...devices["iPhone 13"] } },
    { name: "tablet-768", use: { viewport: { width: 768, height: 1024 } } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
```

- [ ] **Step 4: Write the failing navigation behavior test**

Create `e2e/public-mobile.spec.ts` with the navigation test first:

```ts
import { expect, test } from "@playwright/test";

test("mobile navigation locks scrolling and closes with Escape", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /导航|menu/i });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("body")).toHaveClass(/nav-open/);
  await expect(page.getByRole("navigation", { name: /主导航|main/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("body")).not.toHaveClass(/nav-open/);
});
```

- [ ] **Step 5: Run the focused test and confirm it fails**

Run:

```bash
npx playwright test e2e/public-mobile.spec.ts --project=mobile-390 --grep "mobile navigation"
```

Expected: FAIL because the existing header does not set `aria-expanded`, add `body.nav-open`, or close with Escape.

- [ ] **Step 6: Add the public-route overflow test**

Append to `e2e/public-mobile.spec.ts`:

```ts
const routes = [
  "/",
  "/devices",
  "/locator",
  "/wiki",
  "/news",
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
```

- [ ] **Step 7: Commit the test scaffold**

```bash
git add package.json package-lock.json playwright.config.ts e2e/public-mobile.spec.ts
git commit -m "test: add public mobile browser checks"
```

## Task 2: Implement accessible mobile navigation

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/app/globals.css`
- Test: `e2e/public-mobile.spec.ts`

- [ ] **Step 1: Add route, keyboard, and scroll-lock behavior**

In `src/components/Header.tsx`, import `useEffect` and add effects after locale initialization:

```tsx
import { useEffect, useState } from "react";

useEffect(() => {
  setOpen(false);
}, [pathname]);

useEffect(() => {
  if (!open) return;
  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
  };
  document.body.classList.add("nav-open");
  window.addEventListener("keydown", closeOnEscape);
  return () => {
    document.body.classList.remove("nav-open");
    window.removeEventListener("keydown", closeOnEscape);
  };
}, [open]);
```

- [ ] **Step 2: Connect menu semantics to the existing button and navigation**

Update the menu button and navigation attributes:

```tsx
<button
  className="nav-menu-button"
  type="button"
  aria-label={open ? dict.a11y.closeNav : dict.a11y.openNav}
  aria-expanded={open}
  aria-controls="primary-navigation"
  onClick={() => setOpen((value) => !value)}
>
```

```tsx
<nav
  id="primary-navigation"
  className={`nav-links ${open ? "is-open" : ""}`}
  aria-label={dict.a11y.mainNav}
>
```

- [ ] **Step 3: Add final mobile navigation styles**

Append a named public responsive section to `src/app/globals.css`. At 980px and below, make `.nav-inner` a two-column grid, position `.nav-links.is-open` as a full-width vertical panel, keep `.nav-actions` within the header, and set `body.nav-open { overflow: hidden; }`. At 640px and below, allow the primary action label to compact while preserving a 44px touch target.

- [ ] **Step 4: Run the focused test and confirm it passes**

```bash
npx playwright test e2e/public-mobile.spec.ts --project=mobile-390 --grep "mobile navigation"
```

Expected: PASS.

- [ ] **Step 5: Run unit and lint checks**

```bash
npm test
npm run lint
```

Expected: all Vitest tests pass and ESLint reports no errors.

- [ ] **Step 6: Commit the navigation change**

```bash
git add src/components/Header.tsx src/app/globals.css
git commit -m "feat: improve public mobile navigation"
```

## Task 3: Add shared public mobile foundations

**Files:**
- Modify: `src/app/globals.css`
- Test: `e2e/public-mobile.spec.ts`

- [ ] **Step 1: Add shared overflow and sizing rules**

In the final responsive section, add public rules that:

```css
.site-shell,
.site-shell main,
.site-shell section,
.site-shell .container {
  min-width: 0;
}

.site-shell img {
  max-width: 100%;
}

.site-shell h1,
.site-shell h2,
.site-shell h3,
.site-shell p,
.site-shell a,
.site-shell button,
.site-shell input,
.site-shell textarea,
.site-shell select {
  overflow-wrap: anywhere;
}
```

Restrict the rules to non-admin presentation classes so `/admin` layout is not redesigned.

- [ ] **Step 2: Add phone typography and spacing rules**

At 640px and below:

```css
.site-shell:not(.admin-route) .container {
  width: min(100% - 32px, 1160px);
}

.site-shell:not(.admin-route) .section,
.site-shell:not(.admin-route) .product-showcase-section,
.site-shell:not(.admin-route) .product-stories-section {
  padding-block: clamp(56px, 16vw, 78px);
}

.site-shell:not(.admin-route) :is(input, select, textarea) {
  min-height: 48px;
  font-size: 16px;
}

.site-shell:not(.admin-route) :is(.pill, .ghost-pill, button) {
  min-height: 44px;
}
```

Use existing color variables only; do not introduce or alter theme colors.

- [ ] **Step 3: Make common action rows stack on narrow phones**

At 430px and below, make `.hero-actions`, `.button-row`, `.buy-actions`, and `.product-detail-actions` single-column and stretch their buttons to the available width.

- [ ] **Step 4: Verify public-route overflow**

```bash
npx playwright test e2e/public-mobile.spec.ts --project=mobile-375 --grep "overflow"
```

Expected: all listed public routes pass.

- [ ] **Step 5: Commit the shared foundation**

```bash
git add src/app/globals.css
git commit -m "style: add shared public mobile foundations"
```

## Task 4: Polish home, content, service, form, and footer layouts

**Files:**
- Modify: `src/app/globals.css`
- Test: `e2e/public-mobile.spec.ts`

- [ ] **Step 1: Adapt home and shared hero sections**

At 980px and below, stack `.home-hero-inner`, `.page-hero-inner`, `.product-story`, `.smart-home-panel`, and `.locator-stage`. At 640px and below, use stable `aspect-ratio` values for Hero media and reposition `.page-hero-card`, `.map-panel`, and `.hero-signal` inside the image bounds.

- [ ] **Step 2: Adapt card and editorial grids**

At 640px and below, force `.editorial-grid`, `.collection-grid`, `.grid.cols-3`, `.grid.cols-4`, `.service-pricing`, `.partner-grid`, `.partner-process`, `.roadmap`, `.faq-grid`, and `.metrics` to one column. Ensure card media uses a consistent responsive ratio and card actions remain reachable after variable-length copy.

- [ ] **Step 3: Adapt filters and search controls**

Make `.segmented`, `.chip-row`, and comparable filter groups horizontally scrollable with `scrollbar-width: none`, `overscroll-behavior-inline: contain`, nonshrinking buttons, and visible end padding. Make `.filter-row` and `.search-field` full width on phones.

- [ ] **Step 4: Adapt forms and result panels**

Make `.form-grid`, `.advice-result-grid`, `.newsletter-form`, and lead forms single-column at 640px. Ensure result cards and validation text wrap safely.

- [ ] **Step 5: Adapt footer information architecture**

At 980px, stack `.footer-grid` and `.footer-newsletter`; at 640px, stack `.footer-service-strip`, align content left, and add bottom padding using `env(safe-area-inset-bottom)`.

- [ ] **Step 6: Run affected page checks**

```bash
npx playwright test e2e/public-mobile.spec.ts --project=mobile-390 --grep "/$|wiki|news|boarding|walking|partners|ai-care|advice|fun|about"
```

Expected: all selected routes render without overflow.

- [ ] **Step 7: Commit the public-page polish**

```bash
git add src/app/globals.css
git commit -m "style: polish public content pages for mobile"
```

## Task 5: Polish product catalog, detail, and locator layouts

**Files:**
- Modify: `src/app/globals.css`
- Test: `e2e/public-mobile.spec.ts`

- [ ] **Step 1: Adapt the device catalog**

At 640px and below, keep `.catalog-product-grid` single-column, constrain product media with `aspect-ratio`, make `.catalog-filter-tabs` horizontally scrollable, and stack `.catalog-consultation`. Remove negative margins that can create viewport overflow while preserving the full-width visual effect through container-safe padding.

- [ ] **Step 2: Adapt product detail galleries and actions**

At 640px and below, give `.product-gallery-main` and `.tracker-product-main-image` stable ratios, keep thumbnail rows horizontally scrollable with scroll snap, stack `.product-detail-actions`, and make `.product-detail-trust` wrap.

- [ ] **Step 3: Adapt specifications and capability rows**

Stack `.tracker-spec-row`, `.product-capability-list`, `.tracker-capability-list`, `.tracker-scenes-grid`, `.product-roadmap-grid`, `.tracker-faq-grid`, and `.tracker-lead-inner` on phones. Convert multi-column capability entries to readable numbered blocks without losing DOM content.

- [ ] **Step 4: Adapt locator scene overlays**

Keep `.map-panel` within `.tracker-story-media`, cap its width, reduce internal spacing on 375px screens, and ensure the underlying pet/product image remains visible.

- [ ] **Step 5: Extend route coverage to a real product detail**

Add the verified fixtures `/devices/auto-feeder`, `/news/n01`, and `/wiki/golden-retriever` to the `routes` array in `e2e/public-mobile.spec.ts`.

- [ ] **Step 6: Run all mobile browser projects**

```bash
npm run test:e2e:mobile
```

Expected: all tests pass for 375px, 390px, and 768px projects.

- [ ] **Step 7: Commit the product-page polish**

```bash
git add src/app/globals.css e2e/public-mobile.spec.ts
git commit -m "style: optimize product journeys for mobile"
```

## Task 6: Complete local verification and publish the Git commit

**Files:**
- Inspect: all changed files

- [ ] **Step 1: Check scope and whitespace**

```bash
git status --short
git diff --check
git diff --stat
```

Expected: only planned files are changed and `git diff --check` exits successfully.

- [ ] **Step 2: Run the complete validation suite**

```bash
npm run validate:content
npm test
npm run lint
npm run test:e2e:mobile
npm run build
```

Expected: every command exits with status 0.

- [ ] **Step 3: Inspect desktop and target viewport screenshots**

Use Playwright at 375px, 390px, 430px, 768px, 1024px, and 1440px for `/`, `/devices`, `/locator`, `/wiki`, and `/news`. Confirm typography, image crops, menu layering, controls, and desktop regression. Save temporary screenshots outside Git or under an ignored test-results directory.

- [ ] **Step 4: Commit any final verified adjustments**

```bash
git add src/components/Header.tsx src/app/globals.css package.json package-lock.json playwright.config.ts e2e/public-mobile.spec.ts
git commit -m "feat: complete public mobile responsive experience"
```

Skip this commit if the working tree is already clean because all changes were committed in earlier tasks.

- [ ] **Step 5: Push the exact local main commit**

```bash
git push origin main
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected: local `HEAD` and remote `refs/heads/main` hashes match.

## Task 7: Back up and deploy to the existing Aliyun server

**Files:**
- Create: `docs/deployment/2026-06-21-mobile-release.md`

- [ ] **Step 1: Perform read-only server preflight**

Connect using the existing deployment key and verify the target before any write:

```bash
ssh -i .claude/deploy_key root@8.138.31.44 'cd /www/wwwroot/yiquchong && pwd && git status --short && git rev-parse HEAD && node --version && pm2 ls'
```

Expected: the project path is correct, the running PM2 application is identified, and the current commit is recorded. If the working tree contains unknown server-only code changes, stop deployment and report them instead of overwriting them.

- [ ] **Step 2: Create a timestamped production backup**

On the server, create a backup outside the live directory containing the current Git revision, environment files, storage/content directories, uploads, PM2 process dump, and Nginx site configuration. Use a timestamped directory such as `/www/backup/yiquchong-YYYYMMDD-HHMMSS`. Do not print file contents or secret values.

Verification command:

```bash
ssh -i .claude/deploy_key root@8.138.31.44 'test -d /www/backup && find /www/backup -maxdepth 1 -type d -name "yiquchong-*" | tail -n 1'
```

Expected: one new backup directory is returned.

- [ ] **Step 3: Update to the verified commit**

In `/www/wwwroot/yiquchong`, fetch `origin`, fast-forward to the exact local/remote `main` commit, run `npm ci`, and run `npm run build`. Preserve environment files and persistent content directories throughout.

Expected: production build exits successfully before PM2 is touched.

- [ ] **Step 4: Reload the existing PM2 process**

Assign the exact process name observed in Step 1 to `PM2_PROCESS`, run `pm2 reload "$PM2_PROCESS" --update-env`, and save the process list with `pm2 save`.

Expected: PM2 reports the application as `online` with a new restart timestamp and no rapid restart loop.

- [ ] **Step 5: Verify locally on the server and publicly**

Check:

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/
curl -fsS -o /dev/null -w '%{http_code}\n' http://8.138.31.44/
```

Also request `/devices`, `/locator`, `/wiki`, `/news`, and one static pet image. Expected: successful 2xx/3xx responses, PM2 remains online, and Nginx error logs show no new deployment-related errors.

- [ ] **Step 6: Verify persistent production state**

Compare counts and existence—not file contents—of the environment files, persistent content records, and uploaded images before and after deployment.

Expected: all protected files/directories remain present and record/file counts do not unexpectedly decrease.

- [ ] **Step 7: Record the release**

Create `docs/deployment/2026-06-21-mobile-release.md` containing:

Use `apply_patch` to write the release record after assigning the observed values to `DEPLOY_COMMIT`, `PM2_PROCESS`, `BACKUP_DIR`, and `ROLLBACK_COMMIT`. The finished document must contain those evaluated values, not the variable names, and this exact verification list: content, tests, lint, mobile E2E, build, localhost HTTP, and public HTTP.

- [ ] **Step 8: Commit and push the deployment record**

```bash
git add docs/deployment/2026-06-21-mobile-release.md
git commit -m "docs: record mobile production release"
git push origin main
```

## Task 8: Rollback procedure if production verification fails

**Files:**
- Inspect: the release record and timestamped backup

- [ ] **Step 1: Stop further deployment changes**

Record the failed endpoint, PM2 status, and the first relevant error without printing secrets.

- [ ] **Step 2: Restore the prior application revision**

Return the live checkout to the pre-deployment commit recorded in the release notes or restore the backed-up runnable application directory. Restore persistent files only if verification proves they were altered; never replace newer production data by default.

- [ ] **Step 3: Rebuild and reload the previous release**

Run the prior release's dependency/build procedure, reload the existing PM2 process, and verify localhost plus public HTTP.

- [ ] **Step 4: Report the rollback state**

Report the active commit, preserved data counts, failing deployment stage, and the evidence that the previous release is serving again.
