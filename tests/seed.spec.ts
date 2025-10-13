import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
test('verify initial page rendering', async ({ page }) => {
  await expect(page).toHaveTitle(/Rating/);
  const ratingCircles = page.getByTestId('rating-circles');
  const circles = ratingCircles.locator('> div');
  await expect(circles).toHaveCount(5);
});

