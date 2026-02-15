import { test, expect } from '@playwright/test';

test.describe('Multi-language (i18n)', () => {
  test.describe('English (default)', () => {
    test('landing page shows English content', async ({ page }) => {
      await page.goto('/en');
      await expect(page.locator('h1')).toContainText('Stop Late-Night Scrolling');
      await expect(page.locator('text=Your AI Sleep Coach')).toBeVisible();
    });

    test('login page shows English labels', async ({ page }) => {
      await page.goto('/en/login');
      await expect(page.locator('text=Log In').first()).toBeVisible();
      await expect(page.locator('text=Email')).toBeVisible();
      await expect(page.locator('text=Password').first()).toBeVisible();
    });

    test('signup page shows English labels', async ({ page }) => {
      await page.goto('/en/signup');
      await expect(page.locator('text=Sign Up').first()).toBeVisible();
      await expect(page.locator('text=Confirm Password')).toBeVisible();
    });
  });

  test.describe('Japanese', () => {
    test('landing page shows Japanese content', async ({ page }) => {
      await page.goto('/ja');
      await expect(page.locator('h1')).toContainText('深夜スマホをやめよう');
      await expect(page.locator('h3').filter({ hasText: 'AIスリープコーチ' })).toBeVisible();
    });

    test('login page shows Japanese labels', async ({ page }) => {
      await page.goto('/ja/login');
      await expect(page.locator('text=ログイン').first()).toBeVisible();
      await expect(page.locator('text=メールアドレス')).toBeVisible();
      await expect(page.locator('text=パスワード').first()).toBeVisible();
    });

    test('signup page shows Japanese labels', async ({ page }) => {
      await page.goto('/ja/signup');
      await expect(page.locator('text=新規登録').first()).toBeVisible();
      await expect(page.locator('text=パスワード確認')).toBeVisible();
    });

    test('onboarding shows Japanese content', async ({ page }) => {
      await page.goto('/ja/onboarding');
      await expect(page.locator('text=SleepGuardへようこそ')).toBeVisible();
      await expect(page.locator('text=始めよう！')).toBeVisible();
    });
  });

  test.describe('Chinese', () => {
    test('landing page shows Chinese content', async ({ page }) => {
      await page.goto('/zh');
      await expect(page.locator('h1')).toContainText('告别深夜刷手机');
      await expect(page.locator('h3').filter({ hasText: 'AI睡眠教练' })).toBeVisible();
    });

    test('login page shows Chinese labels', async ({ page }) => {
      await page.goto('/zh/login');
      await expect(page.locator('text=登录').first()).toBeVisible();
      await expect(page.locator('text=邮箱')).toBeVisible();
      await expect(page.locator('text=密码').first()).toBeVisible();
    });

    test('signup page shows Chinese labels', async ({ page }) => {
      await page.goto('/zh/signup');
      await expect(page.locator('text=注册').first()).toBeVisible();
      await expect(page.locator('text=确认密码')).toBeVisible();
    });

    test('onboarding shows Chinese content', async ({ page }) => {
      await page.goto('/zh/onboarding');
      await expect(page.locator('text=欢迎来到SleepGuard')).toBeVisible();
      await expect(page.locator('text=开始吧！')).toBeVisible();
    });
  });

  test.describe('Korean', () => {
    test('landing page shows Korean content', async ({ page }) => {
      await page.goto('/ko');
      await expect(page.locator('h1')).toContainText('늦은 밤 스마트폰 그만');
      await expect(page.locator('h3').filter({ hasText: 'AI 수면 코치' })).toBeVisible();
    });

    test('login page shows Korean labels', async ({ page }) => {
      await page.goto('/ko/login');
      await expect(page.locator('text=로그인').first()).toBeVisible();
      await expect(page.locator('text=이메일')).toBeVisible();
      await expect(page.locator('text=비밀번호').first()).toBeVisible();
    });

    test('signup page shows Korean labels', async ({ page }) => {
      await page.goto('/ko/signup');
      await expect(page.locator('text=회원가입').first()).toBeVisible();
      await expect(page.locator('text=비밀번호 확인')).toBeVisible();
    });

    test('onboarding shows Korean content', async ({ page }) => {
      await page.goto('/ko/onboarding');
      await expect(page.locator('text=SleepGuard에 오신 것을 환영합니다')).toBeVisible();
      await expect(page.locator('text=시작하기!')).toBeVisible();
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
