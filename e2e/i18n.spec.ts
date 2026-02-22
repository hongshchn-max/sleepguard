import { test, expect } from '@playwright/test';

test.describe('Multi-language (i18n)', () => {
  test.describe('English (default)', () => {
    test('landing page shows English content', async ({ page }) => {
      await page.goto('/en');
      await expect(page.locator('h1')).toContainText('The Space Between Waking and Dreaming');
      await expect(page.locator('text=Luna waits at the threshold')).toBeVisible();
    });

    test('login page shows English labels', async ({ page }) => {
      await page.goto('/en/login');
      await expect(page.locator('text=Return to the threshold').first()).toBeVisible();
      await expect(page.locator('text=Email')).toBeVisible();
      await expect(page.locator('text=Passphrase').first()).toBeVisible();
    });

    test('signup page shows English labels', async ({ page }) => {
      await page.goto('/en/signup');
      await expect(page.locator('text=Cross for the first time').first()).toBeVisible();
      await expect(page.locator('text=Confirm passphrase')).toBeVisible();
    });
  });

  test.describe('Japanese', () => {
    test('landing page shows Japanese content', async ({ page }) => {
      await page.goto('/ja');
      await expect(page.locator('h1')).toContainText('覚醒と夢のあわいに');
      await expect(page.locator('text=闇の中の案内人')).toBeVisible();
    });

    test('login page shows Japanese labels', async ({ page }) => {
      await page.goto('/ja/login');
      await expect(page.locator('text=境界に還る').first()).toBeVisible();
      await expect(page.locator('text=メールアドレス')).toBeVisible();
      await expect(page.locator('text=合言葉').first()).toBeVisible();
    });

    test('signup page shows Japanese labels', async ({ page }) => {
      await page.goto('/ja/signup');
      await expect(page.locator('text=初めて越える').first()).toBeVisible();
      await expect(page.locator('text=合言葉の確認')).toBeVisible();
    });

    test('onboarding shows Japanese content', async ({ page }) => {
      await page.goto('/ja/onboarding');
      await expect(page.locator('text=Dormivegliaへようこそ')).toBeVisible();
      await expect(page.locator('text=境界を越える')).toBeVisible();
    });
  });

  test.describe('Chinese', () => {
    test('landing page shows Chinese content', async ({ page }) => {
      await page.goto('/zh');
      await expect(page.locator('h1')).toContainText('清醒与梦境之间的空隙');
      await expect(page.locator('text=暗中的引路人')).toBeVisible();
    });

    test('login page shows Chinese labels', async ({ page }) => {
      await page.goto('/zh/login');
      await expect(page.locator('text=回到界域').first()).toBeVisible();
      await expect(page.locator('text=邮箱')).toBeVisible();
      await expect(page.locator('text=暗语').first()).toBeVisible();
    });

    test('signup page shows Chinese labels', async ({ page }) => {
      await page.goto('/zh/signup');
      await expect(page.locator('text=首次跨越').first()).toBeVisible();
      await expect(page.locator('text=确认暗语')).toBeVisible();
    });

    test('onboarding shows Chinese content', async ({ page }) => {
      await page.goto('/zh/onboarding');
      await expect(page.locator('text=欢迎来到Dormiveglia')).toBeVisible();
      await expect(page.locator('text=跨越界域')).toBeVisible();
    });
  });

  test.describe('Korean', () => {
    test('landing page shows Korean content', async ({ page }) => {
      await page.goto('/ko');
      await expect(page.locator('h1')).toContainText('깨어남과 꿈 사이의 공간');
      await expect(page.locator('text=어둠 속의 안내인')).toBeVisible();
    });

    test('login page shows Korean labels', async ({ page }) => {
      await page.goto('/ko/login');
      await expect(page.locator('text=경계로 돌아가기').first()).toBeVisible();
      await expect(page.locator('text=이메일')).toBeVisible();
      await expect(page.locator('text=암호').first()).toBeVisible();
    });

    test('signup page shows Korean labels', async ({ page }) => {
      await page.goto('/ko/signup');
      await expect(page.locator('text=처음으로 건너기').first()).toBeVisible();
      await expect(page.locator('text=암호 확인')).toBeVisible();
    });

    test('onboarding shows Korean content', async ({ page }) => {
      await page.goto('/ko/onboarding');
      await expect(page.locator('text=Dormiveglia에 오신 것을 환영합니다')).toBeVisible();
      await expect(page.locator('text=경계를 넘다')).toBeVisible();
    });
  });

  test.describe('Locale routing', () => {
    test('root redirects to default locale', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      expect(page.url()).toMatch(/\/(en|ja|zh|ko)/);
    });

    test('each locale URL returns 200', async ({ request }) => {
      for (const locale of ['en', 'ja', 'zh', 'ko']) {
        const response = await request.get(`/${locale}`);
        expect(response.status()).toBe(200);
      }
    });

    test('each locale login page returns 200', async ({ request }) => {
      for (const locale of ['en', 'ja', 'zh', 'ko']) {
        const response = await request.get(`/${locale}/login`);
        expect(response.status()).toBe(200);
      }
    });

    test('HTML lang attribute matches locale', async ({ page }) => {
      await page.goto('/ja');
      await expect(page.locator('html')).toHaveAttribute('lang', 'ja');

      await page.goto('/ko');
      await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
    });
  });

  test.describe('Cross-locale navigation', () => {
    test('signup link preserves locale in Japanese', async ({ page }) => {
      await page.goto('/ja');
      await page.locator('a[href*="/signup"]').first().click();
      await page.waitForURL('**/signup');
      expect(page.url()).toContain('/ja/signup');
    });

    test('signup link preserves locale in Chinese', async ({ page }) => {
      await page.goto('/zh');
      await page.locator('a[href*="/signup"]').first().click();
      await page.waitForURL('**/signup');
      expect(page.url()).toContain('/zh/signup');
    });

    test('login link preserves locale in Korean', async ({ page }) => {
      await page.goto('/ko/signup');
      await page.locator('a[href*="/login"]').click();
      await page.waitForURL('**/login');
      expect(page.url()).toContain('/ko/login');
    });
  });
});
