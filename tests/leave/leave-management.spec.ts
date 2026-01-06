import { test } from '@playwright/test';
import { LoginPage } from '../../page/LoginPage';
import { LeaveManagementPage } from '../../page/leave/leave-managementPage';
import { ToastPage } from '../../page/toastPage';
import { allure } from 'allure-playwright';
import { clearTable, importFromCSV } from '../../db/core/DBUtils';

test.describe.serial('Leave Management', () => {
  let loginPage: LoginPage;
  let leaveManagementPage: LeaveManagementPage;
  let toastPage: ToastPage;

  test.beforeEach(async ({ page }) => {
    allure.feature('Leave Management Feature');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    leaveManagementPage = new LeaveManagementPage(page);
    toastPage = new ToastPage(page);

    await clearTable('leave_managements', "year IN ('2027', '2028', '2029', '2040')");

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


  test('Add leave', async () => {
    allure.story('Add leave successfully');

    await allure.step('Tạo phép năm với thông tin hợp lệ', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2028');
      await leaveManagementPage.fillNgayPhep('13');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.addNhanvien('123');
      await leaveManagementPage.waitFor(1000);
      await leaveManagementPage.checkBoxButton();
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });

    await toastPage.verifyToastMessage('Thêm thành công');
  });


  test('Add leave with status Pending', async () => {
    allure.story('Add leave with Pending status');

    await allure.step('Tạo phép năm trạng thái Chờ duyệt', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2027');
      await leaveManagementPage.fillNgayPhep('10');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.addNhanvien('123');
      await leaveManagementPage.waitFor(1000);
      await leaveManagementPage.checkBoxButton();
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });
    await toastPage.verifyToastMessage('Thêm thành công');
  });

  test('Add leave with status New', async () => {
    allure.story('Add leave with New status');

    await allure.step('Tạo và xác nhận phép năm trạng thái Mới', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2040');
      await leaveManagementPage.fillNgayPhep('15');
      await leaveManagementPage.selectTrangThai('Mới');
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.addNhanvien('123');
      await leaveManagementPage.waitFor(1000);
      await leaveManagementPage.checkBoxButton();
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
      await leaveManagementPage.acceptButton();
    });

    await toastPage.verifyToastMessage('Thêm thành công');
  });

  test('Add leave with department', async () => {
    allure.story('Add leave by department');

    await allure.step('Tạo phép năm theo bộ phận', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2029');
      await leaveManagementPage.fillNgayPhep('12');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.addDepartment();
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.selectDepartment('Nhân sự');
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });

    await toastPage.verifyToastMessage('Thêm thành công');
  });

  test('Add leave with departments', async () => {
    allure.story('Add leave with multiple departments');

    await allure.step('Tạo phép năm với nhiều bộ phận', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2029');
      await leaveManagementPage.fillNgayPhep('12');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.addDepartment();
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.selectDepartment('Nhân sự');
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });

    await toastPage.verifyToastMessage('Thêm thành công');
  });

  test('Add leave for department with new status', async () => {
    allure.story('Add leave department with New status');

    await allure.step('Tạo phép năm bộ phận với trạng thái mới', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2029');
      await leaveManagementPage.fillNgayPhep('12');
      await leaveManagementPage.selectTrangThai('Mới');
      await leaveManagementPage.addDepartment();
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.selectDepartment('Nhân sự');
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
      await leaveManagementPage.acceptButton();
    });

    await toastPage.verifyToastMessage('Thêm thành công');
  });

  test('Add leave fail with existing employee', async () => {
    allure.description('')
    allure.story('Fail when employee already exists');

    await allure.step('Tạo phép năm với nhân viên đã tồn tại', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2025');
      await leaveManagementPage.fillNgayPhep('10');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.addNhanvien('123');
      await leaveManagementPage.waitFor(1000);
      await leaveManagementPage.checkBoxButton();
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });

    await toastPage.verifyToastMessage('Thêm không thành công');
  });

  test('Add leave when No select user', async () => {
    allure.story('Fail when no employee selected');

    await allure.step('Không chọn nhân viên', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2025');
      await leaveManagementPage.fillNgayPhep('10');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });

    await toastPage.verifyToastMessage('Vui lòng chọn nhân viên');
  });

  test('Non-integer day validation', async () => {
    allure.story('Validate non-integer leave day');

    await allure.step('Nhập số ngày không hợp lệ', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.selectYear('2025');
      await leaveManagementPage.fillNgayPhep('0.5');
      await leaveManagementPage.selectTrangThai('Chờ duyệt');
      await leaveManagementPage.clickAddButtonSecond();
      await leaveManagementPage.addNhanvien('123');
      await leaveManagementPage.checkBoxAllButton();
      await leaveManagementPage.clickSaveFromSecond();
      await leaveManagementPage.clickSaveFrom();
    });

    await leaveManagementPage.checkValidateNgayphep();
    await toastPage.verifyToastMessage('Thêm không thành công');
  });



  test('No select day', async () => {
    allure.story('Validate empty leave day');

    await allure.step('Không nhập số ngày phép', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.fillNgayPhep('');
      await leaveManagementPage.checkValidateInputNgayphep();
    });
  });

  test('validate number < 0', async () => {
    allure.story('Validate negative leave day');

    await allure.step('Nhập số ngày < 0', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.fillNgayPhep('-1');
      await leaveManagementPage.checkValidateInputBehon0();
    });
  });

  test('cancel failed when no input request', async () => {
    allure.story('Cancel failed without reason');

    await allure.step('Hủy phép năm không nhập lý do', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Chờ duyệt');
      await leaveManagementPage.clickSreachButton();
      await toastPage.thaotacButton();
      await toastPage.cancelButton();
      await toastPage.fillLydo('');
      await toastPage.clickYesButton();
      await leaveManagementPage.validateLydo();
    });
  });

  test('Cancel leave request before staff approval.', async () => {
    allure.story('Cancel leave request');

    await allure.step('Hủy phép năm trước khi duyệt', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Chờ duyệt');
      await leaveManagementPage.clickSreachButton();
      await toastPage.thaotacButton();
      await toastPage.cancelButton();
      await toastPage.fillLydo('abc');
      await toastPage.clickYesButton();
    });
  });


  test('setup with new status', async () => {
    allure.story('Edit leave with New status');
    await allure.step('Sửa phép năm trạng thái Mới', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Mới');
      await leaveManagementPage.clickSreachButton();
      await toastPage.thaotacButton();
      await leaveManagementPage.thaotacNewStatus('Sửa');
      await leaveManagementPage.fillNgayPhep('10');
      await leaveManagementPage.clickSaveFrom();
    });
  });

  test('setup with new status accept', async () => {
    allure.story('Accept leave with New status');

    await allure.step('Xác nhận phép năm', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Mới');
      await leaveManagementPage.clickSreachButton();
      await toastPage.thaotacButton();
      await leaveManagementPage.thaotacNewStatus('Xác nhận');
      await toastPage.clickYesButton();
    });
  });

  test('Search kernel for information.', async () => {
    allure.story('Search employee has data');

    await allure.step('Tìm kiếm nhân viên có dữ liệu', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.textboxInputNv('Nhân viên nhân sự');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.checkNv('Nhân viên nhân sự');
    });
  });

  test('sreach kernel no for information', async () => {
    allure.story('Search employee no data');

    await allure.step('Tìm kiếm nhân viên không có dữ liệu', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.textboxInputNv('abc');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.sreachNoFind();
    });
  });

  test('Filter annual leave by year input.', async () => {
    allure.story('Filter annual leave by year input.');
    await allure.step('Lọc phép năm theo input năm', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickYearInput('2025');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.checkYear('2025');
    });
  });

  test('Sreach wwith new status', async () => {
    allure.story('Filter by New status');
    await allure.step('Lọc phép năm theo trạng thái Mới', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Mới');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.checkStatus('Mới');
    });
  });
  test('Sreach wwith Awaiting approval status', async () => {
    allure.story('Filter by Awaiting approval status');
    await allure.step('Lọc phép năm theo trạng thái chờ duyệt', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Chờ duyệt');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.checkStatus('Chờ duyệt');
    });
  });

  test('Sreach wwith approved status', async () => {
    allure.story('Filter by approved status');
    await allure.step('Lọc phép năm theo trạng thái đã duyệt', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Đã duyệt');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.checkStatus('Đã duyệt');
    });
  });

  test('Sreach wwith cancle status', async () => {
    allure.story('Filter by cancle status');
    await allure.step('Lọc phép năm theo trạng thái từ chối', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Từ chối');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.checkStatus('Từ chối');
    });
  });




  test('Delete infomation sreach', async () => {
    allure.story('Delete sreach');
    await allure.step('Xóa thông tin đã tìm kiếm', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Mới');
      await leaveManagementPage.clickSreachButton();
      await leaveManagementPage.clickDeleteButton();
    });
  });


});
