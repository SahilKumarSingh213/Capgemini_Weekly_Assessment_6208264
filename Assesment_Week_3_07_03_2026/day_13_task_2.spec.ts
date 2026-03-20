import {test} from "@playwright/test"

test("tokyo_olympics", async({page}) => {
    const url = "https://www.olympics.com/en/olympic-games/tokyo-2020";
    await page.goto(url);

    const athletesLink = page.locator('//span/a[@href="/en/olympic-games/tokyo-2020/athletes"]');
    await athletesLink.click();

    await page.evaluate(() => window.scrollBy(0, 2300));

    const medalLocator = page.locator('//div[@data-medal-id="silver-medals-9"]/span');
    const silvermedal = await medalLocator.textContent();
    console.log("silvermedal", silvermedal);

    await page.screenshot({path: 'screenshot/q9.png'});
    
});