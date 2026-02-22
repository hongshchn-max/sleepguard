import { test, expect } from '@playwright/test';

test.describe('Stripe Payment', () => {
  test.describe('Premium Page', () => {
    test('renders premium page with pricing', async ({ page }) => {
      await page.goto('/en/premium');
      // May redirect to login if unauthenticated, or show premium content
      if (page.url().includes('/login')) {
        // Premium is behind auth - verify login page loads
        await expect(page.locator('input[type="email"]')).toBeVisible();
        return;
      }
      await expect(page.locator('text=$6.99')).toBeVisible();
      await expect(page.getByText('once', { exact: true })).toBeVisible();
    });

    test('displays all 5 premium features', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('text=Endless whispers with Luna each night')).toBeVisible();
      await expect(page.locator('text=The Trickster & The Oracle guides')).toBeVisible();
      await expect(page.locator('text=Moon visions & dream currents')).toBeVisible();
      await expect(page.locator('text=Complete sigil collection')).toBeVisible();
      await expect(page.locator('text=Ambient dreamscapes')).toBeVisible();
    });

    test('shows Awaken Now button', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('button').filter({ hasText: 'Awaken Now' })).toBeVisible();
    });

    test('shows return passage guarantee', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('text=30-night return passage guaranteed')).toBeVisible();
    });

    test('shows Become Lucid title', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('h1').filter({ hasText: 'Become Lucid' })).toBeVisible();
    });
  });

  test.describe('Stripe Checkout API', () => {
    test('returns 401 for unauthenticated checkout request', async ({ request }) => {
      const response = await request.post('/api/stripe/checkout');
      expect(response.status()).toBe(401);
    });
  });

  test.describe('Stripe Webhook API', () => {
    test('returns 400 for request without valid signature', async ({ request }) => {
      const response = await request.post('/api/stripe/webhook', {
        headers: { 'Content-Type': 'application/json', 'stripe-signature': 'invalid' },
        data: { type: 'checkout.session.completed' },
      });
      expect(response.status()).toBe(400);
    });
  });
});
