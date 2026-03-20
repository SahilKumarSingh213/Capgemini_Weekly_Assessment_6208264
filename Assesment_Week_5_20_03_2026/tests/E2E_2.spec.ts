import { test, expect } from "@playwright/test";
import { HomePage } from "../Page_Object_Model/home";
import { LoginPage } from "../Page_Object_Model/login";
import { BookPage } from "../Page_Object_Model/findBook";
import { SignUpPage } from "../Page_Object_Model/signUp";
import data from "../utility/data.json";

test("E2E 2", async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signUpPage = new SignUpPage(page);
  const bookPage = new BookPage(page);
  await homePage.open();
  await homePage.goToSignUp();

  // -->  CHANGE USER IN JSON FILE EVERYTIME
  
  await signUpPage.signUp(data.new_user.username, data.new_user.password);

  await homePage.open();
  await homePage.goToLogin();
  await loginPage.login(data.new_user.username, data.new_user.password);

  await homePage.open();

  await bookPage.selectGenre(data.genre.name);
  await bookPage.selectBook(data.book.name);
  await bookPage.selectQuantity(data.order.quantity);

  await page.getByText("Add to Cart").click();

  await page.getByText("Logout").click();

  await homePage.goToLogin();
  await loginPage.login(data.new_user.username, data.new_user.password);
  await homePage.open();

  await page.getByText("Cart").click();

  await expect(page.getByText("The Indian Economy")).toBeVisible();

});
