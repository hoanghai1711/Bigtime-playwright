import { expect, type Locator, type Page } from '@playwright/test';
import { SafeActions } from '../Utils/SafeActions';


export class BasePage  extends SafeActions{

    readonly ADD_BUTTON: Locator;
    readonly SAVE_BUTTON_FORM: Locator;
    readonly CHECKBOX_BUTTON: Locator;
    readonly CHECKBOX_BUTTON1: Locator;
    readonly ACCEPT_BUTTON: Locator;
    readonly THAOTAC_BUTTON: Locator;
    readonly CANCEL_BUTTON: Locator;
    readonly FILL_LYDO: Locator;
    readonly YES_BUTTON: Locator;
    readonly VALIDATE_LYDO: Locator;
    readonly SREACH_BUTTON: Locator; 
    readonly SREACH_NO_DATA: Locator;
    readonly DELETE_BUTTON: Locator;
    
    constructor(page: Page) {
        super(page);
        this.ADD_BUTTON = page.locator("//span[normalize-space()='Thêm']");
        this.SAVE_BUTTON_FORM = page.getByRole('button', { name: 'Lưu' });
        this.CHECKBOX_BUTTON = page.locator("(//input[@type='checkbox'])[1]");
        this.CHECKBOX_BUTTON1 = page.locator("(//input[@type='checkbox'])[2]");
         this.ACCEPT_BUTTON = page.getByRole('button', { name: 'Đồng ý' });
        this.THAOTAC_BUTTON = page.locator('#row-0').getByRole('button', { name: '󰇙 Thao tác' });
        this.CANCEL_BUTTON = page.getByRole('button', { name: 'Hủy' });
        this.FILL_LYDO = page.getByRole('textbox', { name: 'Lý do hủy Lý do hủy' });
        this.YES_BUTTON = page.getByRole('button', { name: 'Có' });
        this.VALIDATE_LYDO = page.getByText('Lý do là bắt buộc.');
        this.SREACH_BUTTON = page.getByRole('button', { name: 'Tìm kiếm' });
        this.DELETE_BUTTON = page.getByRole('button', { name: 'Xóa' });
        this.SREACH_NO_DATA = page.getByRole('cell', { name: 'Không có dữ liệu' });
    }

    async clickAddButton() {
        await this.safeClick(this.ADD_BUTTON);
    }

        async clickAddButtonSecond() {
            await this.safeClick(this.ADD_BUTTON,  {nth: 1} );;
        }
    
    async clickSaveFrom() {
        await this.page.waitForTimeout(1500);
        await this.safeClick(this.SAVE_BUTTON_FORM);
    }

    async clickSaveFromSecond(){
        await this.safeClick(this.SAVE_BUTTON_FORM, {nth: 1});
    }

    async checkBoxAllButton(){
        await this.CHECKBOX_BUTTON.check();
    }

    async checkBoxButton(){
        await this.CHECKBOX_BUTTON1.check();
    }

    async acceptButton(){
        await this.safeClick(this.ACCEPT_BUTTON);
    }
    async thaotacButton(){
        await this.safeClick(this.THAOTAC_BUTTON);
    }
    
    async fillLydo(lydo: string){
        await this.FILL_LYDO.fill(lydo);
    }

    async cancelButton(){
        await this.safeClick(this.CANCEL_BUTTON);
        
    }
    

    async clickYesButton(){
        await this.safeClick(this.YES_BUTTON);
    }

    async validateLydo(){
        await this.safeVerifyToHaveText(this.VALIDATE_LYDO, 'Lý do là bắt buộc.');
    }

    async clickSreachButton(){
        await this.safeClick(this.SREACH_BUTTON);
    }

    async clickDeleteButton(){
        await this.safeClick(this.DELETE_BUTTON);
    }

    async sreachNoFind(){
        await this.safeVerifyToHaveText(this.SREACH_NO_DATA, 'Không có dữ liệu');
    }

    generateString(length: number): string {
        return 'z'.repeat(length);
    }


}   