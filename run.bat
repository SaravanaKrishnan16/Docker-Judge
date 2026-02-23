@echo off
echo Starting DockerJudge...

echo Starting backend...
cd backend
start cmd /k npm start

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting frontend...
cd ..\frontend
start cmd /k npm run dev

echo Both services are starting!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173