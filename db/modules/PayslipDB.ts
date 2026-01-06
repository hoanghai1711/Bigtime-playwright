import { clearTable } from '../helpers/DBHelper';

export async function clearPayslips() {
    await clearTable('payslips');
}
