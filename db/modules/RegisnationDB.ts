import { clearTable } from '../helpers/DBHelper';

export const clearResignation = async () => {
    await clearTable('resignations', "reason NOT LIKE '%Test data%'");
}
