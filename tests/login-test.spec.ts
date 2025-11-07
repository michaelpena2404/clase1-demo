import { test, expect } from '@playwright/test';

async function login(page: any, username: string, password: string) {
  const url = 'https://www.saucedemo.com/';
  await page.goto(url);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test.beforeEach(async ({ page }, testInfo) => {
  const user = testInfo.title.includes('locked')
    ? { username: 'locked_out_user', password: 'secret_sauce' }
    : { username: 'standard_user', password: 'secret_sauce' };
  await login(page, user.username, user.password);
});


test('test login in sauce labs', async ({ page }) => {
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('test login user locked out', async ({ page }) => {
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  await expect(page.locator('svg').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
});
