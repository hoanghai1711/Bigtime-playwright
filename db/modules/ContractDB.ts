import { checkExistsWithConditions, clearTable, importFromCSV } from '../helpers/DBHelper';

// check exists in db
export async function checkContractExists(note: string, type: number, status: number) {
  return checkExistsWithConditions('employment_contracts',
    {
      note: { value: note, like: true },
      type: { value: type },
      status: { value: status }
    });
}

// clear data 
export const clearEmploymentContract = async () => {
  await clearTable('employment_contracts', "user_id LIKE '%minh%' and id not like '%TestData%'");
}

// import contracts from csv file
export async function importEmploymentContract() {
  await importFromCSV("contract.csv", "employment_contracts", [
    "id",
    "code",
    "user_id",
    "start_date",
    "end_date",
    "base_salary",
    "position_id",
    "note",
    "content",
    "terminate_reason",
    "cancel_reason",
    "type",
    "status",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by",
    "deleted_at",
    "deleted_by",
  ]);
}
