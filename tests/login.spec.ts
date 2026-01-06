
import { LoginPage } from '../page/LoginPage'; 
    import { test, expect } from '@playwright/test';

    test.describe.serial('Login', () => {

      let loginPage: LoginPage;

      test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://bigtime-stg-2.bigapptech.vn/login');
       
      });

    test('Login sucsses', async ({ page }) => {
     await loginPage.login('info@bigapptech.vn', '12345678@Bat');
    //  await loginPage.verifyLoginSuccess();  
    });

    
 
 
    });
