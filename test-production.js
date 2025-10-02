const { chromium } = require('playwright');

async function testProduction() {
  console.log('🚀 Starting production site check...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Test 1: Check homepage transformation
    console.log('📄 Checking homepage transformation...');
    await page.goto('https://transitionmarketing.vercel.app');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for new lead generation focus
    const pageText = await page.textContent('body');
    console.log('Homepage contains:', pageText.includes('Complete AI Lead Generation Ecosystem') ? '✅' : '❌', 'Lead generation focus');
    console.log('PARA mentions:', pageText.includes('PARA') ? '❌' : '✅', '(should be absent)');
    console.log('Projects mentions:', pageText.includes('Projects') ? '❌' : '✅', '(should be absent)');
    console.log('Indian market content:', pageText.includes('Indian Market') ? '✅' : '❌');
    console.log('₹26 pricing:', pageText.includes('₹26') ? '✅' : '❌');
    
    // Test 2: Check demo dashboard
    console.log('\n🔐 Checking demo dashboard...');
    
    // Try to navigate to signin
    await page.click('text=Sign In');
    await page.waitForTimeout(2000);
    
    // Check current URL
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    if (currentUrl.includes('signin')) {
      // Try to login with demo credentials
      await page.fill('input[type="email"]', 'demo@transitionai.com');
      await page.fill('input[type="password"]', 'demo123');
      await page.click('button[type="submit"]');
      
      // Wait for redirect
      await page.waitForTimeout(5000);
      
      // Check dashboard content
      const dashboardText = await page.textContent('body');
      console.log('Dashboard PARA mentions:', dashboardText.includes('PARA') ? '❌' : '✅');
      console.log('Dashboard Projects mentions:', dashboardText.includes('Projects') ? '❌' : '✅');
      console.log('Dashboard lead generation content:', dashboardText.includes('AI Lead Generation') ? '✅' : '❌');
      console.log('Dashboard Industries content:', dashboardText.includes('Industry Templates') ? '✅' : '❌');
      
      console.log('Current dashboard URL:', page.url());
    } else {
      console.log('❌ Could not reach signin page');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

testProduction();
