import { test, expect } from '@playwright/test';

test.describe('New Dashboard Pages Check', () => {
  test('Check Contacts page exists', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/contacts');
    await page.waitForLoadState('networkidle');
    
    // Check for page title
    const title = await page.textContent('h1');
    console.log('Contacts page title:', title);
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/contacts-page.png', fullPage: true });
    
    expect(title).toContain('Contacts');
  });

  test('Check Leads page exists', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/leads');
    await page.waitForLoadState('networkidle');
    
    const title = await page.textContent('h1');
    console.log('Leads page title:', title);
    
    await page.screenshot({ path: 'screenshots/leads-page.png', fullPage: true });
    
    expect(title).toContain('Leads');
  });

  test('Check Campaigns page exists', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/campaigns');
    await page.waitForLoadState('networkidle');
    
    const title = await page.textContent('h1');
    console.log('Campaigns page title:', title);
    
    await page.screenshot({ path: 'screenshots/campaigns-page.png', fullPage: true });
    
    expect(title).toContain('Campaigns');
  });

  test('Check Outreach page exists', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/outreach');
    await page.waitForLoadState('networkidle');
    
    const title = await page.textContent('h1');
    console.log('Outreach page title:', title);
    
    await page.screenshot({ path: 'screenshots/outreach-page.png', fullPage: true });
    
    expect(title).toContain('Outreach');
  });

  test('Check Conversations page exists', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/conversations');
    await page.waitForLoadState('networkidle');
    
    const title = await page.textContent('h1');
    console.log('Conversations page title:', title);
    
    await page.screenshot({ path: 'screenshots/conversations-page.png', fullPage: true });
    
    expect(title).toContain('Conversations');
  });

  test('Check old dashboard page', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    const content = await page.content();
    console.log('Dashboard shows old or new?');
    
    // Check if it has the old structure
    const hasOldStructure = content.includes('My Leads') || content.includes('Lead Quota');
    const hasNewStructure = content.includes('Contacts') || content.includes('Overview');
    
    console.log('Has old structure:', hasOldStructure);
    console.log('Has new structure:', hasNewStructure);
    
    await page.screenshot({ path: 'screenshots/main-dashboard.png', fullPage: true });
  });
});

