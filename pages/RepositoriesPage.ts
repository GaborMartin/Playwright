import { Locator, Page, expect } from "@playwright/test";

export class RepositoriesPage {
  readonly findRepositorySearchBox: Locator;
  readonly typeBtn: Locator;
  readonly sortBtn: Locator;
  readonly newBtn: Locator;

  constructor(private page: Page) {
    this.findRepositorySearchBox = page.getByRole("searchbox", {
      name: "Find a repository…",
    });
    this.typeBtn = page.getByRole("button", { name: "Type" });
    this.sortBtn = page.getByRole("button", { name: "Sort" });
    this.newBtn = page.getByRole("link", { name: "New" });
  }

  async expectPageVisible() {
    await expect(this.findRepositorySearchBox).toBeVisible();
    await expect(this.typeBtn).toBeVisible();
    await expect(this.sortBtn).toBeVisible();
    await expect(this.newBtn).toBeVisible();
  }

  getRepositoryLink(repositoryName: string): Locator {
    return this.page.getByRole("link", { name: repositoryName });
  }
}
