import {test,expect} from "@playwright/test"
import path from "path"
import fs from "fs"

let datafile = fs.readFileSync(path.join(__dirname,"book.json"))
let data= JSON.parse(datafile)


test("Register and add book",async({page})=>{
    await page.goto("https://demoqa.com/books")
    await page.locator('#login').click()
    await page.locator('#newUser').click()

    await page.fill("#firstname", data.firstName);
await page.fill("#lastname", data.lastName);

    await page.fill("#userName", data.username);
    await page.fill("#password", data.password);

    page.once("dialog", async dialog => {
  console.log(dialog.message());
  await dialog.accept();
});

// Click register
await page.click("#register");

await page.locator('#gotologin').click()
 await page.fill("#userName", data.username);
  await page.fill("#password", data.password);
  await page.click("#login");
  await expect(page.locator("text=User Name")).toBeVisible();
  await page.locator('#gotoStore').click()

  await page.fill("#searchBox",data.book);
  await page.click(`text=${data.book}`);

  await page.locator('//button[text()="Add To Your Collection"]').click()

  await page.getByText("Profile").click();
  await expect(page.locator(`text=${data.book}`)).toBeVisible();
  await page.screenshot({path:'screenshot/q26.png'});
  await page.locator('//button[text()="Logout"]').click()
})