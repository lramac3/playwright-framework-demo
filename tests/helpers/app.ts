import { Page } from '@playwright/test';

export class AppHelpers {
  constructor(private page: Page) {}

  async openHome() {
    await this.page.goto('/');
    await this.page.getByText('Swag Labs').waitFor();
  }

  async login(username = 'standard_user', password = 'secret_sauce') {
    await this.page.goto('/');
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
    await this.page.locator('.inventory_list').waitFor();
  }

  async addFirstItemToCart() {
    await this.page.locator('.inventory_item').first().locator('button').click();
    await this.page.locator('.shopping_cart_badge').waitFor();
  }
}
