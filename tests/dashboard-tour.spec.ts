import { test, expect } from '@playwright/test';

test.describe('Dashboard Tour Modal', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local dashboard (using port 3001 as indicated by playwright)
    await page.goto('http://localhost:3001/dashboard');
    
    // Check if we need to sign in or if already authenticated
    await page.waitForLoadState('networkidle');
    
    // Try to sign in if needed
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await emailInput.fill('demo@transitionai.com');
      const passwordInput = await page.$('input[type="password"]');
      if (passwordInput) {
        await passwordInput.fill('demouser123');
        const submitButton = await page.$('button[type="submit"]');
        if (submitButton) {
          await submitButton.click();
          await page.waitForLoadState('networkidle');
        }
      }
    }
  });

  test('check dashboard and tour functionality', async ({ page }) => {
    // Take initial screenshot
    await page.screenshot({ path: 'test-results/initial-page.png', fullPage: true });
    
    // Check page content
    const pageContent = await page.textContent('body');
    console.log('Page contains:', pageContent?.slice(0, 200) + '...');
    
    // Check if dashboard is loaded by looking for key elements
    const possibleSelectors = [
      '.min-h-screen',
      '.bg-gray-50',
      'nav',
      'button',
      'div',
      'span'
    ];
    
    for (const selector of possibleSelectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        console.log(`✅ Found ${elements.length} elements with selector: ${selector}`);
        break;
      }
    }
    
    // Look for tour-related elements
    const tourElements = [
      'text=🎯',
      'text=Tour',
      '[class*="tour"]',
      '[data-testid*="tour"]',
      'button:has-text("Tour")',
      'button:has-text("🎯")'
    ];
    
    for (const selector of tourElements) {
      const element = await page.$(selector);
      if (element) {
        console.log(`✅ Found tour element: ${selector}`);
        
        // Try clicking it
        await element.click();
        await page.waitForTimeout(1000);
        
        // Check for modal
        const modalSelectors = [
          '[class*="fixed inset-0"]',
          '[class*="bg-black"]',
          '[class*="bg-opacity"]',
          '[class*="z-"]',
          '.modal',
          '[role="dialog"]'
        ];
        
        for (const modalSel of modalSelectors) {
          const modal = await page.$(modalSel);
          if (modal) {
            console.log(`✅ Found modal with selector: ${modalSel}`);
            await page.screenshot({ path: 'test-results/tour-modal-found.png', fullPage: true });
            
            // Try to close modal
            const closeBtns = [
              'text=×',
              'text=✕',
              '[aria-label*="close"]',
              '[aria-label*="Close"]',
              'button:has-text("Skip")',
              'button:has-text("Close")'
            ];
            
            for (const btnSel of closeBtns) {
              const closeBtn = await page.$(btnSel);
              if (closeBtn) {
                console.log(`✅ Found close button: ${btnSel}`);
                await closeBtn.click();
                await page.waitForTimeout(500);
                
                // Check if modal is gone
                const modalStillThere = await page.$(modalSel);
                if (!modalStillThere) {
                  console.log(`✅ Modal removed by ${btnSel}`);
                } else {
                  console.log(`❌ Modal still there after clicking ${btnSel}`);
                }
                break;
              }
            }
            
            // If modal is still there, try clicking backdrop
            const backdropModal = await page.$(modalSel);
            if (backdropModal) {
              console.log('⚠️ Trying backdrop click...');
              await page.click(modalSel, { position: { x: 50, y: 50 } });
              await page.waitForTimeout(500);
              
              const modalGone = await page.$(modalSel);
              if (!modalGone) {
                console.log('✅ Modal closed via backdrop click');
              } else {
                console.log('❌ Modal still visible after backdrop click');
              }
            }
            
            break;
          }
        }
        break;
      }
    }
    
    // Final screenshot
    await page.screenshot({ path: 'test-results/final-state.png', fullPage: true });
  });
});