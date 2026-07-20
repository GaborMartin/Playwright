import { test, expect } from "fixtures/index";

//Test comment
test.describe("GitHub UI tests", () => {
  test("Homepage should be correctly visible", async ({ homePage }) => {
    await homePage.expectPageVisible();
  });

  test("Created repository is visible", async ({
    repositoriesPage,
    repositoryName,
  }) => {
    await repositoriesPage.validateRepositoryVisible(repositoryName);
  });
});
