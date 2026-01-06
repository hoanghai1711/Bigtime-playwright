import { clearTable } from '../helpers/DBHelper';

export const clearDebts = async () => {
    await clearTable('debts', "note NOT LIKE '%Test data%'");
};
