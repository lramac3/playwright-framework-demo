import { test as base } from '@playwright/test';
import { AppHelpers } from '../helpers/app';
import fs from 'node:fs';
import path from 'node:path';

const storageStatePath = path.join(process.cwd(), 'playwright/.auth/user.json');

export const test = base.extend<{ app: AppHelpers }>({
  app: async ({ page }, use) => {
    const app = new AppHelpers(page);
    await use(app);
  },
});

export const authTest = base.extend<{ app: AppHelpers }>({
  app: async ({ page }, use) => {
    if (!fs.existsSync(storageStatePath)) {
      await page.goto('https://www.saucedemo.com');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await page.context().storageState({ path: storageStatePath });
    }
    await page.goto('https://www.saucedemo.com/inventory.html');
    const app = new AppHelpers(page);
    await use(app);
  },
});
