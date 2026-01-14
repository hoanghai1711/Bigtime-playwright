import { test, expect } from "@playwright/test";
import { EmployeePage } from "../page/EmployeePage";
import { ToastPage } from "../page/toastPage";
import { LoginPage } from "../page/LoginPage";
import { allure } from "allure-playwright";
import { clearTable, checkExistsWithConditions } from "../db/core/DBUtils";

test.describe.serial("Employee Management Tests", () => {
  let loginPage: LoginPage;
  let employeePage: EmployeePage;
  let toastPage: ToastPage;

  const EMP_PREFIX = "AUTO_EMP_";

  test.beforeAll(async () => {
    // Clean dữ liệu nhân viên auto trước khi chạy test
    await clearTable("users", "code LIKE '%AUTO_EMP_%'");
  });

  test.beforeEach(async ({ page }) => {
    allure.feature("Employee Management");
    allure.severity("Critical");

    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    toastPage = new ToastPage(page);

    // Login hệ thống
    await allure.step("Login to system", async () => {
      await loginPage.goto();
      await loginPage.login("admin@gmail.com", "123456");
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Nếu test fail thì chụp screenshot
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `screenshots/${testInfo.title.replace(/\s+/g, "_")}.png`,
        fullPage: true,
      });
    }
  });

  // TC01: Tạo nhân viên với vai trò Nhân viên
  test("Create employee with Staff role successfully-Tạo nhân viên thành công với chức vụ nhân viên", async () => {
    allure.story("Create employee - Staff");
    allure.description(`Verify staff employee can be created successfully with all required information and saved to database`);
    await allure.step("Create staff employee with personal information", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}001`, "Staff A", "hello0123");
      await employeePage.checkTimekeeping();
      await employeePage.checkCheckin();
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    await allure.step("Verify employee created successfully", async () => {
      await toastPage.verifyToastMessage("Thêm thành công");
      await employeePage.validateListEmployee("Staff A");
    });
  });

  // TC02: Tạo nhân viên với vai trò Quản lý
  test("Create employee with Manager role-Tạo nhân viên thành công với chức vụ Quản lý", async () => {
    allure.story("Create employee - Manager");
    allure.description(`Verify manager employee can be created with permission and user_type is correctly saved to database as 1`);
    await allure.step("Create manager employee with all required information", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}002`, "Manager A", "hello123");
      await employeePage.checkTimekeeping();
      await employeePage.checkCheckin();
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Quản lý");
      await employeePage.selectPermission("Quản lý bộ phận");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    await allure.step("Verify manager employee created successfully", async () => {
      await toastPage.verifyToastMessage("Thêm thành công");
      const existsInDB = await checkExistsWithConditions("users", {
        code: { value: `${EMP_PREFIX}002` },
        user_type: { value: 1 },
      });
      expect(existsInDB).toBeTruthy();
    });
  });

  // TC03: Tạo nhân viên với trạng thái Đang làm
  test("Create employee with Working status-Tạo nhân viên thành công với trạng thái Đang làm", async () => {
    allure.story("Employee working status");
    allure.description(`Verify employee can be created with working status and saved successfully`);
    
    await allure.step("Create employee with working status configuration", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}003`, "Working Staff", "hello1123");
      await employeePage.checkTimekeeping();
      await employeePage.checkCheckin();
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify employee created with working status", async () => {
      await toastPage.verifyToastMessage("Thêm thành công");
    });
  });

  // TC04: Tạo nhân viên với trạng thái Đã nghỉ
  test("Create employee with Resigned status-Tạo nhân viên thành công với trạng thái Đã nghỉ", async () => {
    allure.story("Employee resigned status");
    allure.description(`Verify employee can be created with resigned status and saved successfully`);
    
    await allure.step("Create employee with resigned status configuration", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}004`, "Resigned Staff", "hell1o123");
      await employeePage.checkTimekeeping();
      await employeePage.checkCheckin();
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đã nghỉ");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify employee created with resigned status", async () => {
      await toastPage.verifyToastMessage("Thêm thành công");
    });
  });

  // TC05: Tạo nhân viên với thông tin tối thiểu
  test("Create employee with minimal required information-Tạo nhân viên với thông tin tối thiểu", async () => {
    allure.story("Create basic employee");
    allure.description(`Verify employee can be created with minimal required fields only`);
    
    await allure.step("Create employee with minimal required information", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}005`, "Basic Staff", "hello1323");
      await employeePage.checkTimekeeping();
      await employeePage.checkCheckin();
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify employee created with minimal information", async () => {
      await toastPage.verifyToastMessage("Thêm thành công");
    });
  });

  // TC06: Validate độ dài tối đa ID (20 ký tự)
  test("Validate max length for employee ID-Kiểm tra độ dài tối đa mã nhân viên", async () => {
    allure.story("Validate Employee ID length");
    allure.description(`Verify employee code field cannot accept more than 20 characters`);
    
    await allure.step("Test employee ID field with 256 characters input", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      const text256 = employeePage.validateString(256);
      await employeePage.fillEmployeeCode(text256);
      await employeePage.validate20Character();
    });
  });

  // TC07: Validate độ dài tối đa Name (255 ký tự)
  test("Validate max length for employee name-Kiểm tra độ dài tối đa tên nhân viên", async () => {
    allure.story("Validate Employee Name length");
    allure.description(`Verify employee name field cannot accept more than 255 characters`);
    
    await allure.step("Test employee name field with 256 characters input", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      const text256 = employeePage.validateString(256);
      await employeePage.fillEmployeeName(text256);
      await employeePage.validate255Character();
    });
  });

  // TC08: Validate độ dài tối đa Email (30 ký tự)
  test("Validate max length for employee email-Kiểm tra độ dài tối đa email", async () => {
    allure.story("Validate Employee Email length");
    allure.description(`Verify email field cannot accept more than 30 characters`);
    
    await allure.step("Test email field with 256 characters input", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      const text256 = employeePage.validateString(256);
      await employeePage.fillEmail(text256);
      await employeePage.validate30Character();
    });
  });

  // TC09: Validate độ dài tối đa Password (255 ký tự)
  test("Validate max length for employee password-Kiểm tra độ dài tối đa mật khẩu", async () => {
    allure.story("Validate Employee Password length");
    allure.description(`Verify password field cannot accept more than 255 characters`);
    
    await allure.step("Test password fields with 256 characters input", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      const text256 = employeePage.validateString(256);
      await employeePage.fillPassword(text256);
      await employeePage.fillConfirmPassword(text256);
      await employeePage.validate255Character();
    });
  });

  // TC10: Tạo nhân viên để test đăng nhập
  test("Create employee for login testing-Tạo nhân viên để test đăng nhập", async () => {
    allure.story("Create employee for login");
    allure.description(`Verify test employee can be created for login verification testing`);
    await clearTable('users',"code IN ('LOGIN_EMP_001')")
    await allure.step("Create test employee for login verification", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo("LOGIN_EMP_001", "Login Staff", "loginemp001");
      await employeePage.checkTimekeeping();
      await employeePage.checkCheckin();
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
      await toastPage.verifyToastMessage("Thêm thành công");
    });
    
    await allure.step("Verify login functionality with created employee", async () => {
      await employeePage.logoutButton();
      await loginPage.login("loginemp001@gmail.com", "123456");
     
    });
  });

  // NEGATIVE TEST CASES - Validation Tests

  // TC11: Tạo nhân viên không đúng thông tin hợp lệ(EMAIL)
  test("Create employee with invalid information format-Tạo nhân viên với thông tin không hợp lệ", async () => {
    allure.story("Validation - Invalid information format");
    allure.description(`Verify system rejects employee creation with invalid data format`);
    
    await allure.step("Attempt to create employee with invalid email format", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}0123`, "Staff123", "414211@email");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify email format validation error", async () => {
      await employeePage.validateEmailFormat();
    });
  });

  // TC12: Tạo nhân viên khi thông tin đã tồn tại
  test("Create employee when information already exists-Tạo nhân viên khi thông tin đã tồn tại", async () => {
    allure.story("Validation - Duplicate employee information");
    allure.description(`Verify system prevents duplicate employee creation with same information`);
    
    await allure.step("Phase 1: Create initial employee record", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}DUP`, "Duplicate Staff", "abc123");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
      await toastPage.verifyToastMessage("Thêm thành công");
    });
    
    await allure.step("Phase 2: Attempt to create duplicate employee", async () => {
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}DUP`, "Duplicate Staff", "abc123");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify duplicate information error", async () => {
      await toastPage.verifyToastMessage("Thêm không thành công");
      await employeePage.checkExist();
    });
  });

  // TC13: Tạo nhân viên khi không nhập thông tin nhân viên
  test("Create employee without employee code-Kiểm tra nhân viên không nhập mã", async () => {
    allure.story("Validation - Missing employee code");
    allure.description(`Verify system shows error "Nhập các thông tin" when employee code is missing`);
    await allure.step("Attempt to create employee without employee code", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPassword("");
      await employeePage.fillConfirmPassword("");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    await allure.step("Verify validation error for missing employee code", async () => {
      await employeePage.validateNoinput();
    });
  });
 
  // TC14: Tạo nhân viên khi nhập mật khẩu dưới 6 ký tự
  test("Create employee with password less than 6 characters-Kiểm tra mật khẩu ngắn hơn 6 ký tự", async () => {
    allure.story("Validation - Password too short");
    allure.description(`Verify system shows error "Mật khẩu phải ít nhất 6 ký tự" when password is less than 6 characters`);

    await allure.step("Attempt to create employee with short password", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}3213`, "TEST PASS", "PASS1233");
      await employeePage.fillPassword("12345");
      await employeePage.fillConfirmPassword("123456");
    });
    await allure.step("Verify password minimum length validation error", async () => {
      await employeePage.validatePass();
      });
    });

    // TC15: Tạo nhân viên khi nhập lại mật khẩu dưới 6 ký tự
  test("Create employee with confrimpassword less than 6 characters-Kiểm tra confrim mật khẩu ngắn hơn 6 ký tự", async () => {
    allure.story("Validation - Password too short");
    allure.description(`Verify system shows error "Mật khẩu phải ít nhất 6 ký tự" when password is less than 6 characters`);

    await allure.step("Attempt to create employee with short password", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}3213`, "TEST PASS", "PASS1233");
      await employeePage.fillPassword("123456");
      await employeePage.fillConfirmPassword("12345");
    });
    await allure.step("Verify password minimum length validation error", async () => {
      await employeePage.validatePass();
      });
    });

     // TC15: Tạo nhân viên khi nhập lại mật khẩu không khớp
  test("Create employee with passwords do not match-Kiểm tra confrim không khớp", async () => {
    allure.story("Validation - Password too short");
    allure.description(`Verify the system displays the error message "Giá trị không khớp với Mật khẩu cũ" when the entered value does not match the old password`);

    await allure.step("Attempt to create employee with short password", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}3213`, "TEST PASS", "PASS1233");
      await employeePage.fillPassword("123456");
      await employeePage.fillConfirmPassword("12345");
    });
    await allure.step("Verify password minimum length validation error", async () => {
      await employeePage.validatePass();
      });
    });

    

  // TC17: Tạo nhân viên khi không chọn chức vụ
  test("Create employee without selecting position-Tạo nhân viên khi không chọn chức vụ", async () => {
    allure.story("Validation - Missing position selection");
    allure.description(`Verify system shows error "Vui lòng chọn chức vụ" when position is not selected`);
    
    await allure.step("Attempt to create employee without position selection", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}NoPos`, "No Position Staff", "nopos@test.com");
      // Skip selecting position
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify position selection validation error", async () => {
      await toastPage.verifyToastMessage("Vui lòng chọn chức vụ");
    });
  });

  // TC18: Tạo nhân viên khi không chọn quyền cho nhân viên
  test("Create employee without selecting permission-Tạo nhân viên khi không chọn quyền", async () => {
    allure.story("Validation - Missing permission selection");
    allure.description(`Verify system shows error "Vui lòng chọn quyền" when permission is not selected for manager`);
    
    await allure.step("Attempt to create manager employee without permission selection", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}NoPerm`, "No Permission Staff", "noperm@test.com");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Quản lý");
      // Skip selecting permission
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify permission selection validation error", async () => {
      await toastPage.verifyToastMessage("Vui lòng chọn quyền");
    });
  });

  // TC19: Tạo nhân viên với chức vụ nhân viên nhưng không chọn bộ phận
  test("Create staff employee without selecting department-Tạo nhân viên khi không chọn bộ phận", async () => {
    allure.story("Validation - Staff without department");
    allure.description(`Verify system shows error "Vui lòng chọn bộ phận" when department is not selected for staff`);
    
    await allure.step("Attempt to create staff employee without department selection", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}NoDept`, "No Department Staff", "nodept@test.com");
      await employeePage.selectEmployeeType("Nhân viên");
      // Skip selecting department
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify department selection validation error", async () => {
      await toastPage.verifyToastMessage("Vui lòng chọn bộ phận");
    });
  });

  // TC20: Tạo nhân viên khi nhập mật khẩu khác nhau
  test("Create employee with mismatched passwords-Tạo nhân viên khi mật khẩu không trùng khớp", async () => {
    allure.story("Validation - Mismatched passwords");
    allure.description(`Verify system shows error "Mật khẩu không giống nhau" when password and confirm password don't match`);
    
    await allure.step("Attempt to create employee with mismatched passwords", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}MismatchPwd`, "Mismatch Password Staff", "mismatch@test.com");
      await employeePage.fillPassword("Test@123");
      await employeePage.fillConfirmPassword("Test@456");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify password confirmation validation error", async () => {
      await toastPage.verifyToastMessage("Mật khẩu không giống nhau");
    });
  });

  // TC21: Tạo nhân viên với CCCD đã tồn tại
  test("Create employee with duplicate CCCD-Kiểm tra CCCD trùng lặp", async () => {
    allure.story("Validation - Duplicate CCCD");
    allure.description(`Verify system prevents duplicate CCCD and shows error "CCCD đã tồn tại"`);

    const duplicateCCCD = "123456789012";

    await allure.step("Phase 1: Create first employee with CCCD", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}CCCD1`, "CCCD Staff 1", "cccd1@test.com");
      await employeePage.fillIdCard(duplicateCCCD);
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });

    await allure.step("Phase 1: Verify first employee created successfully", async () => {
      await toastPage.verifyToastMessage("Thêm thành công");
    });

    await allure.step("Phase 2: Attempt to create second employee with duplicate CCCD", async () => {
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}CCCD2`, "CCCD Staff 2", "cccd2@test.com");
      await employeePage.fillIdCard(duplicateCCCD);
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });

    await allure.step("Phase 2: Verify duplicate CCCD error and data integrity", async () => {
      await toastPage.verifyToastMessage("CCCD đã tồn tại");
      const existsInDB = await checkExistsWithConditions("users", {
        name: { value: "CCCD Staff 2" },
      });
      expect(existsInDB).toBeFalsy();
    });
  });

  // TC22: Tạo nhân viên với SĐT đã tồn tại
  test("Create employee with duplicate phone number-Tạo nhân viên với SĐT trùng lặp", async () => {
    allure.story("Validation - Duplicate phone number");
    allure.description(`Verify system prevents duplicate phone number and shows error "Số điện thoại đã tồn tại"`);
    const duplicatePhone = "0987654321";

    await allure.step("Phase 1: Create first employee with phone number", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}Phone1`, "Phone Staff 1", "phone1@test.com");
      await employeePage.fillPhoneNumber(duplicatePhone);
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
      await toastPage.verifyToastMessage("Thêm thành công");
    });

    await allure.step("Phase 2: Attempt to create employee with duplicate phone number", async () => {
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}Phone2`, "Phone Staff 2", "phone2@test.com");
      await employeePage.fillPhoneNumber(duplicatePhone);
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify duplicate phone number validation error", async () => {
      await toastPage.verifyToastMessage("Số điện thoại đã tồn tại");
    });
  });

  // TC23: Tạo nhân viên với ngày sinh trong tương lai
  test("Create employee with future birth date-Tạo nhân viên với ngày sinh trong tương lai", async () => {
    allure.story("Validation - Future birth date");
    allure.description(`Verify system shows error "Ngày sinh không hợp lệ" when birth date is in the future`);
    
    await allure.step("Attempt to create employee with future birth date", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}FutureBirth`, "Future Birth Staff", "futurebirth@test.com");
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify birth date validation error", async () => {
      await toastPage.verifyToastMessage("Ngày sinh không hợp lệ");
    });
  });

  // TC24: Tạo nhân viên với CCCD không đủ 12 số
  test("Create employee with CCCD less than 12 digits-Kiểm tra CCCD ít hơn 12 chữ số", async () => {
    allure.story("Validation - CCCD invalid length");
    allure.description(`Verify system shows error "CCCD phải có đúng 12 ký tự" when CCCD length is invalid`);

    await allure.step("Attempt to create employee with short CCCD (9 digits)", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}ShortCCCD`, "Short CCCD Staff", "shortcccd@test.com");
      await employeePage.fillIdCard("123456789");
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });

    await allure.step("Verify CCCD length validation error", async () => {
      await toastPage.verifyToastMessage("CCCD phải có đúng 12 ký tự");
      const existsInDB = await checkExistsWithConditions("users", {
        name: { value: "Short CCCD Staff" },
      });
      expect(existsInDB).toBeFalsy();
    });
  });

  // TC25: Tạo nhân viên với số TK ngân hàng chứa ký tự đặc biệt
  test("Create employee with special characters in bank account-Tạo nhân viên với số TK chứa ký tự đặc biệt", async () => {
    allure.story("Validation - Invalid bank account format");
    allure.description(`Verify system shows error "Số tài khoản ngân hàng không hợp lệ" when bank account contains special characters`);
    
    await allure.step("Attempt to create employee with invalid bank account format", async () => {
      await employeePage.clickEmployeeMenu();
      await employeePage.clickAddButton();
      await employeePage.fillPersonalInfo(`${EMP_PREFIX}BadBank`, "Bad Bank Account Staff", "badbank@test.com");
      await employeePage.fillBankAccount("1234-5678-!@#$");  // Chứa ký tự đặc biệt
      await employeePage.selectDepartment("Dịch vụ");
      await employeePage.selectEmployeeType("Nhân viên");
      await employeePage.selectStatusForWork("Đang làm");
      await employeePage.selectStatus("Hoạt động");
      await employeePage.clickSaveFrom();
    });
    
    await allure.step("Verify bank account format validation error", async () => {
      await toastPage.verifyToastMessage("Số tài khoản ngân hàng không hợp lệ");
    });
  });
});