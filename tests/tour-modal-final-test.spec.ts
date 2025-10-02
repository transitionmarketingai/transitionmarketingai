import { test, expect } from '@playwright/test';

test.describe('Final Tour Modal Test', () => {
  test('comprehensive tour modal investigation', async ({ page }) => {
    // Navigate and login
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.click('text=Use Demo Account');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Logged in successfully');
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    // Check if tour modal appears automatically
    const modal = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
    if (modal) {
      console.log('🚨 Tour modal is automatically visible! Checking state...');
      
      // Check HTML for showTour state
      const showTourState = await page.$eval('body', () => {
        // Look for any JavaScript variables or state
        const scripts = Array.from(document.querySelectorAll('script'));
        let foundState = null;
        for (const script of scripts) {
          const content = script.textContent || script.innerHTML || '';
          if (content.includes('showTour')) {
            foundState = content.substring(0, 200) + '...';
            break;
          }
        }
        return foundState;
      });
      
      console.log('📊 JavaScript state analysis:', showTourState);
      
      // Try all closing methods
      console.log('🔘 Testing X button close...');
      const closeButton = await page.$('button[aria-label="Close tour"]');
      if (closeButton) {
        await closeButton.click();
        await page.waitForTimeout(1000);
        
        const modalAfterClose = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
        if (!modalAfterClose) {
          console.log('✅ Modal closed with X button');
        } else {
          console.log('❌ Modal still open after X button');
        }
      }
      
      // Try backdrop click
      console.log('🔘 Testing backdrop click...');
      await page.click('.fixed.inset-0', { position: { x: 10, y: 10 } });
      await page.waitForTimeout(1000);
      
      const modalAfterBackdrop = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
      if (!modalAfterBackdrop) {
        console.log('✅ Modal closed with backdrop click');
      } else {
        console.log('❌ Modal still open after backdrop click');
        
        // Try Skip Tour button
        console.log('🔘 Testing Skip Tour button...');
        const skipButton = await page.$('button:has-text("Skip Tour")');
        if (skipButton) {
          await skipButton.click();
          await page.waitForTimeout(1000);
          
          const modalAfterSkip = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
          if (!modalAfterSkip) {
            console.log('✅ Modal closed with Skip button');
          } else {
            console.log('❌ Modal still open after Skip button');
          }
        }
      }
      
    } else {
      console.log('✅ No modal automatically visible');
      
      // Look for tour button
      console.log('🔍 Looking for tour button...');
      const tourButton = await page.$('button:has-text("🎯Tour"), button:has-text("Tour")');
      
      if (tourButton) {
        console.log('✅ Tour button found, testing click...');
        await tourButton.click();
        await page.waitForTimeout(1000);
        
        const modalAfterClick = await page.$('.fixed.inset-0.bg-black.bg-opacity-60');
        if (modalAfterClick) {
          console.log('✅ Modal appeared after button click');
        } else {
          console.log('❌ Modal did not appear after button click');
        }
      } else {
        console.log('❌ Tour button not found');
      }
    }
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/tour-modal-final-debug.png', fullPage: true });
    console.log('📸 Final debug screenshot saved');
  });
});
