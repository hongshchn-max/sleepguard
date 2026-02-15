import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  test.describe('Landing Page', () => {
    test('displays hero content and CTA', async ({ page }) => {
      await page.goto('/en');
      await expect(page.locator('h1')).toContainText('Stop Late-Night Scrolling');
      await expect(page.locator('a[href*="/signup"]').first()).toBeVisible();
    });

    test('CTA links to signup page', async ({ page }) => {
      await page.goto('/en');
      await page.locator('a[href*="/signup"]').first().click();
      await page.waitForURL('**/signup');
      await expect(page).toHaveURL(/\/en\/signup/);
    });
  });

  test.describe('Login Page', () => {
    test('renders login form with all fields', async ({ page }) => {
      await page.goto('/en/login');
      await expect(page.locator('h1')).toContainText('SleepGuard');
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toContainText('Log In');
    });

    test('shows link to signup page', async ({ page }) => {
      await page.goto('/en/login');
      const signupLink = page.locator('a[href*="/signup"]');
      await expect(signupLink).toContainText('Sign Up');
      await signupLink.click();
      await page.waitForURL('**/signup');
      await expect(page).toHaveURL(/\/en\/signup/);
    });

    test('shows error on invalid credentials', async ({ page }) => {
      await page.goto('/en/login');
      await page.locator('input[type="email"]').fill('invalid@test.example.com');
      await page.locator('input[type="password"]').fill('wrongpassword123');
      await page.locator('button[type="submit"]').click();
      await expect(page.locator('.bg-red-500\\/10')).toBeVisible({ timeout: 10000 });
    });

    test('shows loading state on submit', async ({ page }) => {
      await page.goto('/en/login');
      await page.locator('input[type="email"]').fill('test@example.com');
      await page.locator('input[type="password"]').fill('password123');
      await page.locator('button[type="submit"]').click();
      await expect(page.locator('button[type="submit"]')).toContainText('...');
    });
  });

  test.describe('Signup Page', () => {
    test('renders signup form with all fields', async ({ page }) => {
      await page.goto('/en/signup');
      await expect(page.locator('h1')).toContainText('SleepGuard');
      await expect(page.locator('input[type="email"]')).toBeVisible();
      const passwordFields = page.locator('input[type="password"]');
      await expect(passwordFields).toHaveCount(2);
      await expect(page.locator('button[type="submit"]')).toContainText('Sign Up');
    });

    test('shows link to login page', async ({ page }) => {
      await page.goto('/en/signup');
      const loginLink = page.locator('a[href*="/login"]');
      await expect(loginLink).toContainText('Log In');
      await loginLink.click();
      await page.waitForURL('**/login');
      await expect(page).toHaveURL(/\/en\/login/);
    });

    test('shows error when passwords do not match', async ({ page }) => {
      await page.goto('/en/signup');
      await page.locator('input[type="email"]').fill('test@example.com');
      const passwordFields = page.locator('input[type="password"]');
      await passwordFields.nth(0).fill('password123');
      await passwordFields.nth(1).fill('differentpassword');
      await page.locator('button[type="submit"]').click();
      await expect(page.locator('.bg-red-500\\/10')).toContainText('Passwords do not match');
    });

    test('enforces minimum password length via HTML validation', async ({ page }) => {
      await page.goto('/en/signup');
      const passwordField = page.locator('input[type="password"]').first();
      await expect(passwordField).toHaveAttribute('minLength', '6');
    });
  });

  test.describe('Onboarding Page', () => {
    test('renders welcome step with progress dots', async ({ page }) => {
      await page.goto('/en/onboarding');
      await expect(page.locator('text=Welcome to SleepGuard')).toBeVisible();
      await expect(page.locator('text=Let\'s Go!')).toBeVisible();
      // 3 progress dots
      const dots = page.locator('.rounded-full.h-2.w-2');
      await expect(dots).toHaveCount(3);
    });

    test('navigates through onboarding steps', async ({ page }) => {
      await page.goto('/en/onboarding');

      // Step 0: Welcome
      await expect(page.locator('text=Welcome to SleepGuard')).toBeVisible();
      await page.locator('text=Let\'s Go!').click();

      // Step 1: Time selection
      await expect(page.locator('text=What time do you want to go to bed?')).toBeVisible();
      await expect(page.locator('text=What time do you want to wake up?')).toBeVisible();
      const timeInputs = page.locator('input[type="time"]');
      await expect(timeInputs).toHaveCount(2);
      await expect(timeInputs.first()).toHaveValue('23:00');
      await expect(timeInputs.last()).toHaveValue('07:00');

      // Navigate to step 2
      await page.locator('text=Next').click();

      // Step 2: Personality selection
      await expect(page.locator('text=Choose your coach personality')).toBeVisible();
      await expect(page.locator('text=Gentle')).toBeVisible();
      await expect(page.locator('text=Strict')).toBeVisible();
      await expect(page.locator('text=Humorous')).toBeVisible();
      await expect(page.locator('text=Scientific')).toBeVisible();
    });

    test('shows premium badge on humor and science personalities', async ({ page }) => {
      await page.goto('/en/onboarding');
      await page.locator('text=Let\'s Go!').click();
      await page.locator('text=Next').click();

      const premiumBadges = page.locator('text=Premium only');
      await expect(premiumBadges).toHaveCount(2);
    });

    test('can go back from step 1 to step 0', async ({ page }) => {
      await page.goto('/en/onboarding');
      await page.locator('text=Let\'s Go!').click();
      await expect(page.locator('text=What time do you want to go to bed?')).toBeVisible();
      await page.locator('text=Back').click();
      await expect(page.locator('text=Welcome to SleepGuard')).toBeVisible();
    });
  });
});
