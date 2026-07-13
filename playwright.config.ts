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
      name: "desktop-firefox",
      testDir: "./tests/ui/desktop",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "https://github.com/",
        viewport: {
          width: 1728,
          height: 1117,
        },
      },
    },

    {
      name: "desktop-safari",
      testDir: "./tests/ui/desktop",
      use: {
        ...devices["Desktop Safari"],
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
      use: {
        baseURL: "https://api.github.com",
        extraHTTPHeaders: {
          // We set this header per GitHub guidelines.
          Accept: "application/vnd.github.v3+json",
          // Add authorization token to all requests.
          // Assuming personal access token available in the environment.
          Authorization: `token ${process.env.API_TOKEN}`,
          "X-GitHub-Api-Version": "2026-03-10",
        },
      },
    },
  ],
});
