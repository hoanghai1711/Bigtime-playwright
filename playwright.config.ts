import { defineConfig, devices } from '@playwright/test';

const isHeadless = process.env.HEADLESS !== 'false';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 50000,
  

  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { open: 'never' }]
  ],
  globalSetup: require.resolve('./Utils/global-setup'),
  globalTeardown: require.resolve('./Utils/global-teardown'),


  use: {
    
    headless: false, // true run in headless mode. false run with browser window opened.
    viewport: null,
screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',  

    // headless: true, // 🔥 BẮT BUỘC CHO CI
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    // trace: 'on-first-retry',
    // actionTimeout: 10000,
      launchOptions: {
      args: ['--start-maximized',],
    },
  },

  projects: [
    {
      name: 'Chromium',
    },
    // {
    //   name: 'Edge',
    //   use: {
    //     channel: 'msedge',
    //     ...devices['Desktop Chrome'],
    //   },
    // },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});
