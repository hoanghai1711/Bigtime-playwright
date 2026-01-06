import { clearLeaveDataAfterTest } from '../Utils/dbCleanup';

async function globalTeardown() {
  await clearLeaveDataAfterTest();
}

export default globalTeardown;
