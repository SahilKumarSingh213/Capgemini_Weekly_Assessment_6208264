import {test} from "@playwright/test"

test("q2",async({page})=>{
    await page.goto("https://www.flipkart.com/");
    await page.locator('//div/input').first().fill("Phones");
    await page.keyboard.press("Enter");
    await page.locator('//label').first().click();
    console.log(await page.locator('//div[@class="QiMO5r"]/div').nth(3).textContent());
    await page.screenshot({path:"screenshot/q2.png"});
});