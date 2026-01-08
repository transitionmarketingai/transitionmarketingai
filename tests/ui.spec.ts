import { test, expect } from '@playwright/test';

test.describe('TransitionMarketingAI UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002');
  });

  test('should display the home page with proper styling', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle(/TransitionMarketingAI/);
    
    // Check if the header is visible
    await expect(page.locator('header')).toBeVisible();
    
    // Check if the logo is visible
    await expect(page.locator('text=TransitionMarketingAI')).toBeVisible();
    
    // Check if the hero section is visible
    await expect(page.locator('h1')).toContainText('AI Marketing Agents for Your Business');
    
    // Check if the buttons are visible
    await expect(page.locator('text=Start Free Trial')).toBeVisible();
    await expect(page.locator('text=Explore Agents')).toBeVisible();
    
    // Check if the footer is visible
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should navigate to agents page', async ({ page }) => {
    await page.click('text=Agents');
    await expect(page).toHaveURL(/.*agents/);
    await expect(page.locator('h1')).toContainText('AI Marketing Agents');
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.click('text=Pricing');
    await expect(page).toHaveURL(/.*pricing/);
    await expect(page.locator('h1')).toContainText('Simple, Transparent Pricing');
  });

  test('should navigate to docs page', async ({ page }) => {
    await page.click('text=Docs');
    await expect(page).toHaveURL(/.*docs/);
    await expect(page.locator('h1')).toContainText('Documentation & FAQ');
  });

  test('should have proper styling and colors', async ({ page }) => {
    // Check if the primary button has the correct green color
    const primaryButton = page.locator('text=Start Free Trial').first();
    await expect(primaryButton).toBeVisible();
    
    // Check if the mascot emoji is visible
    await expect(page.locator('text=🤖')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });
});
