import { clearTable, importFromCSV } from '../helpers/DBHelper';

export const clearLeaveManagements = async () => {
  await clearTable('leave_managements', "id NOT LIKE '%testData%'");
}

// Import leave managements
export async function importLeaveManagements() {
  await importFromCSV("leave_managements.csv", "leave_managements", [
    "id",
    "user_id",
    "year",
    "total_leave",
    "days_take",
    "reason",
    "status",
    "created_at",
    "updated_at",
    "created_by",
    "updated_by",
    "deleted_at",
    "deleted_by",
  ]);
}