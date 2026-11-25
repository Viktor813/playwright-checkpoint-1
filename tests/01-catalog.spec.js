import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

// Restrict checks to product cards, not arbitrary page text.
const productCard = (page, name) => page.locator('.card').filter({
  has: page.getByRole('heading', { name, exact: true }),
});

test.beforeEach(async ({ page }) => {
  // A fresh browser context and root URL reset search and brand filters.
  await page.goto('/');
});

test('Задание 1', async ({ page }) => {
  const model = new CatalogPage(page);
  await expect(productCard(page, 'Apple')).toBeVisible();
  await model.search('Red Lipstick');
  await expect(productCard(page, 'Red Lipstick')).toBeVisible();
  await expect(productCard(page, 'Apple')).toHaveCount(0);
});

test('Задание 2', async ({ page }) => {
  const model = new CatalogPage(page);
  await expect(productCard(page, 'Apple')).toBeVisible();
  await model.selectBrand('Essence');
  await expect(page.getByRole('checkbox', { name: 'Essence', exact: true })).toBeChecked();
  await expect(productCard(page, 'Essence Mascara Lash Princess')).toBeVisible();
  await expect(productCard(page, 'Apple')).toHaveCount(0);
});

test('Задание 3', async ({ page }) => {
  const model = new CatalogPage(page);
  await model.openProduct('Red Lipstick');
  await expect(page).toHaveURL(/\/products\/4$/);
  await expect(page.getByRole('heading', { name: 'Red Lipstick', exact: true })).toBeVisible();
});

// Only tasks 1–3 were requested. Do not report the unfinished task as passing.
test.skip('Задание 4', async ({ page }) => {
  const model = new CatalogPage(page);
  await expect(productCard(page, 'Essence Mascara Lash Princess')).toBeVisible();
  await model.nextPage();
  await expect(productCard(page, 'Essence Mascara Lash Princess')).toHaveCount(0);
});
