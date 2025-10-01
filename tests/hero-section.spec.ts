import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test('should display hero section with correct layout', async ({ page }) => {
    await page.goto('/');

    // Check if hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check for full-screen height
    await expect(heroSection).toHaveClass(/min-h-screen/);

    // Check for two-column layout
    const gridContainer = heroSection.locator('.grid.grid-cols-1.lg\\:grid-cols-2');
    await expect(gridContainer).toBeVisible();
  });

  test('should display hero text content', async ({ page }) => {
    await page.goto('/');

    // Check main headline
    const headline = page.locator('h1').first();
    await expect(headline).toContainText('AI Marketing');
    await expect(headline).toContainText('Agents');

    // Check subheadline
    const subheadline = page.locator('p').first();
    await expect(subheadline).toContainText('Your helpers that never sleep');

    // Check CTA buttons
    const getStartedButton = page.locator('a[href="/get-started"]').first();
    await expect(getStartedButton).toContainText('Get Started Free');

    const howItWorksButton = page.locator('a[href="/how-it-works"]').first();
    await expect(howItWorksButton).toContainText('How it works');
  });

          test('should display mascot character', async ({ page }) => {
            await page.goto('/');

            // Check for mascot container
            const mascotContainer = page.locator('.relative.w-full.max-w-2xl');
            await expect(mascotContainer).toBeVisible();

            // Check for main mascot container
            const mainMascotContainer = page.locator('.relative.w-full.h-\\[600px\\]');
            await expect(mainMascotContainer).toBeVisible();

            // Check for robot mascot body
            const mascotBody = page.locator('.relative.w-48.h-64.bg-gradient-to-b.from-purple-400.via-purple-500.to-blue-600');
            await expect(mascotBody).toBeVisible();

            // Check for robot head
            const mascotHead = page.locator('.absolute.-top-8.left-1\\/2.transform.-translate-x-1\\/2.w-32.h-32.bg-gradient-to-b.from-purple-300.to-purple-400.rounded-full');
            await expect(mascotHead).toBeVisible();

            // Check for TM logo
            const tmLogo = page.locator('text=TM');
            await expect(tmLogo).toBeVisible();

            // Check for pink glowing eyes
            const pinkEyes = page.locator('.bg-gradient-to-b.from-pink-200\\/90.to-pink-300\\/70');
            await expect(pinkEyes).toBeVisible();

            // Check for background glow effects
            const glowEffect = page.locator('.bg-gradient-to-r.from-purple-500\\/20.via-pink-500\\/20.to-cyan-500\\/20.rounded-full.blur-3xl');
            await expect(glowEffect).toBeVisible();
          });

          test('should have proper background styling', async ({ page }) => {
            await page.goto('/');

            // Check for gradient background
            const background = page.locator('.bg-gradient-to-br.from-slate-900.via-purple-900.to-slate-900');
            await expect(background).toBeVisible();

            // Check for dot pattern overlay
            const dotPattern = page.locator('.bg-dot-pattern');
            await expect(dotPattern).toBeVisible();
          });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if hero section is still visible on mobile
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check if text content is still readable
    const headline = page.locator('h1').first();
    await expect(headline).toBeVisible();
    await expect(headline).toContainText('AI Marketing');
  });

  test('should have proper animations and interactions', async ({ page }) => {
    await page.goto('/');

    // Check for floating elements with animations
    const floatingElements = page.locator('.animate-bounce, .animate-pulse, .animate-ping');
    await expect(floatingElements.first()).toBeVisible();

    // Check for scroll indicator
    const scrollIndicator = page.locator('.animate-bounce').last();
    await expect(scrollIndicator).toBeVisible();
  });
});
