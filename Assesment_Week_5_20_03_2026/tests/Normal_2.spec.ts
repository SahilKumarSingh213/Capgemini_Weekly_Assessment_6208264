import { test, expect } from "@playwright/test";
import { HomePage } from "../Page_Object_Model/home";
import { LoginPage } from "../Page_Object_Model/login";
import { BookPage } from "../Page_Object_Model/findBook";
import data from "../utility/data.json";

test("Normal Test 2", async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const bookPage = new BookPage(page);

  await homePage.open();
  await homePage.goToLogin();

  await loginPage.login(data.user.username, data.user.password);

  await homePage.open();

  await bookPage.selectGenre(data.genre.name);
  await bookPage.selectBook(data.book.name);
  await bookPage.selectQuantity(data.order.quantity);

  await page.getByText("Add to Cart").click();

  await page.getByText("Cart").click();

  await expect(page.getByText("The Indian Economy")).toBeVisible();
});