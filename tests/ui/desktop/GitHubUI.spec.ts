import { test, expect } from "fixtures/index";

test.describe("GitHub UI tests", () => {
  test("Homepage should be correctly visible", async ({ homePage }) => {
    await homePage.expectPageVisible();
  });

  test("Created repository is visible", async ({
    page,
    repositoriesPage,
    repositoryName,
  }) => {
    await expect(async () => {
      await page.reload();
      await expect(
        repositoriesPage.getRepositoryLink(repositoryName),
      ).toBeVisible();
    }).toPass({ timeout: 15000 });
  });
});
