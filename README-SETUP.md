# Configuración del Gateway y Eureka Server

## Servicios Configurados

### 1. Eureka Server (Puerto 8761)
- **Ubicación**: `eureka/`
- **URL**: http://localhost:8761
- **Función**: Registro y descubrimiento de servicios

### 2. API Gateway (Puerto 8080)
- **Ubicación**: `gateway/`
- **URL**: http://localhost:8080
- **Funciones**:
  - Enrutamiento centralizado
  - Autenticación JWT centralizada
  - Configuración CORS
  - Balanceador de carga

### 3. Login Microservice (Puerto 8081)
- **Ubicación**: `loginMicroservice/`
- **URL**: http://localhost:8081
- **Función**: Autenticación y generación de tokens JWT

## Configuración JWT Centralizada

El JWT está centralizado en el **Gateway** con las siguientes características:

- **JwtUtil**: Generación y validación de tokens
- **JwtAuthenticationFilter**: Filtro de autenticación para todas las rutas
- **SecurityConfig**: Configuración de seguridad con CORS
- **CorsConfig**: Configuración de CORS para permitir peticiones cross-origin

## Rutas Configuradas en el Gateway

- `/login/**` → Login Microservice
- `/user/**` → User Microservice (cuando esté disponible)
- `/order/**` → Order Microservice (cuando esté disponible)

## Cómo Ejecutar

1. **Ejecutar Eureka Server**:
   ```bash
   cd eureka
   mvn spring-boot:run
   ```

2. **Ejecutar Gateway**:
   ```bash
   cd gateway
   mvn spring-boot:run
   ```

3. **Ejecutar Login Microservice**:
   ```bash
   cd loginMicroservice
   mvn spring-boot:run
   ```

O usar el script `test-services.bat` para ejecutar todos los servicios.

## Configuración CORS

El gateway está configurado para permitir:
- Todos los orígenes (`*`)
- Métodos: GET, POST, PUT, DELETE, OPTIONS
- Todos los headers
- Credenciales habilitadas

## Autenticación

- Las rutas `/login/**` y `/eureka/**` están permitidas sin autenticación
- Todas las demás rutas requieren un token JWT válido en el header `Authorization: Bearer <token>`
