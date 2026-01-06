import { clearTable, importFromCSV } from '../helpers/DBHelper';



export async function clearDataForTestMonthlyCheckin(userIdDelete: string) {
    await clearTable('check_days',  `user_id = '${userIdDelete}'`);
    await clearTable('check_day_histories', `created_by = '${userIdDelete}'`);
    await clearTable('check_times', `created_by = '${userIdDelete}'`);
    await clearTable('payrolls', `user_id = '${userIdDelete}'`);
}

// export async function clearDataForTestMonthlyCheckin(nameDelete: string, userIdDelete: string) {
//     await clearTable('shift_plans', `name = '${nameDelete}'`);
//     await clearTable('shift_plan_users', `user_id = '${userIdDelete}'`);
//     await clearTable('time_workings', `user_id = '${userIdDelete}'`);
// }