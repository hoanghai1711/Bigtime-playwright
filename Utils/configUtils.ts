import * as dotenv from 'dotenv';
dotenv.config();

export class Config {
  // URL staging
  static get urlStaging(): string {
    return process.env.URL_BIGTIME || '';
  }

  // Manager Team Account
  static get manager_team_username(): string {
    return process.env.MANAGER_TEAM_USERNAME || '';
  }

  static get manager_team_password(): string {
    return process.env.MANAGER_TEAM_PASSWORD || '';
  }

  // Employee Account 1
  static get employee_username(): string {
    return process.env.EMPLOYEE_USERNAME || '';
  }

  static get employee_password(): string {
    return process.env.EMPLOYEE_PASSWORD || '';
  }

  // Employee Account 2
  static get employee2_username(): string {
    return process.env.EMPLOYEE2_USERNAME || '';
  }

  static get employee2_password(): string {
    return process.env.EMPLOYEE2_PASSWORD || '';
  }

  // Manager Account
  static get manager_username(): string {
    return process.env.MANAGER_USERNAME || '';
  }

  static get manager_password(): string {
    return process.env.MANAGER_PASSWORD || '';
  }

  // Admin Account
  static get admin_username(): string {
    return process.env.ADMIN_USERNAME || '';
  }

    static get admin_password(): string {
      return process.env.ADMIN_PASSWORD || '';
    }

  // Connect database
  static get db_host(): string {
    return process.env.DB_HOST || '';
  }

  static get db_port(): string {
    return process.env.DB_PORT || '';
  }

  static get db_name(): string {
    return process.env.DB_NAME || '';
  }

  static get db_user(): string {
    return process.env.DB_USER || '';
  }

  static get db_password(): string {
    return process.env.DB_PASSWORD || '';
  }
}

export default Config;