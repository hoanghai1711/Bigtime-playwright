import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { LoadFnOutput } from 'module';

export class LeaveApplication extends BasePage {
    readonly ITEM_BUTTON: Locator;
    readonly CLICK_TYPEHOLIDAY: Locator;
    readonly FILL_LYDO: Locator;
    readonly CLICK_STATUS: Locator;
    readonly VALIDATE_BITRUNGLICH: Locator;
    readonly FROM_DATE_INPUT: Locator;
    readonly TO_DATE_INPUT: Locator;
    readonly DATE_PICKER: Locator;
    readonly NEXT_MONTH_BTN: Locator;
    readonly VALIDATE_NOSHIFTS: Locator;
    readonly VALIDATE_NOLEAVE: Locator;
    readonly VALIDATE_COMPERDATE: Locator;
    readonly ACCEPT_BUTTON: Locator;
    readonly CLICK_DATE_PICKER: Locator;
    readonly CLICK_SREACH_STATUS: Locator;
    readonly VALIDATE_LYDO: Locator;
    //Khai báo và gắn element vào biến
    constructor(page: Page) {
        super(page);
        this.ITEM_BUTTON = page.getByRole('link', { name: 'Đơn nghỉ phép' });
        this.CLICK_TYPEHOLIDAY = page.getByRole('dialog').getByText('Nghỉ thường');
        this.FILL_LYDO = page.getByRole('textbox', { name: 'Lý do ※ Lý do ※' });
        this.CLICK_STATUS = page.locator('.v-col-md-6 > .v-input > .v-input__control > .v-field > .v-field__append-inner');
        this.FROM_DATE_INPUT = page.getByRole('textbox', { name: /Nghỉ từ ngày/i });
        this.TO_DATE_INPUT = page.getByRole('textbox', { name: /Đến hết ngày/i });
        this.DATE_PICKER = page.getByRole('dialog');
        this.NEXT_MONTH_BTN = this.DATE_PICKER.getByRole('button', { name: 'Next month' });
        this.ACCEPT_BUTTON = page.getByRole('button', { name: 'Chọn' });
        this.CLICK_DATE_PICKER = page.getByRole('textbox', { name: 'Chọn tháng Chọn tháng' });
        this.CLICK_SREACH_STATUS =page.locator("//div[@class='v-card-text master-table-search pb-0 pl-0']//div[2]//div[1]//div[1]//div[1]//div[4]//i[1]");
        //Validate
        this.VALIDATE_NOLEAVE = page.locator('div').filter({ hasText: /^Bạn không có nghỉ phép năm trong năm hiện tại\.$/ }).nth(1);
        this.VALIDATE_COMPERDATE =page.locator('div').filter({ hasText: /^Ngày kết thúc phải là ngày sau hoặc bằng ngày bắt đầu\.$/ }).nth(1);
        this.VALIDATE_NOSHIFTS = page.getByText('Một số ngày trong đơn không có ca làm việc', { exact: true });
        this.VALIDATE_BITRUNGLICH = page.getByRole('alert').filter({ hasText: 'Đơn xin nghỉ bị trùng lịch' });
        this.VALIDATE_LYDO = page.getByText('Không nhập quá 255 kí tự.', { exact: true });
    }

    async clickItemButton() {
        await this.safeClick(this.ITEM_BUTTON);
    }

    async clickType() {
        await this.safeClick(this.CLICK_TYPEHOLIDAY);
    }

    async selectType(value: string) {
        const type = this.page.getByRole('option', { name: value });
        await this.safeClick(type);
    }

    async fillLydo(lydo: string) {
        await this.FILL_LYDO.fill(lydo);
    }

    async clickStatus() {
        await this.safeClick(this.CLICK_STATUS);
    }

    async selectOption(value: string) {
        const option = this.page.getByRole('option', { name: value });
        await this.safeClick(option);
    }

    async clickFormDate() {
        await this.safeClick(this.FROM_DATE_INPUT);
    }

    async clickToDate() {
        await this.safeClick(this.TO_DATE_INPUT);
    }

    async clickSave() {
        await this.safeClick(this.ACCEPT_BUTTON);
    }

    //hàm chọn ngày bắt đầu và kết thúc
    async selectDate(year: string, month: string, day: string) {
        // YEAR
        await this.safeClick(
            this.page.getByRole('button', { name: 'Open years overlay' })
        );
        await this.safeClick(
            this.page.locator(
                `//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='${year}']`
            )
        );
        // MONTH
        await this.safeClick(
            this.page.getByRole('button', { name: 'Open months overlay' })
        );
        await this.safeClick(
            this.page.locator(
                `//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='${month}']`
            )
        );
        // DAY (FIX STRICT MODE)
        await this.safeClick(
            this.page.locator(
                `//div[contains(@class,'dp__cell_inner')
            and not(contains(@class,'dp__cell_offset'))]
            [normalize-space()='${day}']`
            )
        );
    }

    // Validate 
    async validateNoshifts() {
        await this.safeVerifyToHaveText(this.VALIDATE_NOSHIFTS, 'Một số ngày trong đơn không có ca làm việc');
    }

    async validateData(value: string) {
        const row = this.page.locator('#row-0'); // hoặc .first()
        const cell = row.getByRole('cell', { name: value });
        await this.safeVerifyToHaveText(cell, value);
        await this.safeClick(cell);
    }

    async validateType(value: string){
        const type = this.page.locator('#row-0').getByRole('cell', { name: value});
        await this.safeVerifyToHaveText(type, value);
    }

    async validateTrunglich() {
        await this.safeVerifyToHaveText(this.VALIDATE_BITRUNGLICH, 'Đơn xin nghỉ bị trùng lịch');
    }

    async validateComparedate() {
        await this.safeVerifyToHaveText(this.VALIDATE_COMPERDATE, 'Ngày kết thúc phải là ngày sau hoặc bằng ngày bắt đầu.');
    }
    
    async validateNoleave(){
        await this.safeVerifyToHaveText(this.VALIDATE_NOLEAVE,'Bạn không có nghỉ phép năm trong năm hiện tại.');
    }

    async validateLydo(){
        await this.safeVerifyToHaveText(this.VALIDATE_LYDO, 'Không nhập quá 255 kí tự.');
    }
        
    

    



    // thao tác sửa hoặc gửi
    async setupButton(value: string) {
        const setup = this.page.getByRole('button', { name: value });
        await this.safeClick(setup);
    }



    async sreachDatePicker(year: string, month: string) {
        await this.safeClick(this.CLICK_DATE_PICKER);
        await this.safeClick(this.page.getByRole('button', { name: 'Open years overlay' }));
        await this.safeClick(this.page.locator(
            `//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='${year}']`));
        await this.safeClick(
            this.page.locator(
                `//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='${month}']`));
        await this.clickSave();
        await this.safeClick(this.page.getByRole('button', { name: 'Tìm kiếm' }));

    }

    async sreachStatus(value: string){
        await this.safeClick(this.CLICK_SREACH_STATUS);
        const option = this.page.getByRole('option', {name: value});
        await this.safeClick(option);
    }
}



