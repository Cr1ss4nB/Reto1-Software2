@echo off
echo Iniciando ecosistema de microservicios...

echo.
echo 1. Iniciando Eureka Server...
start "Eureka Server" cmd /k "cd eureka && mvn spring-boot:run"

timeout /t 10 /nobreak >nul

echo.
echo 2. Iniciando User Management Service (Go)...
start "User Management Service" cmd /k "cd userMgmtMicroservice && go run main.go"

timeout /t 5 /nobreak >nul

echo.
echo 3. Iniciando Login Microservice...
start "Login Microservice" cmd /k "cd loginMicroservice && mvn spring-boot:run"

timeout /t 5 /nobreak >nul

echo.
echo 4. Iniciando API Gateway...
start "API Gateway" cmd /k "cd gateway && mvn spring-boot:run"

timeout /t 5 /nobreak >nul

echo.
echo 5. Iniciando Order Management Service (Python)...
start "Order Management Service" cmd /k "cd orderMgmtMicroservice && python main.py"

timeout /t 5 /nobreak >nul

echo.
echo 6. Iniciando Frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Todos los servicios han sido iniciados!
echo.
echo Servicios disponibles:
echo - Eureka Server: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - Login Service: http://localhost:8081
echo - User Management Service: http://localhost:8083
echo - Order Management Service: http://localhost:8082
echo - Frontend: http://localhost:3000
echo.
pause
