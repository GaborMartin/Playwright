import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { HomePage } from "@pages/HomePage";

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page, loginPage }, use) => {
    await page.goto("/");
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
