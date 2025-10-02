import { test, expect } from '@playwright/test';

test.describe('Tour Button Check', () => {
  test('check if tour button exists and works', async ({ page }) => {
    // Navigate and login
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.click('text=Use Demo Account');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Logged in successfully');
    
    // Look specifically for the tour button
    const tourButton = await page.$('button:has-text("🎯 Tour")');
    
    if (tourButton) {
      console.log('✅ Tour button found');
      
      // Check if it's visible
      const isVisible = await tourButton.isVisible();
      console.log(`Visibility: ${isVisible}`);
      
      if (isVisible) {
        console.log('✅ Button is visible, clicking...');
        await tourButton.click();
        await page.waitForTimeout(1000);
        
        // Check if modal appeared
        const modal = await page.$('.fixed.inset-0');
        if (modal) {
          console.log('✅ Modal appeared after button click');
          
          // Try to close with backdrop click
          await page.click('.fixed.inset-0', { position: { x: 10, y: 10 } });
          await page.waitForTimeout(1000);
          
          const modalAfterClose = await page.$('.fixed.inset-0');
          if (!modalAfterClose) {
            console.log('✅ Modal closed successfully with backdrop click');
          } else {
            console.log('❌ Modal still visible after backdrop click');
          }
        } else {
          console.log('❌ No modal appeared after button click');
        }
      } else {
        console.log('❌ Button is not visible');
      }
    } else {
      console.log('❌ Tour button not found');
      
      // Debug: look for any element containing "Tour" text
      const tourElements = await page.$$('text=/Tour/');
      console.log(`Found ${tourElements.length} elements with "Tour" text`);
      
      // Look for button containing emoji
      const emojiButtons = await page.$$('button');
      for (let i = 0; i < emojiButtons.length; i++) {
        const text = await emojiButtons[i].textContent();
        if (text && text.includes('🎯')) {
          console.log(`Found emoji button: "${text}"`);
        }
      }
    }
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/tour-button-debug.png', fullPage: true });
  });
});
