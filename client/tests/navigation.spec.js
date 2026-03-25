import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('/');
        // Wait for loading overlay to disappear
        await page.waitForSelector('.global-loading-overlay', { state: 'hidden' });
    });

    test('should navigate to bags page', async({ page }) => {
        // Click on category dropdown button
        await page.click('button[data-bs-toggle="dropdown"]');
        
        // Click on bags link
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);
        expect(page.url()).toContain('bags');
    });

    test('should navigate to clothing page', async({ page }) => {
        // Click on category dropdown button
        await page.click('button[data-bs-toggle="dropdown"]');
        
        // Click on clothing link
        await page.click('a[href*="clothing"]');
        await page.waitForURL(/clothing/);
        expect(page.url()).toContain('clothing');
    });

    test('should navigate to electronics page', async({ page }) => {
        // Click on category dropdown button
        await page.click('button[data-bs-toggle="dropdown"]');
        
        // Click on electronics link
        await page.click('a[href*="electronics"]');
        await page.waitForURL(/electronics/);
        expect(page.url()).toContain('electronics');
    });

    test('should navigate to grocery page', async({ page }) => {
        // Navigate to a different page first
        await page.click('button[data-bs-toggle="dropdown"]');
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);
        
        // Click on category dropdown button
        await page.click('button[data-bs-toggle="dropdown"]');
        
        // Click on grocery link (should go to home)
        await page.click('a[href="/"]');
        await page.waitForURL('/');
        expect(page.url()).toBe('http://localhost:5173/');
    });

    test('should go back to home when logo is clicked', async({ page }) => {
        // Navigate to different page first
        await page.click('button[data-bs-toggle="dropdown"]');
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);
        
        // Click logo/home link
        await page.click('a:has-text("LOGO")');
        await page.waitForURL('/');
        expect(page.url()).toBe('http://localhost:5173/');
    });
    
    test('should open shopping cart', async({ page }) => {
        // Look for cart button/icon
        const cartButton = page.locator('button[class*="cart"], [class*="Cart"]').first();
        if (await cartButton.isVisible()) {
            await cartButton.click();
            // Check if cart drawer/modal is visible
            const cartDrawer = page.locator('[class*="CartDrawer"], [class*="Drawer"]').first();
            await expect(cartDrawer).toBeVisible();
        }
    });
});