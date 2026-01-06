import { checkExistsWithConditions, clearTable, importFromCSV } from '../helpers/DBHelper';

export async function checkShiftPlanExists(name: string) {
    return checkExistsWithConditions('shift_plans', {
        name: { value: name, like: true }
    });
}

export async function clearShiftPlan() {
    await clearTable('shift_plans', "name NOT LIKE '%Test Data%'");
}

// export async function clearDataForTestMonthlyCheckin(nameDelete: string, userIdDelete: string) {
//     await clearTable('shift_plans', `name = '${nameDelete}'`);
//     await clearTable('shift_plan_users', `user_id = '${userIdDelete}'`);
//     await clearTable('time_workings', `user_id = '${userIdDelete}'`);
// }


// Import shift plans
export async function importShiftPlan() {

    await importFromCSV("shift_plans.csv", "shift_plans", [
        "id",
        "name",
        "start_date",
        "end_date",
        "repeat_type",
        "repeat_config",
        "object_type",
        "objects",
        "status",
        "created_at",
        "created_by",
        "updated_at",
        "updated_by",
        "deleted_at",
        "deleted_by",
    ]);
}

// Import shift plan để test chấm công 

export async function importShiftPlanForTestMonthlyCheckin() {

    // import shift plan
    await importFromCSV("shift_plans.csv", "shift_plans", [
        "id", "name", "start_date", "end_date", "repeat_type", "repeat_config", "working_shift_options", "object_type", "objects", "status", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"
    ]);

    // import shift plan users
    await importFromCSV("shift_plan_users.csv", "shift_plan_users", [
        "id","shift_plan_id","user_id","created_at","updated_at","deleted_at"
    ]);

    // import time workings
    await importFromCSV("time_workings.csv", "time_workings", [
       "id","shift_date","working_shift","shift_plan_id","user_id","created_at","updated_at","deleted_at"
    ]);
}
