// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // Mở DevTools cho dễ debug, nếu muốn thì bỏ dòng này sau
  // win.webContents.openDevTools();

  // Khi HTML đã load xong -> chạy test
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('log', '🚀 Đang chạy: npx playwright test tests/login.spec.ts --project=chromium');

    exec(
      'npx playwright test tests/login.spec.ts --project=chromium',
      { cwd: __dirname }, // đảm bảo chạy từ thư mục project
      (err, stdout, stderr) => {
        if (err) {
          win.webContents.send('log', `❌ ERROR:\n${err.message}`);
          return;
        }

        if (stderr) {
          win.webContents.send('log', `⚠️ STDERR:\n${stderr}`);
        }

        win.webContents.send('log', `✅ RESULT:\n${stdout}`);
      }
    );
  });
}

app.whenReady().then(createWindow);
