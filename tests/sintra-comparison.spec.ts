import { test, expect } from '@playwright/test';

test.describe('Transition CRM Design Verification', () => {
  test('should capture current hero section for comparison', async ({ page }) => {
    await page.goto('/');

    // Check hero section structure
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check headline content
    const headline = page.locator('h1').first();
    await expect(headline).toContainText('The CRM that helps you close more deals');

    // Check for trust indicators
    await expect(page.locator('text=14-day free trial').first()).toBeVisible();
    
    console.log('Current headline:', await headline.textContent());
  });

  test('should match CRM design expectations', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    const headline = page.locator('h1').first();
    await expect(headline).toBeVisible();

    await expect(headline).toContainText('The CRM that helps you');
    await expect(headline).toContainText('close more deals');

    // Check for pricing link in navigation (CRM-specific)
    const pricingLink = page.locator('nav button').filter({ hasText: 'Pricing' });
    await expect(pricingLink).toBeVisible();

    // Check for CRM-specific CTA buttons
    const tryFreeButton = page.locator('a[href="/signup"]').first();
    await expect(tryFreeButton).toBeVisible();
  });
});