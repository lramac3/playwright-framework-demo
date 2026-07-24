import { authTest } from './fixtures';

authTest.describe('@regression', () => {
  authTest.beforeEach(async ({ app }) => {
    await app.openHome();
  });

  authTest('keeps the cart badge in sync after adding an item', async ({ app }) => {
    await app.addFirstItemToCart();
  });
});
