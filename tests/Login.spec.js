const { test, expect } = require('@playwright/test');

test.describe('FD360 Login Scenarios', () => {

  // Runs before every test
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // uses baseURL
  });

  // VALID LOGIN
  test('Valid Login', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Username' }).fill('sambittest');
    await page.getByRole('textbox', { name: 'Password' }).fill('k7mLdXpuPz');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('button', { name: /ST sambit/i }))
      .toBeVisible();

    // Logout
    await page.getByRole('button', { name: /ST sambit/i }).click();
    await page.getByTitle('Logout').click();

    await expect(page.getByRole('button', { name: 'Login' }))
      .toBeVisible();
  });

  // INVALID LOGIN
  test('Invalid Login', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Username' }).fill('wronguser');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpass');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert')).toBeVisible();
  });

  // BLANK USERNAME
  test('Blank Username', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Password' }).fill('k7mLdXpuPz');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Username is required')).toBeVisible();
  });

  // BLANK PASSWORD
  test('Blank Password', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Username' }).fill('sambittest');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Password is required.')).toBeVisible();
  });

  // BOTH FIELDS BLANK
  test('Both Fields Blank', async ({ page }) => {

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required.')).toBeVisible();
  });

});


// ================= API TEST (Added at End) =================

test('Valid Login - API Validation', async ({ request }) => {

  const response = await request.post(
    'https://dev-api.fleetdrive360.com/api/account/token/',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username_or_email: 'sambittest',
        password: 'k7mLdXpuPz'
      }
    }
  );

  // ✅ Status validation
  expect(response.status()).toBe(200);

  // ✅ Body validation
  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.user).toBeDefined();
  expect(body.user.username).toBe('sambittest');
  expect(body.permission_set.routes).toContain('Dashboard');
  expect(body.subscription_status).toBe('exists');
});
