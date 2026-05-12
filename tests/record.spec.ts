import { test, expect } from '@playwright/test';

test('записать HAR для конструктора', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/constructor.har', {
    update: false
  });

  await page.goto('/');

  await expect(page.locator('h3:has-text("Булки")')).toBeVisible();
  await expect(page.locator('h3:has-text("Соусы")')).toBeVisible();
  await expect(page.locator('h3:has-text("Начинки")')).toBeVisible();

  await page.waitForLoadState('networkidle');
});
