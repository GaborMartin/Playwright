import { test } from "@fixtures";

test.describe("Login page", () => {
  const invalidCredentials = [
    { username: "", password: "", label: "empty credentials" },
    { username: "", password: "secret_sauce", label: "empty username" },
    { username: "standard_user", password: "", label: "empty password" },
  ];

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

  for (const { username, password, label } of invalidCredentials) {
    test(`Error message for ${label}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await loginPage.expectErrorVisible();
    });
  }
});
