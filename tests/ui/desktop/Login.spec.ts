import { test } from "@fixtures";
import { invalidCredentials, users } from "testdata/users";

test.describe("Login page", () => {
  test("Home page has title", async ({ loginPage }) => {
    await loginPage.expectTitleVisible();
  });

  test("Login form is correctly shown", async ({ loginPage }) => {
    await loginPage.expectFormVisible();
  });

  test("Successful login navigates to Products page", async ({
    productsPage,
  }) => {
    await productsPage.expectPageVisible();
  });

  for (const { username, password, label, errorMsg } of invalidCredentials) {
    test(`Error message for ${label}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await loginPage.expectErrorMessage(errorMsg);
    });
  }

  test("Locked out user gets error message", async ({ loginPage }) => {
    const { username, password, errorMsg } = users.lockedOut;
    await loginPage.login(username, password);
    await loginPage.expectErrorMessage(errorMsg);
  });
});
