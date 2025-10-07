@echo off
echo Deteniendo todos los servicios...

echo.
echo Deteniendo procesos Java (Eureka, Gateway, Login)...
taskkill /f /im java.exe 2>nul

echo.
echo Deteniendo procesos Go (User Management)...
taskkill /f /im go.exe 2>nul

echo.
echo Deteniendo procesos Python (Order Management)...
taskkill /f /im python.exe 2>nul

echo.
echo Deteniendo procesos Node (Frontend)...
taskkill /f /im node.exe 2>nul

echo.
echo Todos los servicios han sido detenidos!
pause
