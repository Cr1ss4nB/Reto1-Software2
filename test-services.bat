@echo off
echo Starting Eureka Server...
start "Eureka Server" cmd /k "cd eureka && mvn spring-boot:run"

timeout /t 10 /nobreak >nul

echo Starting Gateway...
start "Gateway" cmd /k "cd gateway && mvn spring-boot:run"

timeout /t 10 /nobreak >nul

echo Starting Login Microservice...
start "Login Microservice" cmd /k "cd loginMicroservice && mvn spring-boot:run"

echo All services started. Check the console windows for status.
echo Eureka Server: http://localhost:8761
echo Gateway: http://localhost:8080
echo Login Microservice: http://localhost:8081
pause
