import { Page } from "@playwright/test";

export class SignUpPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
async signUp(username: string, password: string) {

  await this.page.locator("input[name='register_username']").fill(username);
  await this.page.locator("input[name='register_password']").fill(password);

  await this.page.locator("button[name='submit'][value='register']").click();
}
}
