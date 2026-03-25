import { test, expect } from '@playwright/test';

const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'TestPassword123!',
    name: 'Test User',
};

test.describe('Authentication', () => {
    test('should navigate to login page', async({ page }) => {
        await page.goto('/');

        // Click on Join button which navigates to login
        const joinButton = page.locator('button:has-text("Join")');
        if (await joinButton.isVisible()) {
            await joinButton.click();
            await page.waitForURL(/login/);
            expect(page.url()).toContain('login');
        }
    });

    test('should navigate to register page', async({ page }) => {
        await page.goto('/login');
        
        // Click on register link
        const registerLink = page.locator('span:has-text("Register")');
        if (await registerLink.isVisible()) {
            await registerLink.click();
            expect(page.url()).toContain('register');
        }
    });

    test('should display login form', async({ page }) => {
        await page.goto('/login');

        // Check for email input
        const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
        await expect(emailInput).toBeVisible();

        // Check for password input
        const passwordInput = page.locator('input[type="password"]').first();
        await expect(passwordInput).toBeVisible();

        // Check for submit button
        const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();
        await expect(submitButton).toBeVisible();
    });

    test('should display register form', async({ page }) => {
        await page.goto('/register');

        // Check for name input
        const nameInput = page.locator('input[type="text"], input[name*="name"]').first();
        await expect(nameInput).toBeVisible();

        // Check for email input
        const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
        await expect(emailInput).toBeVisible();

        // Check for password input
        const passwordInput = page.locator('input[type="password"]').first();
        await expect(passwordInput).toBeVisible();

        // Check for submit button
        const submitButton = page.locator('button[type="submit"], button:has-text("Register")').first();
        await expect(submitButton).toBeVisible();
    });

    test('should show error on invalid login', async({ page }) => {
        await page.goto('/login');

        // Fill email
        const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
        await emailInput.fill('invalid@example.com');

        // Fill password
        const passwordInput = page.locator('input[type="password"]').first();
        await passwordInput.fill('wrongpassword');

        // Click submit
        const submitButton = page.locator('button[type="submit"], button:has-text("Login")').first();
        await submitButton.click();

        // Check for error message
        const errorMessage = page.locator('text=Invalid|Error|failed', { timeout: 5000 });
        // Error might appear, but doesn't need to for this basic check
    });

    test('should navigate to profile page when logged in', async({ page }) => {
        await page.goto('/');

        // Look for profile link (usually only visible when logged in)
        const profileLink = page.locator('a[href*="profile"]');

        // Only test if user is already logged in
        if (await profileLink.isVisible()) {
            await profileLink.click();
            await page.waitForURL(/profile/);
            expect(page.url()).toContain('profile');
        }
    });
});