import { test, expect } from "fixtures/index";

test.describe("GitHub UI tests", () => {
  test("Should have correct title", async ({ loginPage }) => {
    await loginPage.expectTitleVisible();
  });

  test("Homepage should be correctly visible after login", async ({
    homePage,
  }) => {
    await homePage.expectPageVisible();
  });

  test("Created repository is visible", async ({
    homePage,
    repositoryName,
    page,
  }) => {
    await homePage.navigateToRepositories();
    expect(page.getByRole("link", { name: repositoryName })).toBeVisible();
  });
});
