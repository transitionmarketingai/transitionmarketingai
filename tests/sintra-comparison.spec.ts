import { test, expect } from '@playwright/test';

test.describe('Sintra.ai Hero Section Comparison', () => {
  test('should capture current hero section for comparison', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of current hero section
    await page.screenshot({ 
      path: 'test-results/current-hero-section.png',
      fullPage: true 
    });
    
    // Take screenshot of just the hero section
    const heroSection = page.locator('section').first();
    await heroSection.screenshot({ 
      path: 'test-results/current-hero-only.png' 
    });
    
    // Analyze current layout
    const heroSectionBox = await heroSection.boundingBox();
    console.log('Current hero section dimensions:', heroSectionBox);
    
    // Check text content
    const headline = page.locator('h1').first();
    const headlineText = await headline.textContent();
    console.log('Current headline:', headlineText);
    
    // Check mascot presence
    const mascot = page.locator('.bg-gradient-to-br.from-amber-50.to-amber-100');
    const mascotVisible = await mascot.isVisible();
    console.log('Mascot visible:', mascotVisible);
    
    // Check layout structure
    const gridLayout = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2');
    const gridVisible = await gridLayout.isVisible();
    console.log('Grid layout visible:', gridVisible);
  });

  test('should analyze spacing and proportions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check hero section height
    const heroSection = page.locator('section').first();
    const heroHeight = await heroSection.evaluate(el => el.offsetHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    console.log('Hero section height:', heroHeight);
    console.log('Viewport height:', viewportHeight);
    console.log('Hero fills viewport:', heroHeight >= viewportHeight * 0.8);
    
    // Check text positioning
    const leftColumn = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2 > div').first();
    const rightColumn = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2 > div').last();
    
    const leftBox = await leftColumn.boundingBox();
    const rightBox = await rightColumn.boundingBox();
    
    console.log('Left column position:', leftBox);
    console.log('Right column position:', rightBox);
    
    // Check if columns are properly aligned
    if (leftBox && rightBox) {
      const verticalAlignment = Math.abs(leftBox.y - rightBox.y);
      console.log('Vertical alignment difference:', verticalAlignment);
    }
  });

  test('should check typography and visual hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check headline styling
    const headline = page.locator('h1').first();
    const headlineStyles = await headline.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        color: styles.color,
        marginBottom: styles.marginBottom
      };
    });
    
    console.log('Headline styles:', headlineStyles);
    
    // Check subheadline
    const subheadline = page.locator('p').first();
    const subheadlineStyles = await subheadline.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        marginBottom: styles.marginBottom
      };
    });
    
    console.log('Subheadline styles:', subheadlineStyles);
    
    // Check button styling
    const primaryButton = page.locator('a[href="/get-started"]').first();
    const buttonStyles = await primaryButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        padding: styles.padding,
        borderRadius: styles.borderRadius,
        backgroundColor: styles.backgroundColor
      };
    });
    
    console.log('Primary button styles:', buttonStyles);
  });

  test('should analyze mascot design and positioning', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check mascot container
    const mascotContainer = page.locator('.relative.w-96.h-96, .relative.w-\\[500px\\].h-\\[500px\\]');
    const containerVisible = await mascotContainer.isVisible();
    console.log('Mascot container visible:', containerVisible);
    
    if (containerVisible) {
      const containerBox = await mascotContainer.boundingBox();
      console.log('Mascot container dimensions:', containerBox);
      
      // Check mascot character
      const mascotBody = page.locator('.absolute.bottom-0.left-1\\/2.transform.-translate-x-1\\/2.w-24.h-32.bg-gradient-to-b.from-cyan-400.to-blue-500');
      const bodyVisible = await mascotBody.isVisible();
      console.log('Mascot body visible:', bodyVisible);
      
      if (bodyVisible) {
        const bodyBox = await mascotBody.boundingBox();
        console.log('Mascot body dimensions:', bodyBox);
      }
      
      // Check background environment
      const background = page.locator('.bg-gradient-to-br.from-amber-50.to-amber-100');
      const backgroundVisible = await background.isVisible();
      console.log('Background environment visible:', backgroundVisible);
    }
  });
});
