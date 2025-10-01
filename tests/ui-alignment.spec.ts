import { test, expect } from '@playwright/test';

test.describe('UI Alignment and Design Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Homepage layout and alignment', async ({ page }) => {
    // Check header alignment
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check logo alignment
    const logo = page.locator('header .flex.items-center.space-x-3');
    await expect(logo).toBeVisible();
    
    // Check navigation alignment
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check hero section alignment
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Check CTA buttons alignment
    const ctaButtons = page.locator('a[href="/get-started"]');
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('Pricing section alignment', async ({ page }) => {
    // Navigate to pricing section
    await page.goto('/#pricing');
    
    // Check pricing table exists
    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeVisible();
    
    // Check pricing cards alignment on desktop
    const pricingCards = page.locator('.card');
    await expect(pricingCards).toHaveCount(1); // Main pricing card container
    
    // Check if pricing table is properly aligned
    const pricingTable = page.locator('.overflow-x-auto');
    await expect(pricingTable).toBeVisible();
  });

  test('How it works section alignment', async ({ page }) => {
    // Navigate to how it works section
    await page.goto('/#how');
    
    // Check how it works section
    const howSection = page.locator('#how');
    await expect(howSection).toBeVisible();
    
    // Check step cards alignment
    const stepCards = page.locator('.card');
    await expect(stepCards).toHaveCount(3); // Three step cards
    
    // Check step numbers alignment
    const stepNumbers = page.locator('.w-12.h-12.bg-blue-600');
    await expect(stepNumbers).toHaveCount(3);
  });

  test('Dashboard page layout', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check dashboard header
    const dashboardHeader = page.locator('h1');
    await expect(dashboardHeader).toContainText('Dashboard');
    
    // Check stat cards alignment
    const statCards = page.locator('.card');
    await expect(statCards.first()).toBeVisible();
    
    // Check sidebar navigation
    const sidebar = page.locator('nav');
    await expect(sidebar).toBeVisible();
  });

  test('Get Started page layout', async ({ page }) => {
    await page.goto('/get-started');
    
    // Check page title
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toContainText('Start Your');
    
    // Check form section
    const formSection = page.locator('.card');
    await expect(formSection.first()).toBeVisible();
    
    // Check benefits section
    const benefitsSection = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
    await expect(benefitsSection).toBeVisible();
  });

  test('How it Works page layout', async ({ page }) => {
    await page.goto('/how-it-works');
    
    // Check page title
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toContainText('How Our');
    
    // Check steps section
    const stepsSection = page.locator('.space-y-12');
    await expect(stepsSection).toBeVisible();
    
    // Check feature comparison table
    const comparisonTable = page.locator('table');
    await expect(comparisonTable).toBeVisible();
  });

  test('Responsive design - Mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile navigation
    const mobileNav = page.locator('nav');
    await expect(mobileNav).toBeVisible();
    
    // Check mobile CTA buttons
    const mobileCTA = page.locator('a[href="/get-started"]');
    await expect(mobileCTA.first()).toBeVisible();
    
    // Check mobile pricing cards
    await page.goto('/#pricing');
    const mobilePricingCards = page.locator('.lg\\:hidden .space-y-6 .card');
    await expect(mobilePricingCards.first()).toBeVisible();
  });

  test('Responsive design - Tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check tablet layout
    const tabletLayout = page.locator('main');
    await expect(tabletLayout).toBeVisible();
    
    // Check tablet navigation
    const tabletNav = page.locator('nav');
    await expect(tabletNav).toBeVisible();
  });

  test('Button alignment and hover effects', async ({ page }) => {
    // Check primary button alignment
    const primaryButton = page.locator('.btn-primary').first();
    await expect(primaryButton).toBeVisible();
    
    // Check button hover effect
    await primaryButton.hover();
    await expect(primaryButton).toHaveClass(/hover/);
    
    // Check secondary button alignment
    const secondaryButton = page.locator('.btn-secondary').first();
    await expect(secondaryButton).toBeVisible();
  });

  test('Card alignment and shadows', async ({ page }) => {
    // Check card alignment
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
    
    // Check card hover effects
    const firstCard = cards.first();
    await firstCard.hover();
    await expect(firstCard).toHaveClass(/hover/);
  });

  test('Typography alignment', async ({ page }) => {
    // Check heading alignment
    const headings = page.locator('h1, h2, h3');
    await expect(headings.first()).toBeVisible();
    
    // Check text alignment
    const textCenter = page.locator('.text-center');
    await expect(textCenter.first()).toBeVisible();
    
    // Check body text alignment
    const bodyText = page.locator('.text-body');
    await expect(bodyText.first()).toBeVisible();
  });

  test('Spacing and padding consistency', async ({ page }) => {
    // Check container spacing
    const container = page.locator('.container-custom');
    await expect(container).toBeVisible();
    
    // Check section padding
    const sections = page.locator('section');
    await expect(sections.first()).toBeVisible();
    
    // Check card padding
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
  });

  test('Color scheme consistency', async ({ page }) => {
    // Check primary color usage
    const primaryElements = page.locator('.text-primary');
    await expect(primaryElements.first()).toBeVisible();
    
    // Check secondary color usage
    const secondaryElements = page.locator('.text-secondary');
    await expect(secondaryElements.first()).toBeVisible();
    
    // Check gradient usage
    const gradientElements = page.locator('.bg-gradient-primary');
    await expect(gradientElements.first()).toBeVisible();
  });
});


