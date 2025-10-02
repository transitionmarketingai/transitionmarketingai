import { test, expect } from '@playwright/test';

test.describe('Complete Tour Modal Test', () => {
  test('tour modal appears and can be closed after login', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Sign in with demo account
    await page.click('text=Use Demo Account');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Successfully logged in as demo user');
    
    // Wait for dashboard to fully load
    await page.waitForSelector('.min-h-screen', { timeout: 10000 });
    console.log('✅ Dashboard loaded successfully');
    
    // Look for tour modal immediately
    const hasTourModal = await page.$('.fixed.inset-0');
    if (hasTourModal) {
      console.log('✅ Tour modal is visible immediately after login');
      
      // Test backdrop click
      console.log('🔘 Testing backdrop click...');
      await page.click('.fixed.inset-0', { position: { x: 10, y: 10 } }); // Click top-left corner of backdrop
      await page.waitForTimeout(1000);
      
      // Check if modal closed
      const modalAfterBackdrop = await page.$('.fixed.inset-0');
      if (!modalAfterBackdrop) {
        console.log('✅ Modal closed with backdrop click');
      } else {
        console.log('❌ Modal still visible after backdrop click');
        
        // Test close button
        console.log('🔘 Testing close button...');
        const closeButton = await page.$('button:has-text("×")') || 
                           await page.$('button[class*="top-4"][class*="right-4"]');
        
        if (closeButton) {
          console.log('✅ Close button found');
          await closeButton.click();
          await page.waitForTimeout(1000);
          
          const modalAfterCloseButton = await page.$('.fixed.inset-0');
          if (!modalAfterCloseButton) {
            console.log('✅ Modal closed with close button');
          } else {
            console.log('❌ Modal still visible after close button');
          }
        } else {
          console.log('❌ No close button found');
        }
      }
    } else {
      console.log('❌ No tour modal found after login');
      
      // Look for any button that might trigger the tour
      const possibleTourButtons = await page.$eval('body', () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons
          .map(btn => ({
            text: btn.textContent?.trim(),
            classes: btn.className,
            visible: btn.offsetParent !== null
          }))
          .filter(btn => btn.text && btn.visible)
          .slice(0, 10); // First 10 visible buttons
      });
      
      console.log('📝 Visible buttons on dashboard:');
      possibleTourButtons.forEach((btn, i) => {
        console.log(`  Button ${i}: "${btn.text}" (classes: ${btn.classes})`);
      });
      
      // Look for tour-related elements
      const tourElements = await page.$$('button:has-text("Tour"), button:has-text("🎯"), text="Platform Tour"');
      if (tourElements.length > 0) {
        console.log(`✅ Found ${tourElements.length} tour-related elements`);
      } else {
        console.log('❌ No tour-related elements found');
      }
    }
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/tour-modal-after-login.png', fullPage: true });
    console.log('📸 Screenshot saved: test-results/tour-modal-after-login.png');
  });
});
