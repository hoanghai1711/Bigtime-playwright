import {expect, Locator, Page} from '@playwright/test';
import { BasePage } from './basePage';

export class ToastPage extends BasePage {
  readonly toast: Locator;
  

  constructor(page: Page) {
    super(page);
    this.toast = page.getByTestId('toast-content');
    
  }

  async verifyToastMessage(message: string) {
    await expect(this.toast).toBeVisible();
    await expect(this.toast).toHaveText(message);
  }
}