import { clearTable } from '../helpers/DBHelper';

export async function clearWorkingShift() {
    await clearTable('working_shifts', "name NOT LIKE '%Ca%'");
}
