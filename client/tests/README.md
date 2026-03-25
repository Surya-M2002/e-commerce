# Playwright E2E Tests

This directory contains end-to-end tests for the e-commerce application using [Playwright](https://playwright.dev/).

## Setup

Install dependencies:

```bash
npm install
```

## Running Tests

### Run all tests

```bash
npm run test:e2e
```

### Run tests with UI (recommended for development)

```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see the browser)

```bash
npm run test:e2e:headed
```

### Debug tests

```bash
npm run test:e2e:debug
```

### Run specific test file

```bash
npx playwright test tests/example.spec.js
```

### Run tests matching a pattern

```bash
npx playwright test -g "should load the homepage"
```

## Test Files

- **example.spec.js** - Basic homepage tests including responsive design
- **navigation.spec.js** - Navigation between different category pages
- **cart.spec.js** - Shopping cart functionality tests
- **auth.spec.js** - Authentication and user profile tests

## Configuration

The Playwright configuration is in `playwright.config.js`. Key settings:

- **baseURL**: http://localhost:5173 (your dev server)
- **webServer**: Automatically starts your dev server before tests
- **browsers**: Chromium, Firefox, and WebKit
- **mobile**: Tests on Pixel 5 and iPhone 12 viewports
- **reporter**: HTML report generated after test run

## Writing New Tests

1. Create a new file in the `tests/` directory with `.spec.js` extension
2. Use the standard Playwright syntax:

```javascript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    // Your test code here
    await expect(page).toHaveTitle(/my-shop/i);
  });
});
```

## Best Practices

- Use `test.beforeEach()` to set up common tasks
- Use logical selectors: `a[href*="bags"]` instead of `.products-link`
- Add waits for navigation: `await page.waitForURL(/bags/)`
- Test user flows, not implementation details
- Keep tests isolated and independent
- Use meaningful test names

## Debugging

1. Use `--debug` flag to step through tests
2. Use `page.pause()` in test to pause execution
3. Check the HTML report: `npx playwright show-report`
4. Enable trace recording for failed tests (enabled by default)

## CI/CD Integration

For GitHub Actions or other CI systems, set the `CI` environment variable:

```bash
CI=true npm run test:e2e
```

This will:

- Retry failed tests twice
- Run tests sequentially
- Only use one worker
- Use headed: false for better CI performance

## Troubleshooting

### Tests fail with "page not found"

- Ensure dev server is running: `npm run dev`
- Check that baseURL in `playwright.config.js` matches your dev server

### Selectors not found

- Use `--debug` mode to inspect elements
- Check if the app uses different class names
- Update selectors in test files accordingly

### Timeout issues

- Increase timeout: `test.setTimeout(60000)`
- Check if the app is responding slowly
- Verify network connectivity

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
