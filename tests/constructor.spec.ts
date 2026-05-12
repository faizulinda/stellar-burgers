import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/constructor.har', {
      url: '**/api/**',
      notFound: 'fallback'
    });

    await page.goto('/');
    await expect(page.locator('h3:has-text("Булки")')).toBeVisible();
  });

  test('добавление булки из списка ингредиентов в конструктор', async ({
    page
  }) => {
    const firstBun = page.locator('h3:has-text("Булки") + ul li').first();
    const constructor = page
      .locator('section')
      .filter({ has: page.getByRole('button', { name: 'Оформить заказ' }) });

    const bunName = await firstBun
      .locator('p.text_type_main-default')
      .textContent();

    await expect(constructor.getByText(bunName!, { exact: true })).toHaveCount(
      0
    );

    await firstBun.getByRole('button', { name: 'Добавить' }).click();

    await expect(constructor).toContainText(`${bunName} (верх)`);
    await expect(constructor).toContainText(`${bunName} (низ)`);
  });

  test('добавление начинки из списка ингредиентов в конструктор', async ({
    page
  }) => {
    const firstMain = page.locator('h3:has-text("Начинки") + ul li').first();
    const constructor = page
      .locator('section')
      .filter({ has: page.getByRole('button', { name: 'Оформить заказ' }) });

    const ingredientName = await firstMain
      .locator('p.text_type_main-default')
      .textContent();

    await expect(
      constructor.getByText(ingredientName!, { exact: true })
    ).toHaveCount(0);

    await firstMain.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      constructor.getByText(ingredientName!, { exact: true })
    ).toHaveCount(1);
  });

  test('открытие модального окна ингредиента', async ({ page }) => {
    const firstBun = page.locator('h3:has-text("Булки") + ul li').first();

    await firstBun.locator('a').click();

    await expect(
      page.locator('#modals').getByText('Детали ингредиента')
    ).toBeVisible();
  });

  test('закрытие модального окна ингредиента по крестику', async ({ page }) => {
    const firstBun = page.locator('h3:has-text("Булки") + ul li').first();

    await firstBun.locator('a').click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    await page.locator('#modals button').click();

    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('закрытие модального окна ингредиента по оверлею', async ({ page }) => {
    const firstBun = page.locator('h3:has-text("Булки") + ul li').first();

    await firstBun.locator('a').click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await page
      .locator('#modals > div')
      .last()
      .click({ position: { x: 10, y: 10 } });
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('в модальном окне отображаются данные выбранного ингредиента', async ({
    page
  }) => {
    const firstBun = page.locator('h3:has-text("Булки") + ul li').first();

    const ingredientName = await firstBun
      .locator('p.text_type_main-default')
      .textContent();

    await firstBun.locator('a').click();

    const modal = page.locator('#modals');

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    await expect(
      modal.getByRole('heading', { name: ingredientName! })
    ).toBeVisible();
  });
});

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/constructor.har', {
      url: '**/api/**',
      notFound: 'fallback'
    });

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      document.cookie = 'accessToken=Bearer fake-access-token; path=/';
    });

    await page.goto('/');
    await expect(page.locator('h3:has-text("Булки")')).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
  });

  test('создание заказа: номер заказа и очистка конструктора', async ({
    page
  }) => {
    const constructor = page
      .locator('section')
      .filter({ has: page.getByRole('button', { name: 'Оформить заказ' }) });

    await page
      .locator('h3:has-text("Булки") + ul li')
      .first()
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page
      .locator('h3:has-text("Начинки") + ul li')
      .first()
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.locator('.text_type_digits-large')).toHaveText('12345', {
      timeout: 10000
    });

    await page.locator('#modals button').click();

    await expect(page.locator('.text_type_digits-large')).not.toBeVisible();

    await expect(constructor.getByText('Выберите булки')).toHaveCount(2);
    await expect(constructor.getByText('Выберите начинку')).toHaveCount(1);
  });
});
