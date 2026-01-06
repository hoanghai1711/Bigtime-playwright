import { test } from '@playwright/test';
import { LoginPage } from '../../page/LoginPage';
import { LeaveManagementPage } from '../../page/leave/leave-managementPage';
import { ToastPage } from '../../page/toastPage';
import { allure } from 'allure-playwright';
import { LeaveApplication } from '../../page/leave/leave-applicationPage';

test.describe.serial('Leave Management', () => {
  let loginPage: LoginPage;
  let leaveManagementPage: LeaveManagementPage;
  let toastPage: ToastPage;
  let leaveApplication: LeaveApplication;
  test.beforeEach(async ({ page }) => {
    allure.feature('Leave Management Feature');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    leaveManagementPage = new LeaveManagementPage(page);
    toastPage = new ToastPage(page);
    leaveApplication = new LeaveApplication(page);
    await allure.step('Login hệ thống', async () => {
      await loginPage.goto();
      await loginPage.login('info@bigapptech.vn', '12345678@Bat');
      await page.waitForTimeout(2000);
    });
  });
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;

      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
    }
  });

  

});