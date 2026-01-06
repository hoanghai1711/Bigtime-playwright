import { clearTable } from '../helpers/DBHelper';

export async function clearPayroll() {
    await clearTable('payrolls');
}
