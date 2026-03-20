import { test } from "@playwright/test";

test("xml selector", async ({ page }) => {

    await page.goto("https://www.amazon.in/");

    await page.locator('#twotabsearchtextbox').fill("Shoes");
    await page.locator('#nav-search-submit-button').click();
    await page.locator('//label/i').first().click()
    console.log(await page.locator('(//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal"]/span)[4]').textContent());
    console.log(await page.locator('(//span[@class="a-offscreen"])[10]').textContent());
    await page.screenshot({path:"screenshot/q5.png"});
});