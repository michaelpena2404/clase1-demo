import { test, expect } from '@playwright/test';

async function login(page: any, username: string, password: string) {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test.beforeEach(async ({ page }, testInfo) => {
 const url = 'https://www.saucedemo.com/';
 await page.goto(url);
});


test('test login in sauce labs', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('test login user locked out', async ({ page }) => {
  await login(page, 'locked_out_user', 'secret_sauce');
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  await expect(page.locator('svg').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
});

test('login sin contraseña', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Epic sadface: Password is required'
  );
});