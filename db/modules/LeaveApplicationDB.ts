import { checkExistsWithConditions, clearTable, executeQuery } from '../helpers/DBHelper';

export async function checkLeaveApplicationExists(reason: string, status?: number) {
  const conditions: Record<string, { value: any; like?: boolean }> = {
    reason: { value: reason, like: true }
  };
  if (status !== undefined) {
    conditions.status = { value: status };
  }
  return checkExistsWithConditions('leave_applications', conditions);
}

export const clearLeaveApplications = async () => {
  await clearTable('leave_applications', "reason NOT LIKE '%Test data%'");
}

export const clearLeaveApplicationsForUser = async (userId: string) => {
  await executeQuery("DELETE FROM leave_applications WHERE user_id = ?", [userId]);
  console.info(`Cleared leave applications for user_id ${userId}`);
}
