import { test, expect } from '@playwright/test';

test.describe('UI/UX Design Analysis', () => {
  test('Capture homepage design', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'design-analysis/homepage-full.png', 
      fullPage: true 
    });
    
    // Capture viewport screenshot
    await page.screenshot({ 
      path: 'design-analysis/homepage-viewport.png' 
    });
    
    // Analyze color usage
    const colors = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const colorMap = new Map();
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;
        
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          colorMap.set(bgColor, (colorMap.get(bgColor) || 0) + 1);
        }
        if (textColor && textColor !== 'rgba(0, 0, 0, 0)') {
          colorMap.set(textColor, (colorMap.get(textColor) || 0) + 1);
        }
      });
      
      return Array.from(colorMap.entries()).sort((a, b) => b[1] - a[1]);
    });
    
    console.log('Color Analysis:', colors);
  });

  test('Capture dashboard design', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'design-analysis/dashboard-full.png', 
      fullPage: true 
    });
    
    // Capture viewport screenshot
    await page.screenshot({ 
      path: 'design-analysis/dashboard-viewport.png' 
    });
  });

  test('Capture onboarding design', async ({ page }) => {
    await page.goto('http://localhost:3000/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'design-analysis/onboarding-full.png', 
      fullPage: true 
    });
    
    // Capture viewport screenshot
    await page.screenshot({ 
      path: 'design-analysis/onboarding-viewport.png' 
    });
  });

  test('Analyze design elements', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Analyze gradients
    const gradients = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const gradientElements = [];
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgImage = styles.backgroundImage;
        
        if (bgImage && bgImage.includes('gradient')) {
          gradientElements.push({
            tagName: el.tagName,
            className: el.className,
            backgroundImage: bgImage,
            text: el.textContent?.substring(0, 50) || ''
          });
        }
      });
      
      return gradientElements;
    });
    
    console.log('Gradient Analysis:', gradients);
    
    // Analyze spacing and layout
    const layoutAnalysis = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const analysis = [];
      
      sections.forEach(section => {
        const styles = window.getComputedStyle(section);
        const rect = section.getBoundingClientRect();
        
        analysis.push({
          className: section.className,
          padding: styles.padding,
          margin: styles.margin,
          backgroundColor: styles.backgroundColor,
          height: rect.height,
          width: rect.width
        });
      });
      
      return analysis;
    });
    
    console.log('Layout Analysis:', layoutAnalysis);
  });
});
