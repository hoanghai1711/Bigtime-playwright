import { clearTable } from '../helpers/DBHelper';

export async function clearNotifications() {
    await clearTable('notifications');
}
