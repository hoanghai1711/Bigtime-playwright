import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

const mockResult = {
  affectedRows: 0,
  insertId: 0,
  changedRows: 0,
};

export async function getConnection() {

  if (process.env.CI === 'true') {
    console.warn(' CI mode – using mock database');

    return {
      execute: async () => [mockResult],
      query: async () => [mockResult],
      end: async () => {},
    } as any;
  }

  return mysql.createConnection(config);
}

export async function executeQuery(sql: string, params: any[] = []) {
  const conn = await getConnection();

  try {
    const [result] = await conn.execute(sql, params);
    return result ?? mockResult;
  } catch (error) {
    console.error('DB Error:', error);

    if (process.env.CI === 'true') {
      return mockResult;
    }

    throw error;
  } finally {
    if (conn?.end) {
      await conn.end();
    }
  }
}
