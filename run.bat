@echo off
echo Starting DockerJudge...

echo Killing any process on port 8000...
netstat -ano | findstr :8000 > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /f /pid %%a 2>nul
del temp.txt 2>nul

echo Killing any process on port 5173...
netstat -ano | findstr :5173 > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /f /pid %%a 2>nul
del temp.txt 2>nul

echo Starting backend...
cd backend
start cmd /k npm start

echo Waiting 3 seconds...
timeout /t 3

echo Starting frontend...
cd ..\frontend
start cmd /k npm run dev

echo Both services are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173