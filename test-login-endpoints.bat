@echo off
echo Testing Login Microservice Endpoints
echo ====================================

echo.
echo 1. Testing createuser endpoint...
curl -X POST http://localhost:8080/login/createuser ^
  -H "Content-Type: application/json" ^
  -d "{\"customerid\":\"test123\",\"password\":\"password123\"}"

echo.
echo.
echo 2. Testing authuser endpoint...
curl -X POST http://localhost:8080/login/authuser ^
  -H "Content-Type: application/json" ^
  -d "{\"customerid\":\"test123\",\"password\":\"password123\"}"

echo.
echo.
echo 3. Testing authuser with wrong credentials...
curl -X POST http://localhost:8080/login/authuser ^
  -H "Content-Type: application/json" ^
  -d "{\"customerid\":\"test123\",\"password\":\"wrongpassword\"}"

echo.
echo.
echo Test completed!
pause
