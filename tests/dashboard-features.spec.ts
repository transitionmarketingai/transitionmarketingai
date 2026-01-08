import { test, expect } from '@playwright/test';

test.describe('Dashboard Features', () => {
  test('should have automation and integrations tabs', async ({ page }) => {
    // Go to the login page first
    await page.goto('http://localhost:3002/login');
    
    // Click the demo dashboard button
    await page.click('text=Try Demo Dashboard');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Check if the new tabs are present
    await expect(page.locator('text=Automation')).toBeVisible();
    await expect(page.locator('text=Integrations')).toBeVisible();
    
    // Test clicking on Automation tab
    await page.click('text=Automation');
    await expect(page.locator('text=Total Workflows')).toBeVisible();
    await expect(page.locator('text=Create Workflow')).toBeVisible();
    
    // Test clicking on Integrations tab
    await page.click('text=Integrations');
    await expect(page.locator('text=Connected Integrations')).toBeVisible();
    await expect(page.locator('text=Available Integrations')).toBeVisible();
    
    // Should see some mock integrations
    await expect(page.locator('text=Google Ads')).toBeVisible();
    await expect(page.locator('text=Mailchimp')).toBeVisible();
    
    // Should see some automation workflows
    await page.click('text=Automation');
    await expect(page.locator('text=Welcome Series')).toBeVisible();
    await expect(page.locator('text=Lead Nurturing')).toBeVisible();
  });

  test('should display marketing automation workflows', async ({ page }) => {
    await page.goto('http://localhost:3002/login');
    await page.click('text=Try Demo Dashboard');
    await page.click('text=Automation');
    
    // Check workflow overview metrics
    await expect(page.locator('text=Total Workflows')).toBeVisible();
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Total Runs')).toBeVisible();
    await expect(page.locator('text=Avg Success Rate')).toBeVisible();
    
    // Check for workflow cards
    await expect(page.locator('text=Welcome Series')).toBeVisible();
    await expect(page.locator('text=Lead Nurturing')).toBeVisible();
    await expect(page.locator('text=Abandoned Cart Recovery')).toBeVisible();
    await expect(page.locator('text=Content Distribution')).toBeVisible();
  });

  test('should display platform integrations', async ({ page }) => {
    await page.goto('http://localhost:3002/login');
    await page.click('text=Try Demo Dashboard');
    await page.click('text=Integrations');
    
    // Check integration overview metrics
    await expect(page.locator('text=Connected')).toBeVisible();
    await expect(page.locator('text=Data Points')).toBeVisible();
    await expect(page.locator('text=Health Score')).toBeVisible();
    await expect(page.locator('text=Last Sync')).toBeVisible();
    
    // Check for connected integrations
    await expect(page.locator('text=Google Ads')).toBeVisible();
    await expect(page.locator('text=Facebook Ads')).toBeVisible();
    await expect(page.locator('text=Mailchimp')).toBeVisible();
    await expect(page.locator('text=Google Analytics')).toBeVisible();
    
    // Check for available integrations
    await expect(page.locator('text=LinkedIn Ads')).toBeVisible();
    await expect(page.locator('text=Salesforce')).toBeVisible();
  });
});
