import { test, expect } from '@playwright/test';

test.describe('Debug Layout Issues', () => {
  test('debug dashboard layout and visibility', async ({ page }) => {
    // Navigate and login
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    await page.click('text=Use Demo Account');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Logged in successfully');
    
    // Wait a bit for the page to fully load
    await page.waitForTimeout(2000);
    
    // Debug header rendering
    console.log('🔍 Checking for header elements...');
    
    // Check if header container exists
    const headerContainer = await page.$('.ml-56');
    if (headerContainer) {
      console.log('✅ Header container (.ml-56) found');
      
      // Check if it's visible
      const isVisible = await headerContainer.isVisible();
      console.log(`Header visibility: ${isVisible}`);
      
      // Check computed styles
      const computedStyle = await headerContainer.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          position: style.position,
          zIndex: style.zIndex,
          opacity: style.opacity,
          left: style.left,
          top: style.top,
          width: style.width,
          height: style.height,
          marginLeft: style.marginLeft,
          marginTop: style.marginTop,
          visibility: style.visibility
        };
      });
      console.log('📊 Header styles:', computedStyle);
      
    } else {
      console.log('❌ No header container (.ml-56) found');
    }
    
    // Check for sidebar
    const sidebar = await page.$('.fixed.w-56, .w-56, .sidebar');
    if (sidebar) {
      console.log('✅ Sidebar found');
      const sidebarVisible = await sidebar.isVisible();
      console.log(`Sidebar visibility: ${sidebarVisible}`);
    } else {
      console.log('❌ No sidebar found');
    }
    
    // Check for any elements with "Tour" text
    const tourElements = await page.$$eval('*', elements => {
      return elements
        .filter(el => el.textContent && el.textContent.includes('Tour'))
        .map(el => ({
          tagName: el.tagName,
          className: el.className,
          textContent: el.textContent?.trim(),
          visible: el.offsetParent !== null,
          styles: {
            display: window.getComputedStyle(el).display,
            opacity: window.getComputedStyle(el).opacity,
            visibility: window.getComputedStyle(el).visibility
          }
        }));
    });
    
    console.log(`🔍 Found ${tourElements.length} elements with "Tour" text:`, tourElements);
    
    // Check for any button elements
    const allButtons = await page.$$eval('button', buttons => {
      return buttons.map(btn => ({
        text: btn.textContent?.trim(),
        visible: btn.offsetParent !== null,
        className: btn.className,
        styles: {
          display: window.getComputedStyle(btn).display,
          opacity: window.getComputedStyle(btn).opacity,
          visibility: window.getComputedStyle(btn).visibility
        }
      }));
    });
    
    console.log(`📝 Found ${allButtons.length} buttons total:`, allButtons.slice(0, 5));
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/debug-layout.png', fullPage: true });
    console.log('📸 Debug screenshot saved');
  });
});
