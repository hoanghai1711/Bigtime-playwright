import mysql from 'mysql2/promise';

export async function clearLeaveDataAfterTest() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const testStartTime = process.env.TEST_START_TIME;

  console.log('Clearing DB data from:', testStartTime);


 await connection.execute(`
    DELETE FROM leave_managements
    WHERE year IN ('2027', '2028', '2029', '2040')
  `);

  await connection.commit();
  await connection.end();
}
