import { expect, type Locator, type Page } from "@playwright/test";
import { SafeActions } from "../Utils/SafeActions";
import { BasePage } from "./basePage";

export class EmployeePage extends BasePage {
  // LOCATORS - ĐIỀU HƯỚNG
  readonly SIDEBAR_EMPLOYEE_LINK: Locator;

  // LOCATORS - THÔNG TIN CÁ NHÂN (INPUTS)
  readonly EMPLOYEE_CODE_INPUT: Locator;
  readonly EMPLOYEE_NAME_INPUT: Locator;
  readonly EMAIL_INPUT: Locator;
  readonly PASSWORD_INPUT: Locator;
  readonly CONFIRM_PASSWORD_INPUT: Locator;

  // LOCATORS - CHECKBOX
  readonly TIMEKEEPING_CHECKBOX: Locator;
  readonly CHECKIN_CHECKBOX: Locator;

  // LOCATORS - DROPDOWN / TRƯỜNG CÓ THỂ CHỌN
  readonly DEPARTMENT_DROPDOWN: Locator;
  readonly GROUP_DROPDOWN: Locator;
  readonly EMPLOYEE_TYPE_DROPDOWN: Locator;
  readonly PERMISSION_DROPDOWN: Locator;
  readonly POSITION_DROPDOWN: Locator;
  readonly LEVEL_DROPDOWN: Locator;
  readonly STATUS_FOR_WORK_DROPDOWN: Locator;
  readonly STATUS_DROPDOWN: Locator;

  // LOCATORS - THÔNG TIN THÊM (INPUTS)
  readonly ID_CARD_INPUT: Locator; // CCCD
  readonly ID_CARD_ISSUE_DATE_INPUT: Locator; // Ngày cấp CCCD
  readonly ID_CARD_ISSUE_PLACE_INPUT: Locator; // Nơi cấp CCCD
  readonly BIRTH_DATE_INPUT: Locator; // Ngày sinh
  readonly START_WORK_DATE_INPUT: Locator; // Ngày vào làm
  readonly PHONE_NUMBER_INPUT: Locator; // Số điện thoại
  readonly BANK_NAME_INPUT: Locator; // Tên ngân hàng
  readonly BANK_ACCOUNT_INPUT: Locator; // Số tài khoản ngân hàng
  readonly TAX_CODE_INPUT: Locator; // Mã số thuế
  readonly ADDRESS_INPUT: Locator; // Địa chỉ
  readonly NOTE_INPUT: Locator; // Ghi chú

  //Validate
  readonly VALIDATE_EMAIL: Locator;

  // HÀM KHỞI TẠO
  constructor(page: Page) {
    super(page);

    // Navigation
    this.SIDEBAR_EMPLOYEE_LINK = page.getByRole("link", { name: "Nhân viên", exact: true });

    // Personal Information Inputs
    this.EMPLOYEE_CODE_INPUT = page.getByRole("textbox", { name: "Mã nhân viên ※ Mã nhân viên ※" });
    this.EMPLOYEE_NAME_INPUT = page.getByRole("textbox", { name: "Tên nhân viên ※ Tên nhân viên" });
    this.EMAIL_INPUT = page.getByRole("textbox", { name: "Email ※ Email ※" });
    this.PASSWORD_INPUT = page.getByRole("textbox", { name: "Nhập mật khẩu ※ Nhập mật khẩu" });
    this.CONFIRM_PASSWORD_INPUT = page.getByRole("textbox", { name: "Nhập lại mật khẩu ※ Nhập lại" });

    // Checkboxes
    this.TIMEKEEPING_CHECKBOX = page.getByRole("checkbox", { name: "Cho phép chấm công trực tuyến" });
    this.CHECKIN_CHECKBOX = page.getByRole("checkbox", { name: "Chỉ cần điểm danh ít nhất 1 lần trong ngày" });

    // Dropdowns
    this.DEPARTMENT_DROPDOWN = page.getByRole("textbox", { name: "Thuộc bộ phận Thuộc bộ phận" });
    this.GROUP_DROPDOWN = page.getByRole("textbox", { name: "Tên nhóm Tên nhóm" });
    this.EMPLOYEE_TYPE_DROPDOWN = page.getByRole("textbox", { name: "Loại nhân viên ※ Loại nhân vi" });
    this.PERMISSION_DROPDOWN = page.getByRole("textbox", { name: "Tên quyền ※ Tên quyền ※" });
    this.POSITION_DROPDOWN = page.getByRole("textbox", { name: "Tên chức vụ Tên chức vụ" });
    this.LEVEL_DROPDOWN = page.getByRole("textbox", { name: "Tên cấp bậc Tên cấp bậc" });
    this.STATUS_FOR_WORK_DROPDOWN = page.locator("div").filter({ hasText: /^Đang làm$/ }).first();
    this.STATUS_DROPDOWN = page.locator(".v-field.v-field--active.v-field--appended.v-field--center-affix.v-field--dirty.v-field--prepended > .v-field__append-inner > .mdi-menu-down");

    // Additional Information Inputs
    this.ID_CARD_INPUT = page.getByRole("spinbutton", { name: "CCCD CCCD" });
    this.ID_CARD_ISSUE_DATE_INPUT = page.getByRole("textbox", { name: "Ngày cấp CCCD Ngày cấp CCCD" });
    this.ID_CARD_ISSUE_PLACE_INPUT = page.getByRole("textbox", { name: "Nơi cấp CCCD Nơi cấp CCCD" });
    this.BIRTH_DATE_INPUT = page.getByRole("textbox", { name: "Ngày sinh Ngày sinh" });
    this.START_WORK_DATE_INPUT = page.getByRole("textbox", { name: "Ngày vào làm Ngày vào làm" });
    this.PHONE_NUMBER_INPUT = page.getByRole("spinbutton", { name: "Số điện thoại Số điện thoại" });
    this.BANK_NAME_INPUT = page.getByRole("textbox", { name: "Tên ngân hàng Tên ngân hàng" });
    this.BANK_ACCOUNT_INPUT = page.getByRole("spinbutton", { name: /Số tài khoản ngân hàng/i });
    this.TAX_CODE_INPUT = page.getByRole("spinbutton", { name: "Mã số thuế Mã số thuế" });
    this.ADDRESS_INPUT = page.getByRole("textbox", { name: "Địa chỉ Địa chỉ" });
    this.NOTE_INPUT = page.getByRole("textbox", { name: "Ghi chú Ghi chú" });

    this.VALIDATE_EMAIL = page.locator("div").filter({ hasText: /^Định dạng email không chính xác$/ }).first();
  }

  // PHƯƠNG THỨC - ĐIỀU HƯỚNG
  async clickEmployeeMenu(): Promise<void> { await this.safeClick(this.SIDEBAR_EMPLOYEE_LINK); }

  // PHƯƠNG THỨC - NHẬP THÔNG TIN CÁ NHÂN
  async fillEmployeeCode(code: string): Promise<void> { await this.safeFill(this.EMPLOYEE_CODE_INPUT, code); }
  async fillEmployeeName(name: string): Promise<void> { await this.safeFill(this.EMPLOYEE_NAME_INPUT, name); }
  async fillEmail(email: string): Promise<void> { await this.safeFill(this.EMAIL_INPUT, email); }
  async fillPassword(password: string): Promise<void> { await this.safeFill(this.PASSWORD_INPUT, password); }
  async fillConfirmPassword(password: string): Promise<void> { await this.safeFill(this.CONFIRM_PASSWORD_INPUT, password); }
  async fillPersonalInfo(code: string, name: string, email: string): Promise<void> { await this.fillEmployeeCode(code); await this.fillEmployeeName(name); await this.fillEmail(email); }

  // PHƯƠNG THỨC - NHẬP THÔNG TIN THÊM
  async fillIdCard(idCard: string): Promise<void> { await this.safeFill(this.ID_CARD_INPUT, idCard); }
  async fillIdCardIssueDate(date: string): Promise<void> { await this.safeFill(this.ID_CARD_ISSUE_DATE_INPUT, date); }
  async fillIdCardIssuePlace(place: string): Promise<void> { await this.safeFill(this.ID_CARD_ISSUE_PLACE_INPUT, place); }
  async fillStartWorkDate(date: string): Promise<void> { await this.safeFill(this.START_WORK_DATE_INPUT, date); }
  async fillPhoneNumber(phone: string): Promise<void> { await this.safeFill(this.PHONE_NUMBER_INPUT, phone); }
  async fillBankName(bankName: string): Promise<void> { await this.safeFill(this.BANK_NAME_INPUT, bankName); }
  async fillBankAccount(account: string): Promise<void> { await this.safeFill(this.BANK_ACCOUNT_INPUT, account); }
  async fillTaxCode(taxCode: string): Promise<void> { await this.safeFill(this.TAX_CODE_INPUT, taxCode); }
  async fillAddress(address: string): Promise<void> { await this.safeFill(this.ADDRESS_INPUT, address); }
  async fillNote(note: string): Promise<void> { await this.safeFill(this.NOTE_INPUT, note); }

  // PHƯƠNG THỨC - HÀNH ĐỘNG CHECKBOX
  async checkTimekeeping(): Promise<void> { await this.TIMEKEEPING_CHECKBOX.check(); }
  async checkCheckin(): Promise<void> { await this.CHECKIN_CHECKBOX.check(); }
  async uncheckTimekeeping(): Promise<void> { await this.TIMEKEEPING_CHECKBOX.uncheck(); }
  async uncheckCheckin(): Promise<void> { await this.CHECKIN_CHECKBOX.uncheck(); }

  // PHƯƠNG THỨC - TƯƠNG TÁC DROPDOWN
  async clickDepartmentDropdown(): Promise<void> { await this.safeClick(this.DEPARTMENT_DROPDOWN); }
  async clickGroupDropdown(): Promise<void> { await this.safeClick(this.GROUP_DROPDOWN); }
  async clickEmployeeTypeDropdown(): Promise<void> { await this.safeClick(this.EMPLOYEE_TYPE_DROPDOWN); }
  async clickPermissionDropdown(): Promise<void> { await this.safeClick(this.PERMISSION_DROPDOWN); }
  async clickPositionDropdown(): Promise<void> { await this.safeClick(this.POSITION_DROPDOWN); }
  async clickLevelDropdown(): Promise<void> { await this.safeClick(this.LEVEL_DROPDOWN); }
  async clickStatusForWorkDropdown(): Promise<void> { await this.safeClick(this.STATUS_FOR_WORK_DROPDOWN); }
  async clickStatusDropdown(): Promise<void> { await this.safeClick(this.STATUS_DROPDOWN); }

  // PHƯƠNG THỨC - CHỌN TÙY CHỌN DROPDOWN
  async selectDepartment(departmentName: string): Promise<void> {
    await this.clickDepartmentDropdown();
    const OPTION = this.page.getByRole("option", { name: departmentName });
    await this.safeClick(OPTION);
  }

  async selectGroup(groupName: string): Promise<void> {
    await this.clickGroupDropdown();
    const OPTION = this.page.getByRole("option", { name: groupName });
    await this.safeClick(OPTION);
  }

  async selectEmployeeType(typeName: string): Promise<void> {
    await this.clickEmployeeTypeDropdown();
    const OPTION = this.page.getByRole("option", { name: typeName });
    await this.safeClick(OPTION);
  }

  async selectPermission(permissionName: string): Promise<void> {
    await this.clickPermissionDropdown();
    const OPTION = this.page.getByRole("option", { name: permissionName });
    await this.safeClick(OPTION);
  }

  async selectPosition(positionName: string): Promise<void> {
    await this.clickPositionDropdown();
    const OPTION = this.page.getByRole("option", { name: positionName });
    await this.safeClick(OPTION);
  }

  async selectLevel(levelName: string): Promise<void> {
    await this.clickLevelDropdown();
    const OPTION = this.page.getByRole("option", { name: levelName });
    await this.safeClick(OPTION);
  }

  async selectStatusForWork(status: string): Promise<void> {
    await this.clickStatusForWorkDropdown();
    const OPTION = this.page.getByRole("option", { name: status });
    await this.safeClick(OPTION);
  }

  async selectStatus(status: string): Promise<void> {
    await this.clickStatusDropdown();
    const OPTION = this.page.getByRole("option", { name: status });
    await this.safeClick(OPTION);
  }

  // PHƯƠNG THỨC - XÁC THỰC
  async validateEmailFormat() {
    await this.safeVerifyToHaveText(
      this.VALIDATE_EMAIL,
      "Định dạng email không chính xác"
    );
  }


  async validateListEmployee(employeeName: string): Promise<void> {
    const EMPLOYEE_ROW = this.page
      .locator("#row-0")
      .getByRole("cell", { name: employeeName });
    await this.safeVerifyToHaveText(EMPLOYEE_ROW, employeeName);
  }

  //check tồn tại
  async checkExist() {
    const idUser = this.page.getByText("Mã nhân viên đã tồn tại.");
    const email = this.page.getByText("Địa chỉ email đã tồn tại.");

    if (await idUser.isVisible()) {
      await this.safeVerifyToHaveText(idUser, "Mã nhân viên đã tồn tại.");
    }

    if (await email.isVisible()) {
      await this.safeVerifyToHaveText(email, "Địa chỉ email đã tồn tại.");
    }
  }

  async validatePass() {
    const checkchar = this.page.getByText('Không nhập dưới 6 kí tự.');
    const checkConfrim = this.page.getByText('Giá trị không khớp với Mật kh.');
    if (await checkchar.isVisible()) {
      await this.safeVerifyToHaveText(checkchar, "Không nhập dưới 6 kí tự.");
    }
    if (await checkConfrim.isVisible()) {
      await this.safeVerifyToHaveText(checkConfrim, "Giá trị không khớp với Mật kh.");
    }
  }
  //check khong input
  async validateNoinput() {
    const id = this.page.getByText("Nhập mã nhân viên");
    const userName = this.page.getByText("Nhập tên nhân viên");
    const email = this.page.getByText("Nhập Email");
    const pass = this.page.getByText("Nhập nhập mật khẩu");
    const confrimpass = this.page.getByText("Nhập nhập lại mật khẩu");
    if (await id.isVisible()) {
      await this.safeVerifyToHaveText(id, "Nhập mã nhân viên");
    }

    if (await userName.isVisible()) {
      await this.safeVerifyToHaveText(userName, "Nhập tên nhân viên");
    }
    if (await email.isVisible()) {
      await this.safeVerifyToHaveText(email, "Nhập Email");
    }

    if (await pass.isVisible()) {
      await this.safeVerifyToHaveText(pass, "Nhập nhập mật khẩu");
    }
    if (await confrimpass.isVisible()) {
      await this.safeVerifyToHaveText(confrimpass, "Nhập nhập lại mật khẩu");
    }
  }
}
