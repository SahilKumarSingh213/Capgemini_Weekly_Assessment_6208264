import { test, expect } from "@playwright/test";
import { HomePage } from "../Page_Object_Model/home";
import { LoginPage } from "../Page_Object_Model/login";
import data from "../utility/data.json";

test("Normal Test 1", async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.goToLogin();

  await loginPage.login(data.user.username, data.user.password);

  await expect(page.getByText("Logout")).toBeVisible();
});