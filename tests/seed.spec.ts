import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

// 1. Initial Page Load
test('verify initial page rendering', async ({ page }) => {
  // Check title and container
  await expect(page).toHaveTitle(/Rating/);
  await expect(page.getByTestId('rating-container')).toBeVisible();

  // Check rating interface
  const ratingCircles = page.getByTestId('rating-circles');
  const circles = ratingCircles.locator('div');
  await expect(circles).toHaveCount(5);
});

// 2. Rating Circle Component
test('test rating circle interactions', async ({ page }) => {
  const ratingCircles = page.getByTestId('rating-circles');
  const circles = ratingCircles.locator('div');
  
  // Test clicking each rating
  for (let i = 0; i < 5; i++) {
    await circles.nth(i).click();
    const selectedValue = await circles.nth(i).getAttribute('data-value');
    expect(selectedValue).toBe((i + 1).toString());
  }
});

// 3. Submit Rating Flow
test('submit rating and verify acknowledgment', async ({ page }) => {
  // Select a rating
  const circles = page.getByTestId('rating-circles').locator('div');
  await circles.nth(3).click();
  
  // Submit rating
  await page.getByTestId('submit-button').click();
  
  // Verify acknowledgment
  await expect(page.getByTestId('thank-you-state')).toBeVisible();
  await expect(page.getByText('You selected 4 out of 5')).toBeVisible();
});

// 4. Responsive Design
test('verify responsive layouts', async ({ page }) => {
  // Test mobile layout
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByTestId('rating-container')).toBeVisible();
  
  // Test tablet layout
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.getByTestId('rating-container')).toBeVisible();
  
  // Test desktop layout
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.getByTestId('rating-container')).toBeVisible();
});

// 5. Keyboard Navigation
test('verify keyboard navigation', async ({ page }) => {
  // Test tab navigation through rating circles
  await page.keyboard.press('Tab');
  const circles = page.getByTestId('rating-circles').locator('div');
  
  // Navigate through all circles
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-value'));
    expect(focused).toBe((i + 1).toString());
  }
  
  // Test selection with Space
  await page.keyboard.press('Space');
  await expect(page.getByTestId('rating-circles').locator('div[data-selected="true"]')).toBeVisible();
});

// 6. Error Handling
test('verify error handling', async ({ page }) => {
  // Try submitting without selecting a rating
  await page.getByTestId('submit-button').click();
  
  // Verify error message
  await expect(page.getByTestId('error-message')).toBeVisible();
  await expect(page.getByText('Please select a rating')).toBeVisible();
});

// 7. Complete Flow
test('verify complete rating flow', async ({ page }) => {
  // Select rating
  const circles = page.getByTestId('rating-circles').locator('div');
  await circles.nth(4).click();
  
  // Submit rating
  await page.getByTestId('submit-button').click();
  
  // Verify acknowledgment
  await expect(page.getByTestId('thank-you-state')).toBeVisible();
  await expect(page.getByText('You selected 5 out of 5')).toBeVisible();
  
  // Verify original interface is not visible
  await expect(page.getByTestId('rating-container')).not.toBeVisible();
});