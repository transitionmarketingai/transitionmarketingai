import { test, expect } from '@playwright/test';

test.describe('Hydration Tests', () => {
  test('should not have hydration errors', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate to the page
    await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Check that there are no hydration-related errors
    const hydrationErrors = errors.filter(error => 
      error.includes('Hydration failed') || 
      error.includes('hydration') ||
      error.includes('server rendered')
    );

    expect(hydrationErrors).toHaveLength(0);
  });

  test('navigation should render consistently', async ({ page }) => {
    await page.goto('/');
    
    // Check that navigation renders properly
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Check navigation styling is consistent
    await expect(navigation).toHaveClass(/bg-white/);
    await expect(navigation).toHaveClass(/backdrop-blur-md/);
    
    // Check logo text
    const logo = navigation.locator('a[href="/"], span').first();
    await expect(logo).toContainText('Transition CRM');
  });
});
