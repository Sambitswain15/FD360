/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',

  use: {
    baseURL: 'https://dev.fleetdrive360.com', // ✅ IMPORTANT
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', { open: 'always' }]
  ],
};

module.exports = config;
