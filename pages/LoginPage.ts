import { expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LoginPage {
  readonly title: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(private page: Page) {
    this.title = page.getByRole("heading", { name: "Sign in to GitHub" });
    this.username = page.getByRole("textbox", {
      name: "Username or email address",
    });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Sign in", exact: true });
  }

  async open() {
    await this.page.goto("/login");
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
}
