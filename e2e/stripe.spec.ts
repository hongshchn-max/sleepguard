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
      await expect(page.getByText('one-time', { exact: true })).toBeVisible();
    });

    test('displays all 5 premium features', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('text=Unlimited AI conversations every night')).toBeVisible();
      await expect(page.locator('text=Humorous & Scientific coach personalities')).toBeVisible();
      await expect(page.locator('text=Monthly stats & sleep trends')).toBeVisible();
      await expect(page.locator('text=Full achievement badge collection')).toBeVisible();
      await expect(page.locator('text=Relaxing sleep sounds')).toBeVisible();
    });

    test('shows Buy Now button', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('button').filter({ hasText: 'Buy Now' })).toBeVisible();
    });

    test('shows money-back guarantee', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('text=30-day money-back guarantee')).toBeVisible();
    });

    test('shows Unlock Premium title', async ({ page }) => {
      await page.goto('/en/premium');
      if (page.url().includes('/login')) {
        test.skip();
        return;
      }
      await expect(page.locator('h1').filter({ hasText: 'Unlock Premium' })).toBeVisible();
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
