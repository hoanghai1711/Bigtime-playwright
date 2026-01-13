import { request } from '@playwright/test';
import { loginAndGetToken } from './authApi';

export async function createApiContext() {
  const token = await loginAndGetToken();

  return await request.newContext({
    baseURL: 'https://api-bigtime-stg-2.bigapptech.vn',
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-client-request': 'hero',
    },
  });
}
