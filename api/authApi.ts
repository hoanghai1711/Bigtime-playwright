import { request } from '@playwright/test';

export async function loginAndGetToken() {
  const apiContext = await request.newContext({
    baseURL: 'https://api-bigtime-stg-2.bigapptech.vn',
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-client-request': 'hero',
    },
  });

  const response = await apiContext.post('/api/auth/login', {
    data: {
      username: 'info@bigapptech.vn',
      password: '12345678@Bat',
      remember: true,
    },
  });

  console.log('Login status:', response.status());
  console.log('Login body:', await response.text());

  if (!response.ok()) {
    throw new Error('Login API thất bại');
  }

  const body = await response.json();
  await apiContext.dispose();

  return body.data.access_token;
}
