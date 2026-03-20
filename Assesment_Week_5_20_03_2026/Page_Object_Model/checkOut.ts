import { Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async placeOrder() {
    await this.page.getByText("Place").click();
  }
}