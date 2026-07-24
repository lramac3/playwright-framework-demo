import { test } from './fixtures';

test.describe('@smoke', () => {
  test.beforeEach(async ({ app }) => {
    await app.openHome();
  });

  test('shows the inventory page after login', async ({ app }) => {
    await app.login();
    await app.addFirstItemToCart();
  });
});
