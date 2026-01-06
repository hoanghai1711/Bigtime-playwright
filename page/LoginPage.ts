import { Page, Locator, expect } from '@playwright/test';
import Config from '../Utils/configUtils';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {

  readonly USERNAME_INPUT: Locator;
  readonly PASSWORD_INPUT: Locator;
  readonly LOGIN_BUTTON: Locator;
  readonly PROFILE_BADGE_ADMIN: Locator;
  readonly PROFILE_BADGE_EMPLOYEE: Locator;
  readonly ERROR_MESSAGE: Locator;
  readonly DASHBOARD: Locator;
  readonly VALIDATE_USERNAME: Locator;
  readonly VALIDATE_PASSWORD: Locator;
  readonly VALIDATE_ACCOUNT_LOCKED: Locator;
  readonly CLICK_QUANLY_BUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.VALIDATE_ACCOUNT_LOCKED = page.getByText('Tài khoản hiện đang bị khoá');
    this.VALIDATE_USERNAME = page.locator("//div[contains(text(),'Nhập email hoặc số điện thoại')]");
    this.VALIDATE_PASSWORD = page.locator("//div[contains(text(),'Nhập mật khẩu')]");
    this.DASHBOARD = page.locator("//div[contains(text(),'BigTime')]");
    this.USERNAME_INPUT = page.getByRole('textbox', { name: 'Email hoặc Số điện thoại' });
    this.PASSWORD_INPUT = page.getByRole('textbox', { name: 'Mật khẩu' });
    this.LOGIN_BUTTON = page.getByRole('button', { name: 'Đăng nhập' });
    this.PROFILE_BADGE_ADMIN = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Admin')]");
    this.PROFILE_BADGE_EMPLOYEE = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Nguyễn Văn Minh')]");
    this.ERROR_MESSAGE = page.locator("//li[contains(text(),'Tên đăng nhập hoặc mật khẩu không đúng')]");
    this.CLICK_QUANLY_BUTTON = page.getByText('Quản lýQuản lý người dùng và');
  }

  async goto() {
    await this.page.waitForLoadState('load');
    const url = Config.urlStaging || process.env.URL_BIGTIME || '';
    if (!url) {
      throw new Error('Base URL is not defined. Set the URL_BIGTIME environment variable or update Config.urlStaging.');
    }
    await this.page.goto(url);
  }

  async expectUsernameValidate() {
    await this.safeVerifyToHaveText(this.VALIDATE_USERNAME, 'Nhập email hoặc số điện thoại');
  }

  async expectPasswordValidate() {
    await this.safeVerifyToHaveText(this.VALIDATE_PASSWORD, 'Nhập mật khẩu');
  }
  
  async expectAccountLockedValidate() {
    await this.safeVerifyToHaveText(this.VALIDATE_ACCOUNT_LOCKED, 'Tài khoản hiện đang bị khoá');
  }
  
  async login(username: string, password: string) {
    await this.safeFill(this.USERNAME_INPUT, username);
    await this.safeFill(this.PASSWORD_INPUT, password);
    await this.safeClick(this.LOGIN_BUTTON);
    await this.safeClick(this.CLICK_QUANLY_BUTTON);
  }

  async expectLoginSuccess() {
    await this.safeVerifyTextContains(this.DASHBOARD, 'BigTime');
  }

  async expectLoginError() {
    await this.safeVerifyTextContains(this.ERROR_MESSAGE, 'Tên đăng nhập hoặc mật khẩu không đúng');
  }
}
