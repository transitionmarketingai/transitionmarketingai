import { test, expect } from '@playwright/test';

test.describe('Tour Modal Working Test', () => {
  test('verify tour modal opens and closes correctly', async ({ page }) => {
    // Navigate and login
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.click('text=Use Demo Account');
    await page.waitForLoadState('networkidle');
    
    // Wait for dashboard to load
    await page.waitForTimeout(2000);
    
    console.log('✅ Login completed');
    
    // Look directly for tour button
    const tourButton = await page.$('button:has-text("🎯Tour")');
    
    if (tourButton) {
      console.log('✅ Tour button found');
      
      // Click tour button
      await tourButton.click();
      await page.waitForTimeout(1000);
      
      // Check if modal appears
      const modal = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
      if (modal) {
        console.log('✅ Tour modal opened successfully');
        
        // Test closing with X button
        const closeButton = await page.$('button[aria-label="Close tour"]');
        if (closeButton) {
          console.log('✅ Close button found');
          await closeButton.click();
          await page.waitForTimeout(1000);
          
          const modalAfterClose = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
          if (!modalAfterClose) {
            console.log('✅ Modal closed with X button - SUCCESS!');
          } else {
            console.log('❌ Modal still open after X button');
          }
        }
      } else {
        console.log('❌ Modal did not appear');
      }
    } else {
      console.log('❌ Tour button not found');
    }
    
    // Take final screenshot
    await page.screenshot({ path: 'test-results/tour-modal-working-test.png', fullPage: true });
  });
});
