import { test, expect } from '@playwright/test';

test.describe('Forgot Password Feature - FleetDrive360', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // uses baseURL from config
    await page.getByRole('link', { name: 'Forgot Password ?' }).click();
  });

  // 1. Verify Forgot Password page loads
  test('Verify Forgot Password page UI', async ({ page }) => {
    // await expect(page.getByRole('heading', { name: 'Forgot Password ?' })).toBeVisible();
    await expect (page.getByText('Forgot Password ?')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Reset Instruction' })).toBeVisible();
  });

  // 2. Required field validation
  test('Validate required field error', async ({ page }) => {
    await page.getByRole('button', { name: 'Send Reset Instruction' }).click();

    await expect(
      page.getByText('Email or username is required')
    ).toBeVisible();
  });

  // 3. Invalid email format
  test('Validate invalid email format', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid-email');

    await page.getByRole('button', { name: 'Send Reset Instruction' }).click();

    await expect(
      page.getByText('This email is not linked to your account,please enter the correct email')
    ).toBeVisible();
  });

  // 4. Email not linked to account
  test('Validate unregistered email error', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' })
      .fill('notregistered@test.com');

    await page.getByRole('button', { name: 'Send Reset Instruction' }).click();

    await expect(
      page.getByText('This email is not linked to')
    ).toBeVisible();
  });

  // 5. Successful reset request
  test('Validate successful reset instruction', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' })
      .fill('mlp8ls1cprws@ibymail.com'); // use valid email

    await page.getByRole('button', { name: 'Send Reset Instruction' }).click();

    await expect(
      page.getByText('Reset instructions sent successfully')
    ).toBeVisible();
  });

});
