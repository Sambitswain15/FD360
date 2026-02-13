/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',

  use: {
    baseURL: 'https://dev.fleetdrive360.com', // ✅ IMPORTANT
    // Run headed locally but force headless on CI runners
    headless: process.env.CI ? true : false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    // Do not attempt to open the HTML report on CI
    ['html', { open: process.env.CI ? 'never' : 'always' }]
  ],
};

module.exports = config;
