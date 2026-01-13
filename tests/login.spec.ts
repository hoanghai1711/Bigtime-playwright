
import { config } from 'dotenv';
import { LoginPage } from '../page/LoginPage'; 
    import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import Config from '../Utils/configUtils';

   test.describe.serial('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {

    allure.feature('Login Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.only('Login Successful With Valid Credentials - Đăng nhập thành công với tài khoản admin', async () => {
    allure.story('Valid Admin Login Story');

    await allure.step('Login with admin account', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
    });

    await allure.step('Verify successful admin login - Kiểm tra đăng nhập thành công với tài khoản admin', async () => {
      await loginPage.expectLoginSuccess();
    });
  });

  test('Login Successful With Employee Account - Đăng nhập thành công với tài khoản nhân viên', async () => {
    allure.story('Valid Employee Login Story');

    await allure.step('Login with employee account', async () => {
      await loginPage.login(Config.employee_username, Config.employee_password);
    });

    await allure.step('Verify successful employee login - Kiểm tra đăng nhập thành công với tài khoản nhân viên', async () => {
      await loginPage.expectLoginSuccess();
    });
  });

  test('Login Unsuccessful With Invalid Credentials - Đăng nhập thất bại với tài khoản không tồn tại', async () => {
    allure.story('Invalid Login Story');

    await allure.step('Login with invalid credentials', async () => {
      await loginPage.login('admin@bigapptech.vn', '123456');
    });

    await allure.step('Verify login failure message', async () => {
      await loginPage.expectLoginError();
    });
  });

  test('Login Unsuccessful With Empty Credentials - Đăng nhập thất bại với tài khoản và mật khẩu rỗng', async () => {
    allure.story('Empty Login Story');

    await allure.step('Login with empty credentials', async () => {
      await loginPage.login('', '');
    });

    await allure.step('Verify login failure message', async () => {
      await loginPage.expectUsernameValidate();
      await loginPage.expectPasswordValidate();
    });
  });

  test('Login Unsuccessful With Empty Username - Đăng nhập thất bại với tài khoản rỗng', async () => {
    allure.story('Empty Username Login Story');

    await allure.step('Login with empty username', async () => {
      await loginPage.login('', Config.admin_password);
    });

    await allure.step('Verify login failure message - Kiểm tra thông báo lỗi khi đăng nhập với tài khoản rỗng', async () => {
      await loginPage.expectUsernameValidate();
    });
  });

  test('Login Unsuccessful With Empty Password - Đăng nhập thất bại với mật khẩu rỗng', async () => {
    allure.story('Empty Password Login Story');

    await allure.step('Login with empty password', async () => {
      await loginPage.login(Config.admin_username, '');
    });

    await allure.step('Verify login failure message', async () => {
      await loginPage.expectPasswordValidate();
    });
  });

  test('Login with locked account - Đăng nhập thất bại với tài khoản bị khóa', async () => {
    allure.story('Locked Account Login Story');

    await allure.step('Login with locked account', async () => {
      await loginPage.login('AccountIsLocked@gmail.com', '123456');
      await loginPage.expectAccountLockedValidate();
    });
  });

  test('Login Unsuccessful With Invalid Username - Đăng nhập thất bại với tài khoản không tồn tại', async () => {
    allure.story('Invalid Username Login Story');

    await allure.step('Login with invalid username', async () => {
      await loginPage.login('admin@bigapptech.vn', Config.admin_password);
    });

    await allure.step('Verify login failure message', async () => {
      await loginPage.expectLoginError();
    });
  });

  test('Login Unsuccessful With Invalid Password - Đăng nhập thất bại với mật khẩu không chính xác', async () => {
    allure.story('Invalid Password Login Story');

    await allure.step('Login with invalid password', async () => {
      await loginPage.login(Config.admin_username, 'asfasfasfas');
    });

    await allure.step('Verify login failure message - Kiểm tra thông báo lỗi khi đăng nhập với mật khẩu không chính xác', async () => {
      await loginPage.expectLoginError();
    });
  });
});
