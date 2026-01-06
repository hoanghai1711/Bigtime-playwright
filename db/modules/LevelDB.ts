import { clearTable } from '../helpers/DBHelper';

export const clearLevel = async () => {
    await clearTable('levels', "name LIKE '%Automation test%' OR name LIKE '%z%'");
}
