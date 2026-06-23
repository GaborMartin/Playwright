import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly title: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;

  constructor(private page: Page) {
    this.title = page.getByText("Swag Labs");
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  async open() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async expectFormVisible() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
  }

  async expectTitleVisible() {
    await expect(this.title).toBeVisible();
  }

  async expectErrorVisible() {
    await expect(this.errorMsg).toBeVisible();
  }
}
