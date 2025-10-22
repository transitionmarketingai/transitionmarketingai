import { test, expect } from '@playwright/test';

test.describe('Color Scheme Consistency Check', () => {
  test('Check homepage color scheme', async ({ page }) => {
    await page.goto('http://localhost:3001');
    
    // Take screenshot of homepage
    await page.screenshot({ path: 'screenshots/homepage-colors.png', fullPage: true });
    
    // Check for color consistency
    const heroSection = page.locator('section').first();
    const heroBackground = await heroSection.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    
    console.log('Hero section colors:', heroBackground);
    
    // Check button colors
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const buttonStyles = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor
        };
      });
      console.log(`Button ${i + 1} colors:`, buttonStyles);
    }
    
    // Check card colors
    const cards = page.locator('[class*="card"], .bg-white, .bg-gray');
    const cardCount = await cards.count();
    
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = cards.nth(i);
      const cardStyles = await card.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor
        };
      });
      console.log(`Card ${i + 1} colors:`, cardStyles);
    }
  });

  test('Check dashboard color scheme', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    
    // Click demo button
    await page.click('text=Try Demo');
    await page.waitForURL('**/dashboard?demo=true');
    
    // Take screenshot of dashboard
    await page.screenshot({ path: 'screenshots/dashboard-colors.png', fullPage: true });
    
    // Check header colors
    const header = page.locator('header');
    const headerStyles = await header.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor
      };
    });
    console.log('Header colors:', headerStyles);
    
    // Check stats cards
    const statsCards = page.locator('[class*="card"]');
    const statsCount = await statsCards.count();
    
    for (let i = 0; i < Math.min(statsCount, 4); i++) {
      const card = statsCards.nth(i);
      const cardStyles = await card.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor
        };
      });
      console.log(`Stats card ${i + 1} colors:`, cardStyles);
    }
  });

  test('Check features page color scheme', async ({ page }) => {
    await page.goto('http://localhost:3001/features');
    
    // Take screenshot of features page
    await page.screenshot({ path: 'screenshots/features-colors.png', fullPage: true });
    
    // Check navigation colors
    const nav = page.locator('nav');
    const navStyles = await nav.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor
      };
    });
    console.log('Navigation colors:', navStyles);
    
    // Check hero section
    const hero = page.locator('section').first();
    const heroStyles = await hero.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    console.log('Features hero colors:', heroStyles);
  });

  test('Check onboarding color scheme', async ({ page }) => {
    await page.goto('http://localhost:3001/onboarding');
    
    // Take screenshot of onboarding page
    await page.screenshot({ path: 'screenshots/onboarding-colors.png', fullPage: true });
    
    // Check step cards
    const stepCards = page.locator('[class*="card"]');
    const stepCount = await stepCards.count();
    
    for (let i = 0; i < Math.min(stepCount, 2); i++) {
      const card = stepCards.nth(i);
      const cardStyles = await card.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderColor: styles.borderColor
        };
      });
      console.log(`Onboarding step card ${i + 1} colors:`, cardStyles);
    }
  });
});
