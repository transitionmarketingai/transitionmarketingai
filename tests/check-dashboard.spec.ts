import { test, expect } from '@playwright/test';

test('Check Customer Dashboard', async ({ page }) => {
  // Navigate to login and try demo
  await page.goto('http://localhost:3000/login');
  
  // Take screenshot of login page
  await page.screenshot({ path: 'screenshots/login-page.png', fullPage: true });
  
  // Click demo dashboard button
  await page.click('text=Try Demo Dashboard');
  
  // Wait for dashboard to load
  await page.waitForURL('**/dashboard**');
  await page.waitForTimeout(2000);
  
  // Take screenshot of dashboard
  await page.screenshot({ path: 'screenshots/dashboard-main.png', fullPage: true });
  
  // Check for key elements
  const hasLogo = await page.locator('text=Transition Marketing AI').count();
  const hasLeads = await page.locator('text=My Leads').count();
  const hasInbox = await page.locator('text=Inbox').count();
  
  console.log('Logo found:', hasLogo > 0);
  console.log('My Leads navigation:', hasLeads > 0);
  console.log('Inbox navigation:', hasInbox > 0);
  
  // Try clicking My Leads
  if (hasLeads > 0) {
    await page.click('text=My Leads');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/my-leads-page.png', fullPage: true });
  }
  
  // Try clicking Reports
  const hasReports = await page.locator('text=Reports').count();
  if (hasReports > 0) {
    await page.click('text=Reports');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/reports-page.png', fullPage: true });
  }
  
  // Check admin dashboard
  await page.goto('http://localhost:3000/admin');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/admin-dashboard.png', fullPage: true });
  
  console.log('Screenshots saved to screenshots/ directory');
});


