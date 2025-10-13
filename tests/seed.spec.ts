import { test, expect } from '@playwright/test';

test('verify initial page rendering', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Rating/);
  const ratingCircles = page.getByTestId('rating-circles');
  const circles = ratingCircles.locator('> div');
  await expect(circles).toHaveCount(5);
});

