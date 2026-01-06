import { clearTable, getConnection, importFromCSV } from '../helpers/DBHelper';

export async function clearRewardUsers() {
  await clearTable('reward_users', "id NOT LIKE '%testdata%'");
}

export async function clearRewardType() {
  await clearTable('reward_types', "name NOT LIKE '%Khen thưởng%'");
}

// import reward users from csv file
export async function importRewardUser() {
  await importFromCSV(
    "reward_users.csv",
    "reward_users",
    [
      "id",
      "user_id",
      "reward_type_id",
      "name",
      "description",
      "date_awarded",
      "note",
      "value",
      "status",
      "created_at",
      "created_by",
      "updated_at",
      "updated_by",
      "deleted_by",
      "deleted_at",
    ]);
  }