import { test } from "@fixtures";

test.describe("Login page", () => {
  const invalidCredentials = [
    { username: "", password: "", label: "empty credentials" },
    { username: "", password: "secret_sauce", label: "empty username" },
    { username: "standard_user", password: "", label: "empty password" },
  ];

  test("Landing page has title", async ({ loginPage }) => {
    await loginPage.expectTitleVisible();
  });

  test("Login form is correct by data-test", async ({ loginPage }) => {
    await loginPage.expectFormVisible();
  });

  for (const { username, password, label } of invalidCredentials) {
    test(`Error message for ${label}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await loginPage.expectErrorVisible();
    });
  }
});
