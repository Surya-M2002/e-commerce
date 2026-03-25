import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('/');
        // Wait for loading overlay to disappear
        await page.waitForSelector('.global-loading-overlay', { state: 'hidden' });
    });

    test('should load the homepage', async({ page }) => {
        // Check if page title contains expected text
        await expect(page).toHaveTitle(/e-commerce/i);
    });

    test('should display the hero section', async({ page }) => {
        // Check for hero section visibility
        const hero = page.locator('[class*="hero"]');
        await expect(hero).toBeVisible();
    });

    test('should display navbar', async({ page }) => {
        const navbar = page.locator('nav').first();
        await expect(navbar).toBeVisible();
    });

    test('should display footer', async({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
    });

    test('should have responsive design for mobile', async({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Check if mobile navbar exists
        const mobileNav = page.locator('.pb-mobile-nav');
        await expect(mobileNav).toBeVisible();
    });
});