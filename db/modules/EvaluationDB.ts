import path from 'path';
import { executeQuery, checkExistsWithConditions, clearTable, getConnection } from '../helpers/DBHelper';
import mysql from 'mysql2/promise';
import fs from 'fs';

export const checkEvaluationTypeExists = async (name: string) => {
  return checkExistsWithConditions('evaluation_types', {
    name: { value: name, like: true }
  });
}

export const deleteEvaluationType = async (name: string) => {
  const result = await executeQuery("DELETE FROM evaluation_types WHERE name LIKE ?", [`%${name}%`]) as mysql.ResultSetHeader;
  console.info(`Deleted ${result.affectedRows} rows from evaluation_types where name like '${name}'`);
  return result.affectedRows > 0;
}

export const clearEluationTypes = async () => {
  await clearTable('evaluation_types', "name NOT LIKE '%Đánh giá%'");
}

export const clearEvaluationCriterias = async () => {
  await clearTable('evaluation_criterias', "name NOT LIKE '%Tiêu chí%'");
}

export const clearEvaluationProgress = async () => {
  await clearTable('evaluation_progress', "user_id = 'minh'");
}

// import data from csv file to database

export async function importEvaluationProgressFromCSV(fileName: string) {
  // resolve path từ project root
  const absPath = path.resolve(process.cwd(), 'test-data', fileName);
  console.log('Importing file from:', absPath);

  const sql = `
    LOAD DATA LOCAL INFILE '${absPath.replace(/\\/g, '/')}' 
    INTO TABLE evaluation_progress
    FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (id, user_id, evaluation_type_id, start_date, end_date, status, type, 
    created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) `;

  const conn = await getConnection();
  try {
    await conn.query({
      sql,
      infileStreamFactory: () => fs.createReadStream(absPath), 
    });
    console.log(` Imported evaluation progress from ${absPath}`);
  } finally {
    await conn.end();
  }
}
