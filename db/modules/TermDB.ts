import { clearTable } from '../helpers/DBHelper';

export async function clearTerm() {
    await clearTable('terms', "title NOT LIKE '%Điều khoản%'");
}
