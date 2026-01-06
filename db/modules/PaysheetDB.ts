import { clearTable } from '../helpers/DBHelper';

export async function clearPaysheets() {
    // await clearTable('payslip_history');
    await clearTable('paysheets', "name not like '%Test Data%'");

}
