import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';



export class LeaveManagementPage extends BasePage {
  
  readonly ITEMS_QUANLYPHEPNAM: Locator;
  readonly YEAR_BUTUON: Locator;
  readonly CHON_BUTTON: Locator;
  readonly NGAYPHEP_INPUT: Locator;
  readonly TRANGTHAI_DROPDOWN: Locator;
  readonly DROPDOWN_MOI: Locator;
  readonly DROPDOWN_CHODUYET: Locator;
  readonly SEARCH_INPUT: Locator;

 
  //Department dropdown
  readonly DEPARTMENT_DROPDOWN: Locator;
  readonly VALIDATE_SONGAYPHEP: Locator;
  readonly VALIDATE_INPUT_SONGAYPHEP: Locator;
  readonly VALIDATE_INPUT_SONGAYPHEP_BEHON0: Locator;
  readonly TEXTBOX_INPUT_NV: Locator;
  
  readonly CLICK_STATUS: Locator;
  readonly CHECK_STATUS: Locator;
  readonly CLICK_YEAR_INPUT: Locator;


  constructor(page: Page) {
    super(page)
    this.ITEMS_QUANLYPHEPNAM = page.getByText('Quản lý ngày phép năm', { exact: true });
    this.YEAR_BUTUON = page.locator('.mdi-calendar-plus').first();
    this.CHON_BUTTON = page.getByRole('button', { name: 'Chọn' })
    this.NGAYPHEP_INPUT = page.getByRole('spinbutton', { name: 'Số ngày nghỉ phép ※' });
    this.TRANGTHAI_DROPDOWN = page.getByRole('combobox').filter({ hasText: 'Trạng thái' }).locator('i');
    this.DROPDOWN_MOI = page.getByRole('option', { name: 'Mới' });
    this.DROPDOWN_CHODUYET = page.getByRole('option', { name: 'Chờ duyệt' });
    this.SEARCH_INPUT = page.getByRole('textbox', { name: 'Tìm kiếm theo tên Tìm kiếm' });
  
    this.DEPARTMENT_DROPDOWN = page.getByRole('tab', { name: 'Bộ phận/Nhóm' });
    this.VALIDATE_SONGAYPHEP = page.getByText('Tổng số ngày nghỉ phải là một số nguyên.');
    this.VALIDATE_INPUT_SONGAYPHEP = page.getByText('Nhập số ngày nghỉ phép');
    this.VALIDATE_INPUT_SONGAYPHEP_BEHON0 = page.getByText('Giá trị phải lớn hơn hoặc bằng 0.');
    this.TEXTBOX_INPUT_NV = page.getByRole('textbox', { name: 'Tên nhân viên Tên nhân viên' });
    
    this.CLICK_STATUS = page.locator('.mdi-menu-down').first();
    this.CHECK_STATUS =  page.locator('#row-0 span').filter({ hasText: 'Mới' });
    
    this.CLICK_YEAR_INPUT = page.getByRole('spinbutton', { name: 'Năm Năm' });
  
  }


  async selectYear(year: string) {
    await this.YEAR_BUTUON.click();
    await this.page.locator(
      `//div[contains(@class,'dp__overlay_cell') and normalize-space()='${year}']`
    ).click();
    await this.page.waitForTimeout(1000);
    
    await this.CHON_BUTTON.click();
  }

  async clickItemPhepNam() {
    await this.ITEMS_QUANLYPHEPNAM.click();
  }

  async fillNgayPhep(ngayphep: string) {
    await this.NGAYPHEP_INPUT.fill(ngayphep);
  }

  async selectTrangThai(value: string) {
    await this.safeClick(this.TRANGTHAI_DROPDOWN, { nth: 1 });
    await this.page.getByRole('option', { name: value }).click();
  }

  async addDepartment() {
    await this.DEPARTMENT_DROPDOWN.click();
  }
  async selectDepartment(value: string) {
    await this.page.getByRole('option', { name: value }).click();
  }

  async sreachNhanVien(nhanvien: string) {
    await this.SEARCH_INPUT.fill(nhanvien);
  }

  async addNhanvien(name: string) {
    await this.sreachNhanVien(name);
  }

  async checkValidateNgayphep(){
    await this.safeVerifyToHaveText(this.VALIDATE_SONGAYPHEP, 'Tổng số ngày nghỉ phải là một số nguyên.');
  }

  async checkValidateInputNgayphep(){
    await this.safeVerifyToHaveText(this.VALIDATE_INPUT_SONGAYPHEP, 'Nhập số ngày nghỉ phép');
  }
  async checkValidateInputBehon0(){
    await this.safeVerifyToHaveText(this.VALIDATE_INPUT_SONGAYPHEP_BEHON0, 'Giá trị phải lớn hơn hoặc bằng 0.');
  }

  async textboxInputNv(nhanvien: string){
    await this.TEXTBOX_INPUT_NV.fill(nhanvien);
  }
  async checkNv(value: string){
   const check = this.page.locator('#row-0').getByRole('cell', { name: value });
   await this.safeVerifyToHaveText(check, value);
  }


  async clickStatusButton(){
    await this.safeClick(this.CLICK_STATUS);
  }


  async selectStatus(value: string) {
  const statusOption = this.page.getByRole('option', { name: value });
  await this.safeClick(statusOption);
}

async checkStatus(value: string){
  const checkStatus =  this.page.locator('#row-0 span').filter({ hasText: value });
  await this.safeVerifyToHaveText(checkStatus, value);
}



async thaotacNewStatus(value: string){
  const updateStatus = await this.page.getByRole('button', { name: value });

    await this.safeClick(updateStatus);
  }

async clickYearInput(year: string){
  await this.CLICK_YEAR_INPUT.fill(year);
}
async checkYear(value: string){
 const checkStatus1 =  this.page.locator('#row-0').getByRole('cell', { name: value })
  await this.safeVerifyToHaveText(checkStatus1, value);
}

async waitFor(time: number ){
  await this.page.waitForTimeout(time);
}



}


