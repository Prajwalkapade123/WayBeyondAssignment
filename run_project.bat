@echo off
echo Starting CloudNotes Setup...

echo [1/3] Installing Backend Dependencies...
cd backend
call npm install

echo [2/3] Installing Frontend Dependencies...
cd ../frontend
call npm install

echo [3/3] Starting Servers...
cd ..
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"

echo All set! Backend is on port 5000, Frontend is on port 3000.
pause
