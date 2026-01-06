import { getConnection, clearTable } from '../helpers/DBHelper';
import { v4 as uuidv4 } from 'uuid';

export async function mockCheckinData(userId: string, date: string) {
  const conn = await getConnection();
  const checkDayId = uuidv4().slice(0, 10);
  const checkTimeIdIn = uuidv4().slice(0, 10);
  const checkTimeIdOut = uuidv4().slice(0, 10);

  try {
    // INSERT check_days
    await conn.execute(
      `INSERT INTO check_days (
        id, user_id, day, late_time_in, early_time_out,
        overtime, late_break_duration, total_work_time,
        reason, type, type_working, status, created_at
      )
      VALUES (?, ?, ?, ?, ?, NULL, NULL, ?, NULL, 1, 1, 1, NOW())`,
      [checkDayId, userId, date, '00:00:00', '00:00:00', '09:00:00']
    );

    // INSERT check_times
    await conn.execute(
      `INSERT INTO check_times (
         id, check_day_id, user_agent, longitude, latitude, 
         checked_time, reason, is_updated, created_at, created_by
       )
       VALUES (?, ?, ?, ?, ?, ?, NULL, 0, NOW(), ?)`,
      [checkTimeIdIn, checkDayId, 'MockAgent', 106.9481984, 10.9477888, `${date} 09:00:00`, userId]
    );

    await conn.execute(
      `INSERT INTO check_times (
         id, check_day_id, user_agent, longitude, latitude, 
         checked_time, reason, is_updated, created_at, created_by
       )
       VALUES (?, ?, ?, ?, ?, ?, NULL, 0, NOW(), ?)`,
      [checkTimeIdOut, checkDayId, 'MockAgent', 106.9481984, 10.9477888, `${date} 18:10:00`, userId]
    );

    // INSERT check_time_histories
    await conn.execute(
      `INSERT INTO check_time_histories (
         id, check_time_id, time_update, reason, created_at, updated_at
       )
       VALUES (?, ?, ?, NULL, NOW(), NOW())`,
      [uuidv4().slice(0, 10), checkTimeIdIn, '09:00:00']
    );

    await conn.execute(
      `INSERT INTO check_time_histories (
         id, check_time_id, time_update, reason, created_at, updated_at
       )
       VALUES (?, ?, ?, NULL, NOW(), NOW())`,
      [uuidv4().slice(0, 10), checkTimeIdOut, '18:10:00']
    );

    console.log('Mock data created successfully');
  } catch (error) {
    console.error('Failed to mock data:', error);
  } finally {
    await conn.end();
  }
}

export const clearOvertimeSubmission = async () => {
    await clearTable('overtime_submissions');
};

export const clearCheckDay = async () => {
    await clearTable('check_days');
};

export const clearCheckTime = async () => {
    await clearTable('check_times');
};

