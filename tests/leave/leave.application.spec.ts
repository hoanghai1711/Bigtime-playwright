import { test } from '@playwright/test';
import { LoginPage } from '../../page/LoginPage';
import { LeaveManagementPage } from '../../page/leave/leave-managementPage';
import { ToastPage } from '../../page/toastPage';
import { allure } from 'allure-playwright';
import { LeaveApplication } from '../../page/leave/leave-applicationPage';
import { clearTable } from '../../db/core/DBUtils';

test.describe.serial('leave application', () => {
  let loginPage: LoginPage;
  let leaveApplication: LeaveApplication;
  let toastPage: ToastPage;

  test.beforeEach(async ({ page }) => {
    allure.feature('Leave Management Feature');
    allure.severity('Critical');
    loginPage = new LoginPage(page);
    leaveApplication = new LeaveApplication(page);
    toastPage = new ToastPage(page);
    await allure.step('Login hệ thống', async () => {
      await loginPage.goto();
      await loginPage.login('nhansu@gmail.com', '123456');
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
  test.beforeAll(async () => {
    clearTable('leave_applications', "reason IN ('abc')")
  })

  // Tạo đơn nghỉ phép thành công với thông tin hợp lệ
  test('Leave request successfully created with valid information', async () => {
    allure.story('Leave request successfully created with valid information.');
    await allure.step('Tạo đơn nghỉ với thông tin hợp lệ', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ theo phép năm');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Chờ duyệt');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '15');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '16');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await toastPage.verifyToastMessage('Thêm thành công')
      await leaveApplication.sreachStatus('Chờ duyệt');
      await leaveApplication.sreachDatePicker('2026', 'Thg 1');
      await leaveApplication.validateData('Chờ duyệt');
      
    });
  });

  //Tạo đơn thất bại khi không có phép năm 
  test('Application failed due to lack of annual leave.', async () => {
    allure.story('Application failed due to lack of annual leave.');
    await allure.step('Tạo đơn thất bại khi không có phép năm ', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ theo phép năm');  
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Chờ duyệt');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2027', 'Thg 2', '16');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2027', 'Thg 2', '17');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await leaveApplication.validateNoleave();
      await toastPage.verifyToastMessage('Thêm không thành công')
    
    });
  });
  //Tạo đơn thất bại khi đơn xin  nghỉ bị trùng
  test('The application failed because there was a duplicate request.', async () => {
    allure.story('The application failed because there was a duplicate request.');
    await allure.step('Tạo đơn nghỉ bị trùng lịch', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ theo phép năm');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Chờ duyệt');
     await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '15');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '16');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await leaveApplication.validateTrunglich();
    });
    await toastPage.verifyToastMessage('Thêm không thành công');
  });

  // Tạo đơn thất bại khi ngày bắt đầu lớn hơn ngày kết thúc
  test('Order creation fails when the start date is greater than the end date.', async () => {
    allure.story('Order creation fails when the start date is greater than the end date.');
    await allure.step('Tạo đơn thất bại khi ngày bắt đầu lớn hơn ngày kết thúc', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ theo phép năm');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Chờ duyệt');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2027', 'Thg 1', '7');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await leaveApplication.validateComparedate();
    });
    await toastPage.verifyToastMessage('Thêm không thành công');
  });


  //Tạo đơn thành công với loại ngày nghỉ khác không cần phép năm
  test('Successfully created a request for a different type of leave that does not require annual leave.', async () => {
    allure.story('Successfully created a request for a different type of leave that does not require annual leave.');
    await allure.step('Tạo đơn với loại ngày nghỉ thường', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ thường');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Chờ duyệt');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2027', 'Thg 1', '5');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2027', 'Thg 1', '6');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await toastPage.verifyToastMessage('Thêm thành công');
      await leaveApplication.sreachStatus('Chờ duyệt');
      await leaveApplication.sreachDatePicker('2027', 'Thg 1');
      await leaveApplication.validateType('Nghỉ thường');
      await leaveApplication.validateData('Chờ duyệt');
      
    });
  });

  //Tạo đơn với trạng thái mới
  test('Create order with new status', async () => {
    allure.story('Create order with new status');
    await allure.step('Tạo đơn với trạng thái mới', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ theo phép năm');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Mới');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '19');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '20');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await toastPage.verifyToastMessage('Thêm thành công');
      await leaveApplication.sreachStatus('Mới');
      await leaveApplication.sreachDatePicker('2026', 'Thg 1');
      await leaveApplication.validateType('Nghỉ theo phép năm');  
      await leaveApplication.validateData('Mới');
    });
  });

  // thao tác gửi với trạng thái mới
  test('Submit operation with new status', async () => {
    allure.story('Submit operation with new status');
    await allure.step('Thao tác sửa với trạng thái mới', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.sreachStatus('Mới');
      await leaveApplication.sreachDatePicker('2026', 'Thg 1');
      await leaveApplication.validateData('Mới');
      await leaveApplication.setupButton('Gửi');
      await leaveApplication.clickYesButton();
      await toastPage.verifyToastMessage('Gửi duyệt thành công');
      await leaveApplication.validateType('Chờ duyệt');
      await leaveApplication.sreachDatePicker('2026', 'Thg 1');
      await leaveApplication.clickSave();
      await leaveApplication.validateData('Chờ duyệt');
    });
  });
  
  //Tạo đơn khi không có ca làm việc
  test('Create orders when there are no shifts.', async () => {
    allure.story('Create orders when there are no shifts.');
    await allure.step('Tạo đơn nghỉ khi không có ca làm việc', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ theo phép năm');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Chờ duyệt');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '3');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '4');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await leaveApplication.validateNoshifts();
    });
    await toastPage.verifyToastMessage('Thêm không thành công');
  });

  //Kiểm tra trường lý do giới hạn 255 ký tự
  test('Check the reason field for the 255-character limit.', async () => {
    allure.story('Check the reason field for the 255-character limit.');
    await allure.step('Kiểm tra trường lý do giới hạn 255 ký tự', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      const reason256 = leaveApplication.validateString(256);
      await leaveApplication.fillLydo(reason256);
      await leaveApplication.validateLydo();
    });
  });

  //Tạo đơn với loại ngày nghỉ xã hội
  test('create annual leave for social insurance', async () => {
    allure.story('create annual leave for social insurance');
    await allure.step('Tạo đơn nghỉ với loại ngày nghỉ bảo hiểm xã hội', async () => {
      await leaveApplication.clickItemButton();
      await leaveApplication.clickAddButton();
      await leaveApplication.clickType();
      await leaveApplication.selectType('Nghỉ bảo hiểm xã hội');
      await leaveApplication.fillLydo('abc');
      await leaveApplication.clickStatus();
      await leaveApplication.selectOption('Mới');
      await leaveApplication.clickFormDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '14');
      await leaveApplication.clickSave();
      await leaveApplication.clickToDate();
      await leaveApplication.selectDate('2026', 'Thg 1', '15');
      await leaveApplication.clickSave();
      await leaveApplication.clickSaveFrom();
      await toastPage.verifyToastMessage('Thêm thành công');
      await leaveApplication.sreachStatus('Mới');
      await leaveApplication.sreachDatePicker('2026', 'Thg 1');
      await leaveApplication.validateType('Nghỉ bảo hiểm xã hội');  
      await leaveApplication.validateData('Mới');
    });
  });
    
  
 




  // 
})