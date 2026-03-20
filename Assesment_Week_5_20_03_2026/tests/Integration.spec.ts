import { test, expect } from "@playwright/test";
import { HomePage } from "../Page_Object_Model/home";
import { LoginPage } from "../Page_Object_Model/login";
import { BookPage } from "../Page_Object_Model/findBook";
import data from "../utility/data.json";

test("Integration Test", async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const bookPage = new BookPage(page);

  await homePage.open();
  await homePage.goToLogin();

  await loginPage.login(data.user.username, data.user.password);

  await homePage.open();

  await bookPage.selectGenre(data.genre.name);

  await expect(page.getByText(data.book.name)).toBeVisible();
});