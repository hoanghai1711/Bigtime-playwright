import { exec } from 'child_process';

exec('npx playwright test tests/login.spec.ts --project=chromium', (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Lỗi: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Cảnh báo: ${stderr}`);
    return;
  }
  console.log(`✅ Kết quả:\n${stdout}`);
});
