# ==============================================================================
# AETHERIA — AI Movie Intelligence Platform Startup Script
# ==============================================================================

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Starting AETHERIA AI Movie Engine" -ForegroundColor Red
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Start Python ML REST API Server
Write-Host "[1/2] Launching Python ML Engine on port 5000..." -ForegroundColor Yellow
$backendJob = Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "C:\Users\onyon\.local\bin\uv.exe run --with flask --with flask-cors --with pandas --with scikit-learn --with numpy python server.py" -PassThru

Start-Sleep -Seconds 4

# 2. Start Vite Frontend Server
Write-Host "[2/2] Launching Frontend Interface on port 5173..." -ForegroundColor Green
$frontendJob = Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev -- --host 127.0.0.1 --port 5173" -PassThru

Write-Host "`nAll systems online!" -ForegroundColor Cyan
Write-Host "Frontend: http://127.0.0.1:5173" -ForegroundColor White
Write-Host "API Backend: http://127.0.0.1:5000" -ForegroundColor White
