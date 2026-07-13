import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: "on",
  },
  tsconfig: "./tsconfig.json",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "desktop-chrome",
      testDir: "./tests/ui/desktop",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://github.com/",
        viewport: {
          width: 1728,
          height: 1117,
        },
      },
    },

    {
      name: "api",
      testDir: "./tests/api",
    },
  ],
});
