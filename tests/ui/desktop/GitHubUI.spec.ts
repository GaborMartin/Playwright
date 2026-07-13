import { test } from "fixtures/ui-fixtures";

test.describe("GitHub UI tests", () => {
  test("Should have correct title", async ({ loginPage }) => {
    await loginPage.expectTitleVisible();
  });

  test("Homepage should be correctly visible after login", async ({
    homePage,
  }) => {
    await homePage.expectPageVisible();
  });
});
