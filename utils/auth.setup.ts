import { test as setup } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";

const authFile = ".auth/github.json";

setup("Authenticate and store session", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  await page.waitForURL("https://github.com/");
  await page.context().storageState({ path: authFile });
});
