import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly primaryHeader: Locator;
  readonly title: Locator;
  readonly menuBtn: Locator;
  readonly shoppingCartBtn: Locator;
  readonly inventoryList: Locator;

  constructor(private page: Page) {
    this.primaryHeader = page.locator('[data-test="primary-header"]');
    this.title = page.getByText("Swag Labs");
    this.menuBtn = page.getByRole("button", { name: "Open Menu" });
    this.shoppingCartBtn = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
  }

  async expectPageVisible() {
    await expect(this.primaryHeader).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.menuBtn).toBeVisible();
    await expect(this.shoppingCartBtn).toBeVisible();
    await expect(this.inventoryList).toBeVisible();
  }
}
