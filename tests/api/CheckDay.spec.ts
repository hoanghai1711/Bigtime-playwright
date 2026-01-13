import { test, expect } from '@playwright/test';
import { createApiContext } from '../../api/apiContext';

test('Tạo chấm công nhanh (bỏ T7, CN)', async () => {
  const apiContext = await createApiContext();

  const userCode = '123';
  const startDate = '2025-09-01';
  const endDate = '2025-09-30';

  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayIndex = d.getDay();
    const date = d.toISOString().slice(0, 10);

    if (dayIndex === 0 || dayIndex === 6) {
      console.log(` Bỏ qua ${date} (T7/CN)`);
      continue;
    }

    const response = await apiContext.post('/api/check-day/create', {
      data: {
        user_code: userCode,
        check_day: date,
        check_times: ['08:00:00', '17:00:00'],
      },
    });

    const body = await response.json();
console.log(date, response.status(), body);

expect(response.status()).toBe(200);
expect(body.code).toBe(200);
expect(body.data).toBe(true);

    await new Promise(r => setTimeout(r, 300));
  }

  await apiContext.dispose();
});
