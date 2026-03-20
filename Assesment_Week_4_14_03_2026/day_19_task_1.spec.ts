import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

let data = fs.readFileSync(path.join(__dirname, "product.json"), "utf-8");
let datafile = JSON.parse(data);

test("amazon_json", async ({ page }) => {

    await page.goto("https://www.amazon.in");

    for (let element of datafile.products) {

        await page.locator("#twotabsearchtextbox").fill(element);
        await page.locator("#nav-search-submit-button").click();

        await page.waitForSelector('[data-component-type="s-search-result"]');

        let title = await page
            .locator('h2.a-size-medium')
            .first()
            .textContent();

        console.log(`Title of first ${element}: ${title}`);

        const [newPage] = await Promise.all([
            page.waitForEvent("popup"),
            page.locator("h2.a-size-medium").first().click()
        ]);

        await newPage.waitForSelector("#productTitle");

        const productTitle = await newPage.locator("#productTitle").textContent();
        console.log("Product Title:", productTitle);
        expect(productTitle).toBeTruthy();

        const price = await newPage.locator("span.a-price span.a-offscreen").first().textContent();
        console.log("Price:", price);
        expect(price).toBeTruthy();

        const rating = await newPage.locator("#acrPopover").textContent();
        console.log("Rating:", rating);
        expect(rating).toBeTruthy();

        await newPage.close();
    }

    await page.screenshot({ path: "screenshot/q23.png" });

});