import { authTest } from './fixtures';

authTest.describe('@regression', () => {
  authTest.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  authTest('keeps the cart badge in sync after adding an item', async ({ app }) => {
    await app.addFirstItemToCart();
  });
});
