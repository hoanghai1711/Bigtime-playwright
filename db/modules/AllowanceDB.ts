import { clearTable } from '../helpers/DBHelper';

export async function clearAllowanceTypes() {
    await clearTable('allowance_types', "note NOT LIKE '%Test data%' OR note IS NULL");
}
