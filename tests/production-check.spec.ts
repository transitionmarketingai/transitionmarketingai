import { test, expect } from '@playwright/test';

test.describe('Production Site Check', () => {
  
  test('Check homepage transformation on production', async ({ page }) => {
    // Visit the actual production site
    await page.goto('https://transitionmarketingai.ai');
    
    // Check for the new lead generation focused title
    await expect(page.locator('h1')).toContainText('Complete AI Lead Generation Ecosystem');
    
    // Check that PARA is not mentioned anywhere on the homepage
    await expect(page.locator('body')).not.toContainText('PARA');
    await expect(page.locator('body')).not.toContainText('Projects');
    await expect(page.locator('body')).not.toContainText('Areas');
    await expect(page.locator('body')).not.toContainText('Resources');
    await expect(page.locator('body')).not.toContainText('Archives');
    
    // Check for lead generation focused content
    await expect(page.locator('body')).toContainText('AI Lead Generation');
    await expect(page.locator('body')).toContainText('₹26');
    await expect(page.locator('body')).toContainText('Indian Market');
    await expect(page.locator('body')).toContainText('Industry Templates');
    
    console.log('✅ Homepage transformation verified');
  });

  test('Check demo dashboard PARA removal', async ({ page }) => {
    // Go to production homepage first
    await page.goto('https://transitionmarketingai.ai');
    
    // Go to signin page
    await page.click('text=Sign In');
    await expect(page).toHaveURL(/.*signin/);
    
    // Login with demo credentials
    await page.fill('input[type="email"]', 'demo@transitionai.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await page.waitForURL(/.*dashboard.*/, { timeout: 10000 });
    
    // Check that PARA method elements are NOT present
    await expect(page.locator('body')).not.toContainText('Projects');
    await expect(page.locator('body')).not.toContainText('Areas'); 
    await expect(page.locator('body')).not.toContainText('Resources');
    await expect(page.locator('body')).not.toContainText('Archives');
    await expect(page.locator('body')).not.toContainText('PARA');
    
    // Check for the new lead generation focused navigation
    await expect(page.locator('nav')).toContainText('AI Lead Generation Suite');
    await expect(page.locator('body')).toContainText('Campaigns');
    await expect(page.locator('body')).toContainText('Industry Templates');
    await expect(page.locator('body')).toContainText('Lead Database');
    
    // Check for new lead generation content
    await expect(page.locator('body')).toContainText('Active Lead Generation');
    await expect(page.locator('body')).toContainText('Indian');
    
    console.log('✅ Demo dashboard PARA removal verified');
  });

  test('Check mobile responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check homepage on mobile
    await page.goto('https://transitionmarketingai.ai');
    
    // Ensure mobile navigation works
    await expect(page.locator('button[aria-label*="menu"], button[class*="menu"]')).toBeVisible();
    
    console.log('✅ Mobile responsiveness verified');
  });

});
