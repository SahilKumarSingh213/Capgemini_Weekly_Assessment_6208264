import { Page } from "@playwright/test";

export class BookPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectGenre(genreName: string) {
    await this.page.getByRole("link", { name: genreName }).click();
  }

  async selectBook(bookName: string) {
    await this.page.getByText(bookName).click();
  }

    async selectQuantity(quantity: string) {
    await this.page.locator("#quantity").selectOption(quantity);
  }
  
}