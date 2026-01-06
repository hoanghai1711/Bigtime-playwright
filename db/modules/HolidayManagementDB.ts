import { clearTable } from '../helpers/DBHelper';

export const clearHolidayManagement = async () => {
    await clearTable('holiday_managements');
};
