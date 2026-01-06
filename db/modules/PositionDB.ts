import { clearTable } from '../helpers/DBHelper';

export const clearPosition = async () => {
    await clearTable('positions', "name LIKE '%Automation test%' or name LIKE '%z%'");
}
