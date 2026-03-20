import { Page } from "@playwright/test";

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("http://49.249.28.218:8081/TestServer/Build/Online_Book_Shop_System/");
  }

  async goToLogin() {
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async goToSignUp(){
    await this.page.getByRole("button",{name: "Sign Up"}).click()
  }
}