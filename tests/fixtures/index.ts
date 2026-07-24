import { test as base, type Page } from '@playwright/test';
import { AppHelpers } from '../helpers/app';
import fs from 'node:fs';
import path from 'node:path';

const storageStatePath = path.join(process.cwd(), 'playwright/.auth/user.json');

async function ensureAuthState(page: Page) {
  if (!fs.existsSync(storageStatePath)) {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('.inventory_list').waitFor();
    await page.context().storageState({ path: storageStatePath });
  }
}

export const test = base.extend<{ app: AppHelpers }>({
  app: async ({ page }, use) => {
    const app = new AppHelpers(page);
    await use(app);
  },
});

export const authTest = base.extend<{ app: AppHelpers }>({
  page: async ({ browser }, use, testInfo) => {
    const context = await browser.newContext({
      storageState: fs.existsSync(storageStatePath) ? storageStatePath : undefined,
      baseURL: testInfo.project.use.baseURL as string | undefined,
    });
    const page = await context.newPage();
    await ensureAuthState(page);
    await page.goto('/inventory.html');
    await use(page);
    await context.close();
  },
  app: async ({ page }, use) => {
    const app = new AppHelpers(page);
    await use(app);
  },
});
