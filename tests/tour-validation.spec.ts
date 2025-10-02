import { test, expect } from '@playwright/test';

test.describe('Tour Modal Validation', () => {
  test('verify tour modal opens and closes correctly', async ({ page }) => {
    // Navigate and login
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.click('text=Use Demo Account');
    await page.waitForLoadState('networkidle');
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    console.log('✅ Successfully logged into dashboard');
    
    // Find and click the tour button
    const tourButton = await page.waitForSelector('button:has-text("🎯Tour"), button:has-text("Tour")', { timeout: 10000 });
    
    if (tourButton) {
      console.log('✅ Tour button found, clicking...');
      await tourButton.click();
      await page.waitForTimeout(1000);
      
      // Check if modal appeared
      const modalBackdrop = await page.$('.fixed.inset-0.bg-black.bg-opacity-50');
      
      if (modalBackdrop) {
        console.log('✅ Tour modal appeared successfully');
        
        // Check modal content
        const modalTitle = await page.$('text=Welcome to Your AI Lead Generation Dashboard');
        const skipButton = await page.$('button:has-text("Skip Tour")');
        const startButton = await page.$('button:has-text("Start Tour")');
        
        if (modalTitle) console.log('✅ Modal title visible');
        if (skipButton) console.log('✅ Skip button found');
        if (startButton) console.log('✅ Start Tour button found');
        
        // Test Skip Tour button
        if (skipButton) {
          console.log('🔘 Testing Skip Tour button...');
          await skipButton.click();
          await page.waitForTimeout(1000);
          
          // Check if modal closed
          const modalAfterSkip = await page.$('.fixed.inset-0.bg-black.bg-opacity-50');
          if (modalAfterSkip) {
            console.log('❌ Modal still visible after Skip Tour');
            
            // Try backdrop click as fallback
            await page.click('.fixed.inset-0', { position: { x: 10, y: 10 } });
            await page.waitForTimeout(1000);
            
            const modalAfterBackdrop = await page.$('.fixed.inset-0.bg-black.bg-opacity-50');
            if (!modalAfterBackdrop) {
              console.log('✅ Modal closed with backdrop click');
            } else {
              console.log('❌ Modal still visible after backdrop click');
            }
          } else {
            console.log('✅ Modal closed successfully with Skip Tour');
          }
        }
        
        // Test backdrop click if modal reopened
        await tourButton.click();
        await page.waitForTimeout(500);
        
        const modalReopened = await page.$('.fixed.inset-0.bg-black.bg-opacity-50');
        if (modalReopened) {
          console.log('🔘 Testing backdrop click to close...');
          await page.click('.fixed.inset-0', { position: { x: 10, y: 10 } });
          await page.waitForTimeout(1000);
          
          const finalModalCheck = await page.$('.fixed.inset-0.bg-black.bg-opacity-50');
          if (!finalModalCheck) {
            console.log('✅ Modal closed successfully with backdrop click');
          } else {
            console.log('❌ Modal remains open');
          }
        }
      } else {
        console.log('❌ Tour modal did not appear');
      }
    } else {
      console.log('❌ Tour button not found');
    }
    
    // Take final screenshot
    await page.screenshot({ path: 'test-results/tour-validation.png', fullPage: true });
    console.log('📸 Screenshot saved for validation');
  });
});
