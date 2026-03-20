import { test } from "@playwright/test";

test("question_1", async ({ page }) => {
  await page.goto("https://www.amazon.com/");

  await page.locator('//input[@id="twotabsearchtextbox"]').fill("Shoes");

  await page.locator('//input[@id="nav-search-submit-button"]').click();

  const firstPrice = page.locator('(//span[@class="a-price"]//span[@class="a-offscreen"])[1]');
  console.log(await firstPrice.textContent());

  await page.screenshot({ path: "screenshot/q1.png" });
});