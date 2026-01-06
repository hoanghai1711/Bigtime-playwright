@echo off
cd /d %~dp0
echo === RUNNING PLAYWRIGHT TESTS ===
npx playwright test tests/login.spec.ts --project=chromium
echo.
echo === DONE - NHAN PHIM BAT KY DE DONG ===
pause
