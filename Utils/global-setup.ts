export let TEST_START_TIME: string;

async function globalSetup() {
  const now = new Date();
  TEST_START_TIME = now.toISOString().slice(0, 19).replace('T', ' ');
  process.env.TEST_START_TIME = TEST_START_TIME;

  console.log('TEST_START_TIME:', TEST_START_TIME);
}

export default globalSetup;
