@echo off
echo Probando integración del ecosistema de microservicios...
echo.

echo 1. Verificando Eureka Server...
curl -s http://localhost:8761/eureka/apps > nul
if %errorlevel% equ 0 (
    echo ✅ Eureka Server: OK
) else (
    echo ❌ Eureka Server: No disponible
)

echo.
echo 2. Verificando API Gateway...
curl -s http://localhost:8080/actuator/health > nul
if %errorlevel% equ 0 (
    echo ✅ API Gateway: OK
) else (
    echo ❌ API Gateway: No disponible
)

echo.
echo 3. Verificando Login Service...
curl -s http://localhost:8081/actuator/health > nul
if %errorlevel% equ 0 (
    echo ✅ Login Service: OK
) else (
    echo ❌ Login Service: No disponible
)

echo.
echo 4. Verificando User Management Service...
curl -s http://localhost:8083/health > nul
if %errorlevel% equ 0 (
    echo ✅ User Management Service: OK
) else (
    echo ❌ User Management Service: No disponible
)

echo.
echo 5. Verificando Order Management Service...
curl -s http://localhost:8082/health > nul
if %errorlevel% equ 0 (
    echo ✅ Order Management Service: OK
) else (
    echo ❌ Order Management Service: No disponible
)

echo.
echo 6. Verificando Frontend...
curl -s http://localhost:3000 > nul
if %errorlevel% equ 0 (
    echo ✅ Frontend: OK
) else (
    echo ❌ Frontend: No disponible
)

echo.
echo 7. Probando registro de usuario...
curl -X POST http://localhost:8080/login/createuser -H "Content-Type: application/json" -d "{\"customerId\":\"test123\",\"password\":\"testpass\"}" > nul
if %errorlevel% equ 0 (
    echo ✅ Registro de usuario: OK
) else (
    echo ❌ Registro de usuario: Error
)

echo.
echo 8. Probando autenticación...
curl -X POST http://localhost:8080/login/authuser -H "Content-Type: application/json" -d "{\"customerId\":\"test123\",\"password\":\"testpass\"}" > nul
if %errorlevel% equ 0 (
    echo ✅ Autenticación: OK
) else (
    echo ❌ Autenticación: Error
)

echo.
echo Pruebas completadas!
pause
