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
    allure.description('Verify that annual leave can be created successfully with valid information');
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

    await allure.step('Verify annual leave created successfully', async () => {
      await toastPage.verifyToastMessage('Thêm thành công');
    });
  });

  test('Add leave with status Pending', async () => {
    allure.description('Verify that annual leave can be created with Pending status');
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
    
    await allure.step('Verify annual leave created with Pending status', async () => {
      await toastPage.verifyToastMessage('Thêm thành công');
    });
  });

  test('Add leave with status New', async () => {
    allure.description('Verify that annual leave can be created with New status and requires confirmation');
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

    await allure.step('Verify annual leave created with New status', async () => {
      await toastPage.verifyToastMessage('Thêm thành công');
    });
  });

  test('Add leave with department', async () => {
    allure.description('Verify that annual leave can be created for an entire department');
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

    await allure.step('Verify department annual leave created successfully', async () => {
      await toastPage.verifyToastMessage('Thêm thành công');
    });
  });

  test('Add leave with departments', async () => {
    allure.description('Verify that annual leave can be created for multiple departments');
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

    await allure.step('Verify multiple departments annual leave created successfully', async () => {
      await toastPage.verifyToastMessage('Thêm thành công');
    });
  });

  test('Add leave for department with new status', async () => {
    allure.description('Verify that annual leave for department can be created with New status');
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

    await allure.step('Verify department annual leave created with New status', async () => {
      await toastPage.verifyToastMessage('Thêm thành công');
    });
  });

  test('Add leave fail with existing employee', async () => {
    allure.description('Verify that system prevents creating annual leave for employee who already has leave record for the same year');
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

    await allure.step('Verify duplicate employee validation error', async () => {
      await toastPage.verifyToastMessage('Thêm không thành công');
    });
  });

  test('Add leave when No select user', async () => {
    allure.description('Verify that system shows error when no employee is selected for annual leave creation');
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

    await allure.step('Verify employee selection validation error', async () => {
      await toastPage.verifyToastMessage('Vui lòng chọn nhân viên');
    });
  });

  test('Non-integer day validation', async () => {
    allure.description('Verify that system validates and rejects non-integer values for leave days');
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

    await allure.step('Verify non-integer day validation error', async () => {
      await leaveManagementPage.checkValidateNgayphep();
      await toastPage.verifyToastMessage('Thêm không thành công');
    });
  });

  test('No select day', async () => {
    allure.description('Verify that system shows validation error when leave days field is empty');
    allure.story('Validate empty leave day');

    await allure.step('Không nhập số ngày phép', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.fillNgayPhep('');
      await leaveManagementPage.checkValidateInputNgayphep();
    });
  });

  test('validate number < 0', async () => {
    allure.description('Verify that system validates and rejects negative values for leave days');
    allure.story('Validate negative leave day');

    await allure.step('Nhập số ngày < 0', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickAddButton();
      await leaveManagementPage.fillNgayPhep('-1');
      await leaveManagementPage.checkValidateInputBehon0();
    });
  });

  test('cancel failed when no input request', async () => {
    allure.description('Verify that system prevents cancellation without providing a reason');
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
    allure.description('Verify that annual leave request can be cancelled before approval');
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
    allure.description('Verify that annual leave with New status can be edited successfully');
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
    allure.description('Verify that annual leave with New status can be accepted/confirmed');
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
    allure.description('Verify that search functionality works for employees with existing leave data');
    allure.story('Search employee has data');

    await allure.step('Tìm kiếm nhân viên có dữ liệu', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.textboxInputNv('Nhân viên nhân sự');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify search results display correctly', async () => {
      await leaveManagementPage.checkNv('Nhân viên nhân sự');
    });
  });

  test('sreach kernel no for information', async () => {
    allure.description('Verify that search shows appropriate message when no matching employee data found');
    allure.story('Search employee no data');

    await allure.step('Tìm kiếm nhân viên không có dữ liệu', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.textboxInputNv('abc');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify no data found message', async () => {
      await leaveManagementPage.sreachNoFind();
    });
  });

  test('Filter annual leave by year input.', async () => {
    allure.description('Verify that annual leave can be filtered by year using year input field');
    allure.story('Filter annual leave by year input.');
    
    await allure.step('Lọc phép năm theo input năm', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickYearInput('2025');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify filtered results by year', async () => {
      await leaveManagementPage.checkYear('2025');
    });
  });

  test('Sreach wwith new status', async () => {
    allure.description('Verify that annual leave can be filtered by New status');
    allure.story('Filter by New status');
    
    await allure.step('Lọc phép năm theo trạng thái Mới', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Mới');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify filtered results by New status', async () => {
      await leaveManagementPage.checkStatus('Mới');
    });
  });
  
  test('Sreach wwith Awaiting approval status', async () => {
    allure.description('Verify that annual leave can be filtered by Awaiting approval status');
    allure.story('Filter by Awaiting approval status');
    
    await allure.step('Lọc phép năm theo trạng thái chờ duyệt', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Chờ duyệt');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify filtered results by Awaiting approval status', async () => {
      await leaveManagementPage.checkStatus('Chờ duyệt');
    });
  });

  test('Sreach wwith approved status', async () => {
    allure.description('Verify that annual leave can be filtered by Approved status');
    allure.story('Filter by approved status');
    
    await allure.step('Lọc phép năm theo trạng thái đã duyệt', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Đã duyệt');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify filtered results by Approved status', async () => {
      await leaveManagementPage.checkStatus('Đã duyệt');
    });
  });

  test('Sreach wwith cancle status', async () => {
    allure.description('Verify that annual leave can be filtered by Cancelled/Rejected status');
    allure.story('Filter by cancle status');
    
    await allure.step('Lọc phép năm theo trạng thái từ chối', async () => {
      await leaveManagementPage.clickItemPhepNam();
      await leaveManagementPage.clickStatusButton();
      await leaveManagementPage.selectStatus('Từ chối');
      await leaveManagementPage.clickSreachButton();
    });
    
    await allure.step('Verify filtered results by Cancelled status', async () => {
      await leaveManagementPage.checkStatus('Từ chối');
    });
  });

  test('Delete infomation sreach', async () => {
    allure.description('Verify that search filters can be cleared/deleted successfully');
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