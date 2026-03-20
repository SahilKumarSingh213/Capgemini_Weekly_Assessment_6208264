import {test} from "@playwright/test"

test("q3",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
    await page.locator('//input[@id="name"]').fill("hello");
    await page.locator('//input[@id="email"]').fill("sahil@gmail.com");
    await page.locator('//input[@id="password"]').fill("hello27");
    await page.keyboard.press("Enter");
    await page.locator('//input[@id="email"]').fill("sahil@gmail.com");
    await page.locator('//input[@id="password"]').fill("hello27");
    await page.keyboard.press("Enter");
    await page.screenshot({path:"screenshot/q3.png"});
});