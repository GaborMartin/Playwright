import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductsPage } from "@pages/ProductsPage";
import { users } from "testdata/users";

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
    const { username, password } = users.standard;
    await loginPage.login(username, password);
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});
