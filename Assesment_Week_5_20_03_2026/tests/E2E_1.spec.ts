import { test, expect } from "@playwright/test";
import { HomePage } from "../Page_Object_Model/home.ts";
import { LoginPage } from "../Page_Object_Model/login.ts";
import { BookPage } from "../Page_Object_Model/findBook.ts";
import { CheckoutPage } from "../Page_Object_Model/checkOut.ts";
import data from "../utility/data.json";

test("E2E 1", async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const bookPage = new BookPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.open();

  await homePage.goToLogin();
  await loginPage.login(data.user.username, data.user.password);

  await expect(page.getByText("Logout")).toBeVisible();

  await homePage.open();

  await bookPage.selectGenre(data.genre.name);
  await bookPage.selectBook(data.book.name);

  await bookPage.selectQuantity(data.order.quantity);

  await page.getByText("Add to Cart").click();

  await checkoutPage.placeOrder();

  await page.getByText("LogOut").click()

});