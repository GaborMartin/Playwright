import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

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
    trace: "on-first-retry",
    baseURL: "https://www.saucedemo.com",
  },
  tsconfig: "./tsconfig.json",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "desktop-chrome",
      testDir: "./tests/desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {
          width: 1728,
          height: 1117,
        },
      },
    },

    {
      name: "desktop-firefox",
      testDir: "./tests/desktop",
      use: {
        ...devices["Desktop Firefox"],
        viewport: {
          width: 1728,
          height: 1117,
        },
      },
    },

    {
      name: "desktop-safari",
      testDir: "./tests/desktop",
      use: {
        ...devices["Desktop Safari"],
        viewport: {
          width: 1728,
          height: 1117,
        },
      },
    },
    {
      name: "mobile-chrome",
      testDir: "./tests/mobile",
      use: {
        ...devices["Pixel 7"],
      },
    },

    {
      name: "mobile-safari",
      testDir: "./tests/mobile",
      use: {
        ...devices["iPhone 16e"],
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
