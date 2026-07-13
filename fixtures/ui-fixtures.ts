import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { HomePage } from "@pages/HomePage";

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  homePage: async ({ page, loginPage }, use) => {
    const username = process.env.USER!;
    const password = process.env.PASS!;
    await loginPage.login(username, password);
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
