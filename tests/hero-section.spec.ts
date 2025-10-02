import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test('should display hero text content', async ({ page }) => {
    await page.goto('/');

    // Check main headline
    const headline = page.locator('h1').first();
    await expect(headline).toContainText('The CRM that helps you');
    await expect(headline).toContainText('close more deals');

    // Check subheadline - find the larger paragraph
    const subheadline = page.locator('p.text-xl').first(); // Main subheadline paragraph
    await expect(subheadline).toContainText('sales process');

    // Check trust indicators
    await expect(page.locator('text=14-day free trial').first()).toBeVisible();
    await expect(page.locator('text=Trusted by growing businesses').first()).toBeVisible();
  });

  test('should have proper background styling', async ({ page }) => {
    await page.goto('/');

    // Check for gradient background in hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check for white background (current design)
    const bgWhite = heroSection.locator('.bg-white');
    await expect(bgWhite.first()).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const headline = page.locator('h1').first();
    await expect(headline).toBeVisible();
    await expect(headline).toContainText('The CRM that helps you');
  });

  test('should have proper CTA button styling', async ({ page }) => {
    await page.goto('/');

    // Check for CTA buttons in the hero content section
    const heroTryFreeButton = page.locator('section').first().locator('a[href="/signup"]').first();
    await expect(heroTryFreeButton).toBeVisible();
    await expect(heroTryFreeButton).toHaveClass(/bg-blue-600/);

    const heroDemoButton = page.locator('section').first().locator('a[href="/demo"]').first();
    await expect(heroDemoButton).toBeVisible();

    // Also check navigation buttons exist (they might be hidden on mobile but we can verify they exist)
    const navTryFreeButton = page.locator('nav a[href="/signup"]').first();
    await expect(navTryFreeButton).toHaveClass(/bg-blue-600/);
  });

  test('should have proper navigation', async ({ page }) => {
    await page.goto('/');

    // Check navigation structure
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // Check that logo now says "Transition CRM"
    const logo = navigation.locator('a[href="/"]').first();
    await expect(logo).toContainText('Transition CRM');
    
    // Check for navigation links - updated for CRM structure
    const productsLink = navigation.locator('button').first();
    await expect(productsLink).toContainText('Products');
  });
});