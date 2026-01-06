import { clearTable } from '../helpers/DBHelper';

export const clearDepartment = async () => {
    await clearTable('departments', "name LIKE '%Automation test%' OR name LIKE '%z%'");
}
