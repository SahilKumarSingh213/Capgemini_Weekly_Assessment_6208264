import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "student.json"), "utf-8");
const students = JSON.parse(data);

test("Submit multiple student registrations using JSON", async ({ page }) => {

  await page.goto("https://demoqa.com/automation-practice-form");

  for (const s of students) {
    await page.waitForSelector('#firstName');
    await page.fill('#firstName', s.firstName);
    await page.fill('#lastName', s.lastName);
    await page.click('label[for="gender-radio-1"]');
    await page.fill('#userNumber', s.phone);
    await page.locator('#submit').scrollIntoViewIfNeeded();
    await page.click('#submit');
    await expect(page.locator('#example-modal-sizes-title-lg'))
      .toHaveText("Thanks for submitting the form");
    await expect(
      page.locator('//td[text()="Student Name"]/following-sibling::td')
    ).toContainText(`${s.firstName} ${s.lastName}`);
    await expect(
      page.locator('//td[text()="Mobile"]/following-sibling::td')
    ).toContainText(s.phone);
     await page.screenshot({path:'screenshot/q24.png'});
    await page.locator('#closeLargeModal').click({ force: true });
    await page.reload();
  }
});