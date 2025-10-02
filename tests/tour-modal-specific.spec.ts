import { test, expect } from '@playwright/test';

test.describe('Tour Modal Specific Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('test tour modal functionality', async ({ page }) => {
    // Wait for dashboard to load by checking for sidebar
    await page.waitForSelector('.min-h-screen', { timeout: 10000 });
    
    // Look for tour button/trigger
    console.log('🔍 Looking for tour trigger...');
    
    // Check if there's already a tour modal visible
    const tourModal = await page.$('.fixed.inset-0');
    if (tourModal) {
      console.log('✅ Tour modal found already visible');
      
      // Try clicking backdrop to close
      await page.click('.fixed.inset-0');
      await page.waitForTimeout(1000);
      
      // Check if modal is closed
      const modalAfterClick = await page.$('.fixed.inset-0');
      if (modalAfterClick) {
        console.log('❌ Modal still visible after backdrop click');
        
        // Try clicking close button
        const closeButton = await page.$('button[class*="top-4"][class*="right-4"]');
        if (closeButton) {
          console.log('✅ Close button found, clicking...');
          await closeButton.click();
          await page.waitForTimeout(1000);
          
          // Check again
          const modalAfterCloseButton = await page.$('.fixed.inset-0');
          if (!modalAfterCloseButton) {
            console.log('✅ Modal closed successfully with close button');
          } else {
            console.log('❌ Modal still visible after close button click');
          }
        }
      } else {
        console.log('✅ Modal closed successfully with backdrop click');
      }
    } else {
      console.log('❌ No tour modal found');
      
      // Look for tour trigger button
      const tourButton = await page.$('text=Tour') || 
                         await page.$('text=🎯 Tour') ||
                         await page.$('[data-testid="tour-button"]') ||
                         await page.$('button:has-text("Tour")');
      
      if (tourButton) {
        console.log('✅ Tour button found, clicking...');
        await tourButton.click();
        await page.waitForTimeout(1000);
        
        // Check if modal appears
        const modalAfterClick = await page.$('.fixed.inset-0');
        if (modalAfterClick) {
          console.log('✅ Modal appeared after tour button click');
        } else {
          console.log('❌ Modal did not appear after tour button click');
        }
      } else {
        console.log('❌ No tour trigger button found');
        
        // List all buttons on page to help debug
        const allButtons = await page.$$('button');
        console.log(`📝 Found ${allButtons.length} buttons on page`);
        
        for (let i = 0; i < Math.min(allButtons.length, 5); i++) {
          const buttonText = await allButtons[i].textContent();
          console.log(`Button ${i}: "${buttonText}"`);
        }
      }
    }
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/tour-modal-debug.png', fullPage: true });
    console.log('📸 Screenshot saved to test-results/tour-modal-debug.png');
  });
});
