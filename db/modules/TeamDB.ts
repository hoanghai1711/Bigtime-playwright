import { clearTable } from '../helpers/DBHelper';

export async function clearTeam() {
    await clearTable('teams', "name NOT LIKE '%Nhóm%'");
}
