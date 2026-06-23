import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductsPage } from "@pages/ProductsPage";

type MyFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  productsPage: async ({ page, loginPage }, use) => {
    await loginPage.login("standard_user", "secret_sauce");
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});
