import { clearTable } from '../helpers/DBHelper';

export const clearBranch = async () => {
    await clearTable('branches', "name LIKE '%Automation test%' OR name LIKE '%z%'");
}
