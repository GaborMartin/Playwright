import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly menuBtn: Locator;
  readonly logoLink: Locator;
  readonly dashboardLink: Locator;
  readonly header: Locator;
  readonly userNavigationBtn: Locator;
  readonly repositoriesLink: Locator;

  constructor(private page: Page) {
    this.menuBtn = page.getByRole("button", { name: "Open menu" });
    this.logoLink = page.getByRole("link", { name: "Homepage (g then d)" });
    this.dashboardLink = page.getByRole("link", { name: "Dashboard" });
    this.header = page.getByRole("heading", { name: "Home" });
    this.userNavigationBtn = page.getByRole("button", {
      name: "Open user navigation menu",
    });
    this.repositoriesLink = page.getByRole("link", {
      name: "Repositories",
      exact: true,
    });
  }

  async expectPageVisible() {
    await expect(this.menuBtn).toBeVisible();
    await expect(this.logoLink).toBeVisible();
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.header).toBeVisible();
  }

  async navigateToRepositories() {
    await this.userNavigationBtn.click();
    await this.repositoriesLink.click();
  }
}
