import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3000",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile-375", use: { ...devices["iPhone 13 Mini"], browserName: "chromium", channel: "chrome" } },
    { name: "mobile-390", use: { ...devices["iPhone 13"], browserName: "chromium", channel: "chrome" } },
    { name: "tablet-768", use: { browserName: "chromium", channel: "chrome", viewport: { width: 768, height: 1024 } } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
