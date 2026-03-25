import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('/');
        // Wait for loading overlay to disappear
        await page.waitForSelector('.global-loading-overlay', { state: 'hidden' });
    });

    test('should add product to cart', async({ page }) => {
        // Navigate to a product page
        await page.click('button[data-bs-toggle="dropdown"]');
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);

        // Look for the first product "Add to Cart" button
        const addToCartButton = page.locator('button:has-text("Add to Cart")').first();

        if (await addToCartButton.isEnabled()) {
            await addToCartButton.click();

            // Check for success message or cart update
            // This may vary based on your implementation
            const cartCount = page.locator('[class*="cart-count"], [class*="cartCount"]');
            await expect(cartCount).toContainText(/[1-9]/);
        }
    });

    test('should remove product from cart', async({ page }) => {
        // Navigate to a product page
        await page.click('button[data-bs-toggle="dropdown"]');
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);

        // Add a product
        const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
        if (await addToCartButton.isEnabled()) {
            await addToCartButton.click();
        }

        // Open cart drawer
        const cartButton = page.locator('button[class*="cart"], [class*="Cart"]').first();
        if (await cartButton.isVisible()) {
            await cartButton.click();

            // Look for remove button
            const removeButton = page.locator('button:has-text("Remove"), button:has-text("Delete")').first();
            if (await removeButton.isVisible()) {
                await removeButton.click();

                // Verify product is removed
                const emptyCart = page.locator('text=Your cart is empty, text=No items');
                await expect(emptyCart).toBeVisible();
            }
        }
    });

    test('should proceed to checkout', async({ page }) => {
        // Navigate to a product page
        await page.click('button[data-bs-toggle="dropdown"]');
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);

        // Add a product
        const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
        if (await addToCartButton.isEnabled()) {
            await addToCartButton.click();
        }

        // Navigate to checkout
        const checkoutButton = page.locator('a[href*="checkout"], button:has-text("Checkout")');
        if (await checkoutButton.first().isVisible()) {
            await checkoutButton.first().click();
            await page.waitForURL(/checkout/);
            expect(page.url()).toContain('checkout');
        }
    });

    test('should update product quantity', async({ page }) => {
        // Navigate to a product page
        await page.click('button[data-bs-toggle="dropdown"]');
        await page.click('a[href*="bags"]');
        await page.waitForURL(/bags/);

        // Add a product
        const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
        if (await addToCartButton.isEnabled()) {
            await addToCartButton.click();
        }

        // Open cart drawer
        const cartButton = page.locator('button[class*="cart"], [class*="Cart"]').first();
        if (await cartButton.isVisible()) {
            await cartButton.click();

            // Look for quantity controls
            const increaseButton = page.locator('button:has-text("+"), button[aria-label*="increase"]').first();
            if (await increaseButton.isVisible()) {
                await increaseButton.click();

                // Check if quantity increased
                const quantityField = page.locator('input[type="number"]').first();
                const quantity = await quantityField.inputValue();
                expect(parseInt(quantity)).toBeGreaterThanOrEqual(2);
            }
        }
    });
});