import { Page } from '@playwright/test';

const defaultUsername = process.env.SAUCE_USERNAME ?? 'standard_user';
const defaultPassword = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export class AppHelpers {
  constructor(private page: Page) {}

  async openHome() {
    await this.page.goto('/');
    await this.page.getByText('Swag Labs').waitFor();
  }

  async login(username = defaultUsername, password = defaultPassword) {
    await this.page.goto('/');
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
    await this.page.locator('.inventory_list').waitFor();
  }

  async addFirstItemToCart() {
    await this.page.getByRole('button', { name: /add to cart/i }).first().click();
    await this.page.locator('.shopping_cart_badge').waitFor();
  }
}
