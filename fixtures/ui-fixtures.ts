import { test as base } from "@playwright/test";
import { HomePage } from "@pages/HomePage";
import { RepositoriesPage } from "@pages/RepositoriesPage";

type MyFixtures = {
  homePage: HomePage;
  repositoriesPage: RepositoriesPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto("/");
    const homePage = new HomePage(page);
    await use(homePage);
  },

  repositoriesPage: async ({ homePage }, use) => {
    const repositoriesPage = await homePage.navigateToRepositories();
    await use(repositoriesPage);
  },
});
